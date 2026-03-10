import {Money} from '@shopify/hydrogen';
import {useSheet} from '~/components/SheetContext';
import {AddToCartButton} from '~/components/AddToCartButton';
import type {ProductFragment} from 'storefrontapi.generated';

export function ProductStickyBar({
  product,
  selectedVariant,
}: {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const {open} = useSheet();

  if (!product || !selectedVariant) return null;

  return (
    <div className="bg-background w-full transition-all duration-300 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
      <div className="p-6 flex items-center justify-between gap-4">
        {/* Title and Mobile Price Group */}
        <div className="flex flex-col md:flex-row md:items-center md:flex-1 md:justify-between md:mr-4 overflow-hidden">
          <h3 className="text-body-regular md:text-h3">{product.title}</h3>
          {/* Mobile Price */}
          <span className="text-body-regular md:hidden">
            <Money data={selectedVariant.price} withoutTrailingZeros />
          </span>
        </div>

        {/* Right Section: Desktop Price & Button */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Desktop Price */}
          <span className="hidden md:block text-caption">
            <Money data={selectedVariant.price} withoutTrailingZeros />
          </span>

          <AddToCartButton
            disabled={!selectedVariant.availableForSale}
            onClick={() => {
              open('cart');
            }}
            lines={[
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                selectedVariant,
              },
            ]}
            variant="filled"
            className="text-caption"
          >
            {selectedVariant.availableForSale ? (
              <>
                <span className="md:hidden">Buy</span>
                <span className="hidden md:inline">Add to cart</span>
              </>
            ) : (
              'Sold out'
            )}
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}
