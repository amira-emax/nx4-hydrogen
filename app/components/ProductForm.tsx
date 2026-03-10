import {Link, useNavigate} from 'react-router';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import {useSheet} from './SheetContext';
import {cn} from '~/lib/utils';
import type {ProductFragment} from 'types/storefrontapi.generated';

export function ProductForm({
  productOptions,
  selectedVariant,
  complimentaryShipping,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  complimentaryShipping: ProductFragment['complimentaryShipping'];
}) {
  const navigate = useNavigate();
  const {open} = useSheet();

  return (
    <div className="flex flex-col gap-6 xl:gap-8 w-full">
      {/* Product Options */}
      {productOptions.map((option) => {
        // Option title usually not needed if it's just one main variant selector like "Quantity" or "Type" shown as buttons
        // But keeping it accessible if needed. The design mainly shows the buttons.
        return (
          <div key={option.name} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                {option.optionValues.map((value) => {
                  const {
                    name,
                    handle,
                    variantUriQuery,
                    selected,
                    available,
                    exists,
                    isDifferentProduct,
                    swatch,
                  } = value;

                  const commonClasses = cn(
                    'min-w-[100px] h-10 px-4 flex items-center justify-center text-sm font-medium transition-all relative',
                    // Use text-decoration for selected state if minimal, or border?
                    // Design is ambiguous but requested 'enhance variant component'.
                    // Let's make them clickable text or buttons.
                    selected
                      ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black"
                      : 'text-black/60 hover:text-black',
                    !exists && 'opacity-50 cursor-not-allowed',
                  );

                  if (isDifferentProduct) {
                    return (
                      <Link
                        key={option.name + name}
                        className={commonClasses}
                        prefetch="intent"
                        preventScrollReset
                        replace
                        to={`/products/${handle}?${variantUriQuery}`}
                      >
                        <ProductOptionSwatch swatch={swatch} name={name} />
                      </Link>
                    );
                  } else {
                    return (
                      <button
                        type="button"
                        key={option.name + name}
                        className={commonClasses}
                        disabled={!exists}
                        onClick={() => {
                          if (!selected) {
                            void navigate(`?${variantUriQuery}`, {
                              replace: true,
                              preventScrollReset: true,
                            });
                          }
                        }}
                      >
                        <ProductOptionSwatch swatch={swatch} name={name} />
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Add To Cart Section */}
      <div className="flex flex-col gap-6 w-full">
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            open('cart');
          }}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    selectedVariant,
                  },
                ]
              : []
          }
          variant="filled"
          className="w-full"
        >
          {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>

        {complimentaryShipping?.value && (
          <p className="text-center text-[#4CAF50]">
            {complimentaryShipping.value}
          </p>
        )}
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (image) {
    return (
      <div
        aria-label={name}
        className="size-8 rounded-full bg-cover bg-center border border-black/10"
        style={{backgroundImage: `url(${image})`}}
      />
    );
  }

  if (color) {
    return (
      <div
        aria-label={name}
        className="size-8 rounded-full border border-black/10"
        style={{backgroundColor: color}}
      />
    );
  }

  // Text fallback
  return <h3 className="text-h3-regular">{name}</h3>;
}
