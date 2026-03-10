import {Image} from '@shopify/hydrogen';
import type {HeroFeaturedFragment} from 'types/storefrontapi.generated';

interface HeroFeaturedProps {
  reference: HeroFeaturedFragment;
}

export function HeroFeatured({reference}: HeroFeaturedProps) {
  // Extract data from reference
  const label = reference.label?.value;
  const description = reference.description?.value;
  const platforms = reference.platforms?.references?.nodes || [];
  const anchorId = reference.anchor?.reference?.handle;

  // Split description by newlines for multiple paragraphs
  const paragraphs = description?.split('\n').filter(Boolean) || [];

  return (
    <div
      id={anchorId || undefined}
      className="bg-black py-12 md:py-24 px-6 md:px-10 flex flex-col items-center gap-16 md:gap-24 text-white"
    >
      <div className="flex flex-col items-center gap-6 w-full">
        {label && <p className="text-caption text-center">{label}</p>}
        {platforms.length > 0 && (
          <div className="flex items-center justify-center gap-8 md:gap-12 w-full flex-wrap">
            {platforms.map((platform, index) => {
              const imageData = platform.image;

              return imageData?.url ? (
                <div key={index} className="relative h-4 md:h-7">
                  <Image
                    data={imageData}
                    sizes="auto"
                    className="h-full w-auto object-contain opacity-80"
                  />
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Description paragraphs */}
      {paragraphs.length > 0 && (
        <div className="flex flex-col items-center text-center max-w-[480px] gap-6">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
