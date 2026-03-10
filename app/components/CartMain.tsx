import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useSheet} from '~/components/SheetContext';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';
import {X} from 'lucide-react';
import {Button} from './ui/button';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);
  const {close} = useSheet();

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  if (layout === 'aside') {
    return (
      <div className="flex flex-col h-full bg-white font-sans text-black">
        <header className="bg-black text-[#f7e6ca] flex items-center justify-between px-4 py-3 shrink-0 h-[42px] box-content">
          <div className="flex-1" />
          <h3 className="flex-1 text-center font-medium text-body-regular tracking-[1.35px] uppercase whitespace-nowrap select-none">
            Cart ({cart?.totalQuantity || 0})
          </h3>
          <div className="flex-1 flex justify-end">
            <button
              onClick={close}
              className="text-white hover:opacity-80 p-1 flex items-center justify-center ring-0 focus:ring-0"
              aria-label="Close cart"
            >
              <X className="w-4 h-4 text-accent" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {!linesCount && <CartEmpty hidden={false} layout={layout} />}
          {linesCount && (
            <div className="px-4 py-6">
              <ul className="grid gap-6">
                {(cart?.lines?.nodes ?? []).map((line) => (
                  <CartLineItem key={line.id} line={line} layout={layout} />
                ))}
              </ul>
            </div>
          )}
        </div>

        {cartHasItems && (
          <div className="border-t border-gray-100 p-4 shrink-0">
            <CartSummary cart={cart} layout={layout} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className="cart-details">
        <div aria-labelledby="cart-lines">
          <ul>
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useSheet();
  return (
    <div hidden={hidden} className="text-center pt-6 space-y-4">
      <h3>You haven't added anything to cart.</h3>
      <Link to="/collections/all" onClick={close} prefetch="viewport">
        <Button variant="box">Start Shopping</Button>
      </Link>
    </div>
  );
}
