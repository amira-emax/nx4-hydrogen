import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link, useFetchers} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useSheet} from '~/components/SheetContext';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {Minus, Plus} from 'lucide-react';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const {id, merchandise, isOptimistic} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useSheet();

  // Use useFetchers to check if any fetcher is currently updating this line
  const fetchers = useFetchers();
  const isLineLoading =
    !!isOptimistic ||
    fetchers.some((fetcher) => {
      // Check if this fetcher's key contains our line ID (used by CartForm)
      const isUpdating = fetcher.state !== 'idle' && fetcher.key?.includes(id);
      return isUpdating;
    });

  if (layout === 'aside') {
    return (
      <li key={id} className="flex gap-4">
        {image && (
          <div className="shrink-0 relative w-[110px] h-[110px]">
            <Image
              alt={title}
              aspectRatio="1/1"
              data={image}
              draggable={false}
              height={110}
              loading="lazy"
              width={110}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={close}
              className="block mb-1"
            >
              <p>{product.title}</p>
            </Link>
            <div className="text-body-regular mb-1">
              <ProductPrice
                price={line?.cost?.totalAmount}
                isLoading={isLineLoading}
              />
            </div>
            {selectedOptions.length > 0 && (
              <ul className="text-body-regular text-gray-500">
                {selectedOptions.map((option) => (
                  <li key={option.name}>
                    {option.name}: {option.value}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <CartLineQuantity line={line} layout={layout} />
            <div className="text-body-regular underline underline-offset-4 pointer decoration-1">
              <CartLineRemoveButton
                lineIds={[id]}
                disabled={!!line.isOptimistic}
              />
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li key={id} className="cart-line">
      {image && (
        <Image
          alt={title}
          aspectRatio="1/1"
          data={image}
          draggable={false}
          height={100}
          loading="lazy"
          width={110}
        />
      )}

      <div>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            // Layout is 'page' here, no close needed or logic specific to page
          }}
        >
          <p>
            <strong>{product.title}</strong>
          </p>
        </Link>
        <ProductPrice
          price={line?.cost?.totalAmount}
          isLoading={isLineLoading}
        />
        <ul className="text-body-regular text-gray-500">
          {selectedOptions.map((option) => (
            <li key={option.name}>
              {option.name}: {option.value}
            </li>
          ))}
        </ul>
        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({
  line,
  layout,
}: {
  line: CartLine;
  layout?: CartLayout;
}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  if (layout === 'aside') {
    return (
      <div className="flex items-center gap-4 text-body-regular font-medium">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className="w-4 h-4 flex items-center justify-center hover:opacity-70 disabled:opacity-30"
          >
            <Minus />
          </button>
        </CartLineUpdateButton>
        <span>{quantity}</span>
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className="w-4 h-4 flex items-center justify-center hover:opacity-70 disabled:opacity-30"
          >
            <Plus />
          </button>
        </CartLineUpdateButton>
      </div>
    );
  }

  return (
    <div className="cart-line-quantity">
      <span className="text-body-regular">
        Quantity: {quantity} &nbsp;&nbsp;
      </span>
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <span>&#8722; </span>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
        >
          <span>&#43;</span>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button disabled={disabled} type="submit">
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
