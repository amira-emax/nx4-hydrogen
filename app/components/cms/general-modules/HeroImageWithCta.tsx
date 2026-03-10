import {Image} from '@shopify/hydrogen';
import CtaButton from '../CtaButton';
import type {HeroImageWithCtaFragment} from 'types/storefrontapi.generated';
import {cn, formatHeight} from '~/lib/utils';
import type {VariantProps} from 'class-variance-authority';
import type {buttonVariants} from '~/components/ui/button';

interface HeroImageWithCtaProps {
  reference: HeroImageWithCtaFragment;
  shouldEagerLoad?: boolean;
}

export function HeroImageWithCta({
  reference,
  shouldEagerLoad,
}: HeroImageWithCtaProps) {
  // Extract data from reference
  const desktopImages = reference.desktopImage?.references?.nodes || [];
  const mobileImages = reference.mobileImage?.references?.nodes || [];
  const title = reference.title?.value;
  const subtitle = reference.subtitle?.value;
  const description = reference.description?.value;
  const cta = reference.cta?.reference;
  const contentGradient = reference.contentGradient?.value;
  const contentPosition = reference.contentPosition?.value || 'bottom';
  const contentOffset = reference.contentOffset?.value;
  const anchorId = reference.anchor?.reference?.handle;
  const contentColor = reference.contentColor?.value || 'White';
  const desktopHeight = formatHeight(
    reference.desktopHeight?.value || undefined,
  );
  const mobileHeight = formatHeight(reference.mobileHeight?.value || undefined);

  const isContentWhite = contentColor === 'White';
  const textColorClass = isContentWhite ? 'text-white' : 'text-primary';
  const descriptionColorClass = isContentWhite
    ? 'text-white/80'
    : 'text-primary/80';
  const buttonVariant =
    (cta?.buttonVariant?.value ?? isContentWhite) ? 'box-inverse' : 'box';

  // Parse gradient setting - supports Top, Bottom, Both, None
  const showTopGradient =
    contentGradient === 'Top' || contentGradient === 'Both';
  const showBottomGradient =
    contentGradient === 'Bottom' || contentGradient === 'Both';

  // Parse position setting
  const positionClasses =
    contentPosition === 'Center'
      ? 'inset-0 items-center justify-center'
      : contentPosition === 'Top'
        ? 'top-12 inset-x-0 items-center justify-start'
        : 'bottom-12 inset-x-0 items-center justify-end';

  // Get images with fallbacks
  const firstDesktopImage = desktopImages[0]?.image;
  const secondDesktopImage = desktopImages[1]?.image;
  const firstMobileImage = mobileImages[0]?.image || firstDesktopImage;
  const secondMobileImage = mobileImages[1]?.image || secondDesktopImage;

  // Determine if we have any images
  const hasImages = firstDesktopImage || firstMobileImage;

  // Determine if we have multiple images
  const hasMultipleDesktopImages = desktopImages.length >= 2;
  const hasMultipleMobileImages =
    mobileImages.length >= 2 ||
    (mobileImages.length === 0 && hasMultipleDesktopImages);

  // If no images, render a simple centered content section
  if (!hasImages) {
    return (
      <div
        id={anchorId || undefined}
        className="relative w-full overflow-hidden bg-transparent"
      >
        <div
          className={cn(
            'min-h-[500px] flex flex-col items-center justify-center text-center p-4',
            textColorClass,
          )}
        >
          {/* Caption/Subtitle */}
          {subtitle && (
            <p className="text-caption mb-4 select-none">{subtitle}</p>
          )}

          {/* Title */}
          {title && (
            <h1
              className={cn(
                title === title.toUpperCase() ? 'text-h1-allcaps' : 'text-h1',
                'mb-8 mx-8 max-w-2xl select-none',
              )}
            >
              {title}
            </h1>
          )}

          {/* Description */}
          {description && (
            <p className={cn('mb-8 max-w-lg', descriptionColorClass)}>
              {description}
            </p>
          )}

          {/* CTA */}
          {cta && <CtaButton reference={cta} variant={buttonVariant} />}
        </div>
      </div>
    );
  }

  return (
    <div
      id={anchorId || undefined}
      className="relative w-full overflow-hidden bg-black"
    >
      <div
        className={cn(
          'flex flex-col md:flex-row w-full',
          mobileHeight ? 'h-(--hero-height-mobile)' : 'h-dvh',
          desktopHeight && 'md:h-(--hero-height-desktop)',
        )}
        style={
          {
            ...(mobileHeight && {'--hero-height-mobile': mobileHeight}),
            ...(desktopHeight && {'--hero-height-desktop': desktopHeight}),
          } as React.CSSProperties
        }
      >
        {/* Mobile: Show images (1 or 2 stacked vertically) */}
        {hasMultipleMobileImages ? (
          // Two mobile images stacked
          <>
            {firstMobileImage && (
              <div className="w-full h-1/2 relative md:hidden">
                <Image
                  data={firstMobileImage}
                  draggable={false}
                  loading={shouldEagerLoad ? 'eager' : 'lazy'}
                  fetchPriority={shouldEagerLoad ? 'high' : 'auto'}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            {secondMobileImage && (
              <div className="w-full h-1/2 relative md:hidden">
                <Image
                  data={secondMobileImage}
                  draggable={false}
                  loading={shouldEagerLoad ? 'eager' : 'lazy'}
                  fetchPriority={shouldEagerLoad ? 'high' : 'auto'}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          </>
        ) : (
          // Single mobile image
          firstMobileImage && (
            <div className="w-full h-full relative md:hidden">
              <Image
                data={firstMobileImage}
                draggable={false}
                loading={shouldEagerLoad ? 'eager' : 'lazy'}
                fetchPriority={shouldEagerLoad ? 'high' : 'auto'}
                sizes="100vw"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )
        )}

        {/* Desktop: Show up to 2 images side by side */}
        {hasMultipleDesktopImages ? (
          // Two desktop images side by side
          <>
            {firstDesktopImage && (
              <div className="w-full md:w-1/2 h-full relative hidden md:block">
                <Image
                  data={firstDesktopImage}
                  draggable={false}
                  loading={shouldEagerLoad ? 'eager' : 'lazy'}
                  fetchPriority={shouldEagerLoad ? 'high' : 'auto'}
                  sizes="50vw"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            {secondDesktopImage && (
              <div className="w-full md:w-1/2 h-full relative hidden md:block">
                <Image
                  data={secondDesktopImage}
                  draggable={false}
                  loading={shouldEagerLoad ? 'eager' : 'lazy'}
                  fetchPriority={shouldEagerLoad ? 'high' : 'auto'}
                  sizes="50vw"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
          </>
        ) : (
          // Single desktop image
          firstDesktopImage && (
            <div className="w-full h-full relative hidden md:block">
              <Image
                data={firstDesktopImage}
                draggable={false}
                loading={shouldEagerLoad ? 'eager' : 'lazy'}
                fetchPriority={shouldEagerLoad ? 'high' : 'auto'}
                sizes="100vw"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )
        )}
      </div>

      {/* Gradient Overlays */}
      {showTopGradient && (
        <div className="absolute top-0 inset-x-0 bg-linear-to-b from-black to-transparent pointer-events-none h-[200px]" />
      )}
      {showBottomGradient && (
        <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black to-transparent pointer-events-none h-[200px]" />
      )}

      {/* Content Overlay */}
      <div
        className={cn(
          'absolute flex flex-col text-center p-4',
          positionClasses,
          textColorClass,
        )}
        style={contentOffset ? {paddingBottom: contentOffset} : undefined}
      >
        {/* Caption/Subtitle */}
        {subtitle && (
          <p className="text-caption mb-4 select-none whitespace-pre-line">
            {subtitle}
          </p>
        )}

        {/* Title */}
        {title && (
          <h1
            className={cn(
              title === title.toUpperCase() ? 'text-h1-allcaps' : 'text-h1',
              'mb-8 mx-8 max-w-2xl select-none',
            )}
          >
            {title}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p className={cn('mb-8 max-w-lg', descriptionColorClass)}>
            {description}
          </p>
        )}

        {/* CTA */}
        {cta && <CtaButton reference={cta} variant={buttonVariant} />}
      </div>
    </div>
  );
}
