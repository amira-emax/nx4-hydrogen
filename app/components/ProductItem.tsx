import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {Button} from './ui/button';

export function ProductItem({
  product,
  loading,
}: {
  product: CollectionItemFragment | ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image =
    (product as any)?.cardImage?.reference?.image || product.featuredImage;

  return (
    <Link to={variantUrl} prefetch="intent">
      <div
        className="group relative flex flex-col md:h-dvh md:justify-start p-3 md:p-0"
        key={product.id}
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full md:absolute md:inset-0 md:aspect-auto md:h-full overflow-hidden">
          {image && (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              draggable={false}
              loading={loading}
              sizes="(min-width: 45em) 50vw, 100vw"
              className="h-full w-full object-cover md:transition-transform md:duration-500 md:group-hover:scale-105"
            />
          )}
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col gap-3 md:gap-4 p-3 px-0 md:p-[56px] md:absolute md:bottom-0 md:text-white w-full md:bg-linear-to-t md:from-black/60 md:via-black/30 md:to-transparent">
          {/* Title & Price */}
          <div className="flex md:flex-col gap-[64px] md:gap-2 justify-between items-start">
            <h1 className="text-h3 md:text-h1 text-black md:text-white text-pretty">
              {product.title}
            </h1>

            {/* Mobile Price */}
            <div className="flex justify-between items-center md:hidden">
              <span className="text-h3 text-black whitespace-nowrap">
                <Money
                  as="span"
                  data={product.priceRange.minVariantPrice}
                  withoutTrailingZeros
                />
                {product.priceRange.minVariantPrice.amount !==
                  product.priceRange.maxVariantPrice.amount && (
                  <>
                    {' - '}
                    <Money
                      as="span"
                      data={product.priceRange.maxVariantPrice}
                      withoutCurrency
                      withoutTrailingZeros
                    />
                  </>
                )}
              </span>
            </div>

            <p className="hidden md:block text-body-medium">
              {(product as any)?.cardLabel?.value}
            </p>
          </div>

          {/* Buttons */}
          <div className="w-fit">
            {/* Mobile Button */}
            <div className="w-full md:hidden">
              <Button
                variant="box"
                className="w-full justify-center cursor-pointer"
              >
                View product
              </Button>
            </div>

            {/* Desktop Button */}
            <div className="hidden md:block">
              <Button
                variant="box-inverse"
                size="md"
                className="px-8 cursor-pointer"
              >
                View Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
