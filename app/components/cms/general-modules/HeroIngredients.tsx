import {Image} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {motion, useMotionValue, useSpring} from 'motion/react';
import CtaButton from '../CtaButton';
import type {HeroIngredientsFragment} from 'types/storefrontapi.generated';
import {cn, formatHeight} from '~/lib/utils';

interface HeroIngredientsProps {
  reference: HeroIngredientsFragment;
}

export function HeroIngredients({reference}: HeroIngredientsProps) {
  // Extract data from reference
  const title = reference.title?.value;
  const logoData = reference.logo?.reference?.image;
  const desktopImageData = reference.desktopImage?.reference?.image;
  const mobileImageData =
    reference.mobileImage?.reference?.image || desktopImageData;
  const items = reference.items?.references?.nodes || [];
  const cta = reference.cta?.reference;
  const anchorId = reference.anchor?.reference?.handle;
  const desktopHeight = formatHeight(
    reference.desktopHeight?.value || undefined,
  );
  const mobileHeight = formatHeight(reference.mobileHeight?.value || undefined);

  // Artwork rotation logics
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, {stiffness: 300, damping: 30});
  const logoRef = useRef<HTMLDivElement>(null);
  const shouldRotate = reference.rotateLogo?.value === 'true';

  useEffect(() => {
    if (!shouldRotate) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!logoRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // Calculate angle in radians
      const angleRad = Math.atan2(deltaY, deltaX);

      // Convert to degrees and adjust so top points to cursor
      const angleDeg = (angleRad * 180) / Math.PI;
      rotation.set(angleDeg + 90);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldRotate, rotation]);

  return (
    <div
      id={anchorId || undefined}
      className="relative w-full overflow-hidden bg-black"
    >
      {/* Background Images */}
      {mobileImageData && (
        <div className="absolute inset-0 md:hidden">
          <Image
            data={mobileImageData}
            draggable={false}
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      {desktopImageData && (
        <div className="absolute inset-0 hidden md:block">
          <Image
            data={desktopImageData}
            draggable={false}
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          'relative py-[120px] md:py-[168px] px-[24px] md:px-[200px] flex flex-col items-center justify-center text-white text-center',
          mobileHeight
            ? 'h-(--hero-height-mobile)'
            : mobileImageData || desktopImageData
              ? 'min-h-dvh'
              : 'h-auto',
          desktopHeight && 'md:h-(--hero-height-desktop)',
        )}
        style={
          {
            ...(mobileHeight && {'--hero-height-mobile': mobileHeight}),
            ...(desktopHeight && {'--hero-height-desktop': desktopHeight}),
          } as React.CSSProperties
        }
      >
        {/* Icon/Artwork */}
        {logoData && (
          <motion.div
            ref={logoRef}
            className="mb-8 w-14 h-14 relative will-change-transform"
            style={{rotate: smoothRotation}}
          >
            <Image
              data={logoData ?? undefined}
              sizes="56px"
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}

        {/* Main Title */}
        {title && (
          <div className="mb-16">
            <h2 className="text-caption tracking-[0.17em] uppercase">
              {title}
            </h2>
          </div>
        )}

        {/* Ingredients List */}
        {items.length > 0 && (
          <div className="flex flex-col gap-10 mb-16 max-w-[320px]">
            {items.map((item, index) => {
              const itemTitle = item.title?.value;
              const itemDescription = item.description?.value;

              return (
                <div
                  key={item.id || index}
                  className="flex flex-col gap-2 items-center"
                >
                  {itemTitle && (
                    <h3 className="text-caption tracking-[0.17em] uppercase">
                      {itemTitle}
                    </h3>
                  )}
                  {itemDescription && (
                    <p className="text-white">{itemDescription}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Button */}
        {cta && <CtaButton reference={cta} variant="box-inverse" />}
      </div>
    </div>
  );
}
