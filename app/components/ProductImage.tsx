import {Image} from '@shopify/hydrogen';
import type {Image as ShopifyImage} from '@shopify/hydrogen/storefront-api-types';
import {Plus, Minus} from 'lucide-react';
import {motion} from 'motion/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Controlled as ControlledZoom} from 'react-medium-image-zoom';
import type {ProductVariantFragment} from 'types/storefrontapi.generated';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';
import {Button} from './ui/button';
import {ZoomArrow} from '~/assets/ZoomArrow';
import {cn} from '~/lib/utils';

type ProductImageProps = {
  selectedVariantImage?: ProductVariantFragment['image'];
  mediaImages?: ShopifyImage[];
};
const ZOOM_STEPS = [0.75, 1, 1.5, 2];

const DESKTOP_QUERY = '(min-width: 768px) and (min-height: 728px)';

/** Returns true when the viewport matches the desktop product-image layout. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(DESKTOP_QUERY).matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

// Unified Product Image Component
export function ProductImage(props: ProductImageProps) {
  const isDesktop = useIsDesktop();
  return isDesktop ? (
    <DesktopProductImage {...props} />
  ) : (
    <MobileProductImage {...props} />
  );
}

// --- Context Definition ---

type ProductImageContextType = {
  zoomScale: number;
  setZoomScale: (scale: number | ((s: number) => number)) => void;
  mediaImages: ShopifyImage[];
  currentlyRenderedImage: ShopifyImage | null;
  setCurrentlyRenderedImage: (image: ShopifyImage | null) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  handleNextImage: () => void;
  handlePrevImage: () => void;
};

const ProductImageContext = createContext<ProductImageContextType | null>(null);

// --- Extracted ZoomContent Component ---

const ZoomContent = ({img, onUnzoom}: any) => {
  const context = useContext(ProductImageContext);
  const constraintRef = useRef(null);

  if (!context) return <></>;

  const {
    zoomScale,
    setZoomScale,
    mediaImages,
    currentImageIndex,
    setCurrentlyRenderedImage,
    setCurrentImageIndex,
  } = context;

  return (
    <div className="relative flex h-full w-full items-center justify-center p-4 md:p-10">
      <CustomUnzoomButton onClick={onUnzoom} />

      {/* Centered Content Group */}
      <div className="flex flex-row items-center justify-center gap-4 w-full h-full max-h-[85vh]">
        {/* Main Image Wrapper - allows dragging and clipping */}
        <div
          ref={constraintRef}
          className="relative flex-1 min-w-0 h-full flex items-center justify-center overflow-hidden"
        >
          <motion.div
            animate={
              zoomScale === 1
                ? {scale: 1, x: 0, y: 0}
                : {
                    scale: zoomScale,
                  }
            }
            drag={zoomScale > 1}
            dragConstraints={constraintRef}
            dragElastic={0.05}
            transition={{
              type: 'tween',
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center"
          >
            {img}
          </motion.div>
        </div>

        <ThumbnailSidebar
          mediaImages={mediaImages || []}
          currentImageIndex={currentImageIndex}
          onImageSelect={(image, i) => {
            setCurrentlyRenderedImage(image);
            setCurrentImageIndex(i);
            setZoomScale(1);
          }}
        />
      </div>

      <ZoomControls zoomScale={zoomScale} setZoomScale={setZoomScale} />
    </div>
  );
};

// --- Desktop Implementation ---

