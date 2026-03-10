import {useEffect, useState} from 'react';
import {WheelGesturesPlugin} from 'embla-carousel-wheel-gestures';
import type {
  CtaFragment,
  HeroCarouselFragment,
} from 'types/storefrontapi.generated';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '~/components/ui/carousel';
import {cn} from '~/lib/utils';
import CtaButton from '../CtaButton';
import {HeroCarouselItem} from './HeroCarouselItem';

// --- Main Component ---

interface HeroCarouselProps {
  reference: HeroCarouselFragment;
}

export function HeroCarousel({reference}: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [isCentered, setIsCentered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.reInit();

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    const checkScrollability = () => {
      const canScroll = api.canScrollPrev() || api.canScrollNext();
      setIsCentered(!canScroll);
    };

    // Initial checks
    onSelect();
    checkScrollability();

    // Listeners
    api.on('reInit', checkScrollability);
    api.on('select', checkScrollability);
    api.on('select', onSelect);

    return () => {
      api.off('reInit', checkScrollability);
      api.off('select', checkScrollability);
      api.off('select', onSelect);
    };
  }, [api]);

  // Extract data from reference
  const title = reference.title?.value;
  const description = reference.description?.value;
  const cta = reference.cta?.reference as CtaFragment | undefined;
  const items = reference.items?.references?.nodes || [];
  const anchorId = reference.anchor?.reference?.handle;

  return (
    <div
      id={anchorId || undefined}
      className="w-full bg-[#eee] py-24 px-0 flex flex-col items-center gap-12 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center px-6 md:px-0 flex flex-col items-center gap-4">
        {title && <h2 className="font-semibold uppercase">{title}</h2>}
        {description && <p className="max-w-lg mx-auto">{description}</p>}
        {cta && <CtaButton reference={cta} variant="box" />}
      </div>

      {/* Carousel Wrapper */}
      <div className="w-full relative">
        <Carousel
          setApi={setApi}
          plugins={[WheelGesturesPlugin()]}
          opts={{
            align: 'center',
            loop: false,
            containScroll: false,
            slidesToScroll: 1,
            inViewThreshold: 0.5,
            breakpoints: {
              '(min-width: 768px)': {
                containScroll: 'trimSnaps',
              },
            },
            watchDrag: !isCentered,
          }}
          className="w-full"
        >
          <CarouselContent
            className={cn('-ml-4', isCentered && 'justify-center')}
          >
            {items.map((item, index) => {
              if (!item.image?.reference?.image) return null;

              return (
                <CarouselItem
                  key={item.id || index}
                  className="pl-4 basis-[80%] md:basis-[420px] max-w-[420px] md:max-w-none"
                >
                  <HeroCarouselItem item={item} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
