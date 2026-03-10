import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {cn} from '~/lib/utils';

export function ProductPrice({
  price,
  compareAtPrice,
  className,
  isLoading = false,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <div className={cn('product-price relative', className)}>
      {/* Loading skeleton */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-200 flex items-center',
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="animate-pulse bg-primary/10 h-[1.25em] w-24 rounded" />
      </div>

      {/* Actual price content */}
      <div
        className={cn(
          'transition-opacity duration-200',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
      >
        {compareAtPrice ? (
          <div className="product-price-on-sale">
            {price ? <Money data={price} /> : null}
            <s>
              <Money data={compareAtPrice} />
            </s>
          </div>
        ) : price ? (
          <Money data={price} />
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
}