// Desktop Product Image component with flex layout
export function DesktopProductImage({
  selectedVariantImage,
  mediaImages,
}: ProductImageProps) {
  const [currentlyRenderedImage, setCurrentlyRenderedImage] =
    useState<ShopifyImage | null>(null);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState(1);
  const scrollThrottleRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastVariantImageId = useRef(selectedVariantImage?.id ?? null);

  // Scroll to the variant image when selectedVariantImage changes (skip initial load)
  useEffect(() => {
    if (selectedVariantImage?.id === lastVariantImageId.current) return;
    lastVariantImageId.current = selectedVariantImage?.id ?? null;
    if (selectedVariantImage?.id && mediaImages && mediaImages.length > 0) {
      const targetIndex = mediaImages.findIndex(
        (img) => img.id === selectedVariantImage.id,
      );
      if (targetIndex >= 0 && containerRef.current) {
        // Can't rely on sticky element positions — they report their
        // stuck position. Instead, calculate from the container's top
        // and the image index (each image is h-dvh).
        const containerTop =
          containerRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: containerTop + targetIndex * window.innerHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedVariantImage?.id]);

  // Update currentlyRenderedImage when zoomedIndex changes
  useEffect(() => {
    if (zoomedIndex !== null && mediaImages && mediaImages.length > 0) {
      setCurrentlyRenderedImage(mediaImages[zoomedIndex]);
      setCurrentImageIndex(zoomedIndex);
      setZoomScale(1);
    } else {
      setCurrentlyRenderedImage(null);
    }
  }, [zoomedIndex, mediaImages]);

  // Handle navigation to previous image
  const handlePrevImage = useCallback(() => {
    if (mediaImages && mediaImages.length > 0) {
      const prevIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : mediaImages.length - 1;
      setCurrentlyRenderedImage(mediaImages[prevIndex]);
      setCurrentImageIndex(prevIndex);
      setZoomScale(1);
    }
  }, [currentImageIndex]);

  // Handle navigation to next image
  const handleNextImage = useCallback(() => {
    if (mediaImages && mediaImages.length > 0) {
      const nextIndex =
        currentImageIndex < mediaImages.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentlyRenderedImage(mediaImages[nextIndex]);
      setCurrentImageIndex(nextIndex);
      setZoomScale(1);
    }
  }, [currentImageIndex]);

  // Handle scroll to navigate images when zoomed
  useEffect(() => {
    if (zoomedIndex === null) return;

    const handleWheel = (e: WheelEvent) => {
      if (scrollThrottleRef.current) return;

      // Threshold to avoid sensitive scrolling
      if (Math.abs(e.deltaY) > 20) {
        scrollThrottleRef.current = true;

        if (e.deltaY > 0) {
          handleNextImage();
        } else {
          handlePrevImage();
        }

        // Throttle duration
        setTimeout(() => {
          scrollThrottleRef.current = false;
        }, 300);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [zoomedIndex, handleNextImage, handlePrevImage]);

  // Context value
  const contextValue = useMemo(
    () => ({
      zoomScale,
      setZoomScale,
      mediaImages: mediaImages || [],
      currentlyRenderedImage,
      setCurrentlyRenderedImage,
      currentImageIndex,
      setCurrentImageIndex,
      handleNextImage,
      handlePrevImage,
    }),
    [
      zoomScale,
      mediaImages,
      currentlyRenderedImage,
      currentImageIndex,
      handleNextImage,
      handlePrevImage,
    ],
  );

  if (!mediaImages || mediaImages.length <= 0) {
    return null;
  }

  return (
    <ProductImageContext.Provider value={contextValue}>
      <div className="col-span-6 h-full">
        <div ref={containerRef} className="relative flex flex-col z-0">
          {mediaImages.map((image, index) => (
            <div
              key={image.url || index}
              className="sticky top-0"
              style={{zIndex: index}}
            >
              <div className="relative overflow-hidden">
                <ControlledZoom
                  isZoomed={zoomedIndex === index}
                  onZoomChange={(zoomed) => {
                    if (!zoomed) setZoomedIndex(null);
                  }}
                  zoomMargin={64}
                  ZoomContent={ZoomContent}
                >
                  <Image
                    alt={image.altText || `Product Image ${index + 1}`}
                    data={currentlyRenderedImage || image}
                    draggable={false}
                    sizes="(min-width: 45em) 50vw, 100vw"
                    className="w-full h-dvh object-cover cursor-default!"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                </ControlledZoom>
              </div>
            </div>
          ))}
          <div className="sticky bottom-0 z-10 h-0 w-full">
            <CustomZoomButton
              onClick={() => setZoomedIndex(0)}
              className="absolute right-8 bottom-8"
            />
          </div>
        </div>
      </div>
    </ProductImageContext.Provider>
  );
}

// Helper component for Zoom Button
function CustomZoomButton({
  onClick,
  className,
  disableHover = false,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disableHover?: boolean;
}) {
  return (
    <motion.div
      initial={{opacity: 1}}
      transition={{duration: 0.3}}
      className={className}
    >
      <Button
        size="icon"
        onClick={onClick}
        className={`group w-[48px] h-[48px] aspect-square cursor-zoom-in bg-black/50 text-white backdrop-blur-md disabled:opacity-50 ${
          disableHover ? '' : 'hover:bg-black/70'
        }`}
      >
        <div className="rotate-45">
          <ZoomArrow className="h-2! w-2! rotate-135" />
          <motion.div
            className={`w-px h-3 transition-all duration-100 ${
              disableHover ? '' : 'group-hover:h-4.5'
            }`}
          />
          <ZoomArrow className="h-2! w-2! -rotate-45" />
        </div>
      </Button>
    </motion.div>
  );
}

// Helper component for Unzoom Button
function CustomUnzoomButton({
  onClick,
  className,
  disableHover = false,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disableHover?: boolean;
}) {
  return (
    <motion.div
      initial={{opacity: 1}}
      transition={{duration: 0.3}}
      className={className ?? 'absolute top-10 right-10'}
    >
      <Button
        size="icon"
        onClick={onClick}
        className={`group w-[48px] h-[48px] aspect-square cursor-zoom-out bg-black/50 text-white backdrop-blur-md disabled:opacity-50 ${
          disableHover ? '' : 'hover:bg-black/70'
        }`}
      >
        <div className="rotate-45">
          <ZoomArrow className="h-2! w-2! -rotate-45" />
          <motion.div
            className={`w-px h-4.5 transition-all duration-100 ${
              disableHover ? '' : 'group-hover:h-3'
            }`}
          />
          <ZoomArrow className="h-2! w-2! rotate-135" />
        </div>
      </Button>
    </motion.div>
  );
}

// Helper component for Zoom Controls
function ZoomControls({
  zoomScale,
  setZoomScale,
}: {
  zoomScale: number;
  setZoomScale: (scale: number | ((s: number) => number)) => void;
}) {
  return (
    <div className="h-[36px] fixed bottom-10 right-10 flex gap-2 z-100">
      <Button
        size="icon"
        onClick={() => {
          const stepIndex = ZOOM_STEPS.indexOf(zoomScale);
          const nextStep =
            stepIndex > 0 ? ZOOM_STEPS[stepIndex - 1] : ZOOM_STEPS[0];
          setZoomScale(nextStep);
        }}
        disabled={zoomScale <= ZOOM_STEPS[0]}
        className="bg-black/50 text-white backdrop-blur-md hover:bg-black/70 disabled:opacity-50"
      >
        <Minus className="size-4" />
      </Button>
      <div className="flex bg-black/50 text-cta text-white backdrop-blur-md items-center justify-center p-2 min-w-[50px] select-none">
        {Math.round(zoomScale * 100)}%
      </div>
      <Button
        size="icon"
        onClick={() => {
          const stepIndex = ZOOM_STEPS.indexOf(zoomScale);
          const nextStep =
            stepIndex < ZOOM_STEPS.length - 1
              ? ZOOM_STEPS[stepIndex + 1]
              : ZOOM_STEPS[ZOOM_STEPS.length - 1];
          setZoomScale(nextStep);
        }}
        disabled={zoomScale >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
        className="bg-black/50 text-white backdrop-blur-md hover:bg-black/70 disabled:opacity-50"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

// Helper component for Thumbnail Sidebar
function ThumbnailSidebar({
  mediaImages,
  currentImageIndex,
  onImageSelect,
}: {
  mediaImages: ShopifyImage[];
  currentImageIndex: number;
  onImageSelect: (image: ShopifyImage, index: number) => void;
}) {
  return (
    <div className="w-16 md:w-20 shrink-0 flex flex-col gap-3 max-h-full overflow-y-auto py-1 px-1 custom-scrollbar">
      {mediaImages?.map((image, i) => (
        <button
          key={i}
          onClick={() => onImageSelect(image, i)}
          className={`relative aspect-3/4 w-full overflow-hidden transition-all ring-offset-2 ring-offset-black ${
            currentImageIndex === i
              ? 'ring-2 ring-white opacity-100'
              : 'ring-0 opacity-50 hover:opacity-100'
          }`}
        >
          <Image
            data={image}
            draggable={false}
            aspectRatio="3/4"
            sizes="100px"
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}

// --- Mobile Implementation ---

// Mobile Product Image component with carousel
export function MobileProductImage({
  selectedVariantImage,
  mediaImages,
}: ProductImageProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [currentlyRenderedImage, setCurrentlyRenderedImage] =
    useState<ShopifyImage | null>(null);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const lastZoomedIndex = useRef(0);

  useEffect(() => {
    if (zoomedIndex !== null) {
      lastZoomedIndex.current = zoomedIndex;
    }
  }, [zoomedIndex]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Scroll carousel to the variant image when selectedVariantImage changes (skip initial load)
  const lastVariantImageIdMobile = useRef(selectedVariantImage?.id ?? null);
  useEffect(() => {
    if (selectedVariantImage?.id === lastVariantImageIdMobile.current) return;
    lastVariantImageIdMobile.current = selectedVariantImage?.id ?? null;
    if (!api || !selectedVariantImage?.id || !mediaImages) return;
    const targetIndex = mediaImages.findIndex(
      (img) => img.id === selectedVariantImage.id,
    );
    if (targetIndex >= 0) {
      api.scrollTo(targetIndex);
    }
  }, [api, selectedVariantImage?.id, mediaImages]);

  const allImages = mediaImages || [];

  if (!selectedVariantImage && (!mediaImages || mediaImages.length <= 0)) {
    return null;
  }

  if (allImages.length === 0) return <div />;

  return (
    <div className="relative border-b border-gray-100">
      <Carousel
        opts={{
          align: 'center',
          loop: false,
          containScroll: 'trimSnaps',
          watchDrag: zoomedIndex === null,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent className="ml-0">
          {allImages.map((image, index) => (
            <CarouselItem key={image.id || index} className="pl-0 basis-full">
              <div
                className={cn(
                  'aspect-390/573 w-full overflow-hidden relative bg-[#F6F0E6]',
                  'md:[@media(max-height:728px)]:h-[calc(100dvh-var(--header-height)-var(--global-banner-height))]',
                  'md:[@media(max-height:728px)]:w-auto',
                  'md:[@media(max-height:728px)]:mx-auto',
                )}
              >
                <Image
                  alt={image.altText || 'Product Image'}
                  aspectRatio="390/573"
                  data={image}
                  draggable={false}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CustomZoomButton
        onClick={() => setZoomedIndex(current - 1)}
        className="absolute right-4 bottom-4"
        disableHover
      />

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {Array.from({length: count}).map((_, index) => (
          <button
            key={index}
            className={`size-2 rounded-full transition-all ${
              index + 1 === current
                ? 'bg-black/60'
                : 'bg-white border border-black/10'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom Fullscreen Zoom Modal */}
      {zoomedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-white animate-in fade-in duration-200">
          <ZoomCarousel
            images={allImages}
            initialIndex={lastZoomedIndex.current}
            onUnzoom={() => setZoomedIndex(null)}
          />
        </div>
      )}
    </div>
  );
}

// Helper component for Mobile Zoom Carousel
function ZoomCarousel({
  images,
  initialIndex,
  onUnzoom,
}: {
  images: any[];
  initialIndex: number;
  onUnzoom: () => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative flex flex-col w-full h-full items-center justify-center pb-4">
      <CustomUnzoomButton
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onUnzoom();
        }}
        className="absolute top-6 right-6 z-10"
        disableHover
      />

      <div
        className="flex-1 w-full flex items-center justify-center overflow-hidden"
        onPointerDown={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <Carousel
          opts={{
            align: 'center',
            startIndex: initialIndex,
            loop: true,
          }}
          setApi={setApi}
          className="w-full h-full **:data-[slot=carousel-content]:h-full"
        >
          <CarouselContent className="h-full ml-0">
            {images.map((image, index) => (
              <CarouselItem
                key={image.id || index}
                className="relative pl-0 basis-full h-full"
              >
                <CarouselItem
                  key={image.id || index}
                  className="relative pl-0 basis-full h-full"
                >
                  <Image
                    alt={image.altText || 'Product Image'}
                    data={image}
                    draggable={false}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <MobileThumbnailBar
        mediaImages={images}
        currentImageIndex={currentIndex}
        onImageSelect={(index) => {
          api?.scrollTo(index);
        }}
      />
    </div>
  );
}

// Helper component for Mobile Thumbnail Sidebar
function MobileThumbnailBar({
  mediaImages,
  currentImageIndex,
  onImageSelect,
}: {
  mediaImages: any[];
  currentImageIndex: number;
  onImageSelect: (index: number) => void;
}) {
  return (
    <div className="h-20 w-full shrink-0 flex flex-row gap-3 overflow-x-auto py-1 px-4 custom-scrollbar justify-center mt-4">
      {mediaImages?.map((image, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            onImageSelect(i);
          }}
          className={`relative aspect-3/4 h-full overflow-hidden transition-all ring-offset-2 ring-offset-black shrink-0 ${
            currentImageIndex === i
              ? 'ring-2 ring-white opacity-100'
              : 'ring-0 opacity-50 hover:opacity-100'
          }`}
        >
          <Image
            data={image}
            draggable={false}
            aspectRatio="3/4"
            sizes="100px"
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
