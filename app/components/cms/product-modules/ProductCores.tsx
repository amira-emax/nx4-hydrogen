import {Image} from '@shopify/hydrogen';
import type {ProductCoresFragment} from 'types/storefrontapi.generated';

interface ProductCoresProps {
  reference: ProductCoresFragment;
}

export function ProductCores({reference}: ProductCoresProps) {
  const desktopImage = reference.desktopImage?.reference?.image;
  const mobileImage = reference.mobileImage?.reference?.image;

  // Parse labels from JSON string or use fallback
  let labels: string[] = [];
  try {
    if (reference.labels?.value) {
      labels = JSON.parse(reference.labels.value) as string[];
    }
  } catch (e) {
    // Fallback: split by comma if JSON parse fails
    if (reference.labels?.value) {
      labels = reference.labels.value.split(',').map((s) => s.trim());
    }
  }

  // Fallback defaults if no labels found (robustness)
  if (labels.length === 0) {
    labels = [
      'HARVESTED WITH CARE',
      'PURE BY NATURE',
      'TRADITIONALLY BREWED',
      'CLEAN & UNCOMPROMISED',
      'A DAILY RITUAL',
    ];
  }

  return (
    <div className="relative w-full bg-black text-white overflow-hidden min-h-[720px] md:min-h-[651px]">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {/* Desktop Image */}
        {desktopImage && (
          <div className="hidden md:block w-full h-full">
            <Image
              data={desktopImage}
              draggable={false}
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Mobile Image */}
        {mobileImage && (
          <div className="md:hidden w-full h-full">
            <Image
              data={mobileImage}
              draggable={false}
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full min-h-[600px] flex items-center justify-center px-10 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-10 md:gap-4">
          {labels.map((label, index) => (
            <div key={index} className="text-center text-caption leading-7">
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
