import {Image} from '@shopify/hydrogen';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '~/components/ui/tabs';
import {cn, formatHeight} from '~/lib/utils';
import type {HeroSliderFragment} from 'types/storefrontapi.generated';

interface HeroSliderProps {
  reference: HeroSliderFragment;
}

export function HeroSlider({reference}: HeroSliderProps) {
  // Extract data from reference
  const items = reference.items?.references?.nodes || [];
  const anchorId = reference.anchor?.reference?.handle;
  const desktopHeight = formatHeight(
    reference.desktopHeight?.value || undefined,
  );
  const mobileHeight = formatHeight(reference.mobileHeight?.value || undefined);

  // If no items, don't render
  if (items.length === 0) {
    return null;
  }

  // Create slides with IDs for tabs
  const slides = items.map((item, index) => ({
    id: item.id || `slide-${index}`,
    title: item.title?.value || '',
    label: item.label?.value || '',
    description: item.description?.value || '',
    desktopImage: item.desktopImage?.reference?.image,
    mobileImage: item.mobileImage?.reference?.image,
  }));

  return (
    <div
      id={anchorId || undefined}
      className="w-full bg-white text-white h-(--mobile-height) md:h-(--desktop-height)"
      style={
        {
          '--mobile-height': mobileHeight || '100dvh',
          '--desktop-height': desktopHeight || '100dvh',
        } as React.CSSProperties
      }
    >
      <Tabs
        defaultValue={slides[0].id}
        className="w-full h-full flex flex-col gap-0"
      >
        {/* Tab Content (Images) */}
        <div className="relative w-full flex-1 overflow-hidden">
          {slides.map((slide) => {
            const mobileImage = slide.mobileImage || slide.desktopImage;

            return (
              <TabsContent
                key={slide.id}
                value={slide.id}
                className="absolute inset-0 w-full h-full m-0 p-0 border-none outline-none data-[state=inactive]:hidden"
              >
                {/* Mobile Image */}
                {mobileImage && (
                  <Image
                    data={mobileImage}
                    draggable={false}
                    sizes="100vw"
                    className="w-full h-full object-cover md:hidden"
                  />
                )}
                {/* Desktop Image */}
                {slide.desktopImage && (
                  <Image
                    data={slide.desktopImage}
                    draggable={false}
                    sizes="100vw"
                    className="w-full h-full object-cover hidden md:block"
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Text Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-center text-center px-6">
                  {slide.title && (
                    <h3 className="text-caption mb-4 uppercase tracking-[0.17em]">
                      {slide.title}
                    </h3>
                  )}
                  {slide.description && (
                    <p className="text-white/80 max-w-lg leading-relaxed text-balance">
                      {slide.description}
                    </p>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </div>

        {/* Tab List (Navigation) - Placed Bottom */}
        <div className="w-full pt-[24px] pb-[48px] bg-black relative">
          <TabsList className="flex w-full h-auto bg-transparent p-0 justify-center items-start gap-1 overflow-x-auto no-scrollbar rounded-none">
            {slides.map((slide) => (
              <TabsTrigger
                key={slide.id}
                value={slide.id}
                className={cn(
                  'group flex-none flex flex-col items-center justify-start gap-4', // layout
                  'w-[68px] md:w-[120px] h-auto p-0 rounded-none', // sizing
                  'bg-transparent opacity-50 hover:opacity-100 data-[state=active]:bg-transparent data-[state=active]:opacity-100', // appearance
                  'transition-all duration-300', // animation
                )}
              >
                <div className="relative h-[84px] w-full overflow-hidden cursor-pointer">
                  {slide.desktopImage && (
                    <Image
                      data={slide.desktopImage}
                      draggable={false}
                      sizes="120px"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span
                  className={cn(
                    'text-detail text-white whitespace-pre-wrap overflow-hidden', // base
                    'transition-all duration-300', // animation
                    'max-h-0 opacity-0 -translate-y-2', // hidden state
                    'group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0', // hover state
                    'group-data-[state=active]:max-h-24 group-data-[state=active]:opacity-100 group-data-[state=active]:translate-y-0', // active state
                  )}
                >
                  {slide.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
