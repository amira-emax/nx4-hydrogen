import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {ExternalLink} from 'lucide-react';
import type {CarouselItemFragment} from 'types/storefrontapi.generated';
import {cn} from '~/lib/utils';

interface HeroCarouselItemProps {
  item: CarouselItemFragment;
}

export function HeroCarouselItem({item}: HeroCarouselItemProps) {
  const layout = item.layout?.value;
  const link = getLink(item);

  // Render based on layout
  switch (layout) {
    case 'Card':
      return <CarouselItemCard item={item} link={link} />;
    case 'Image Only':
      return <CarouselItemImageOnly item={item} link={link} />;
    case 'Image Top':
    case 'Content Top':
      return (
        <CarouselItemSplit
          item={item}
          link={link}
          variant={layout === 'Image Top' ? 'image-top' : 'content-top'}
        />
      );
    default:
      // Fallback to Image Only if no layout specified
      return <CarouselItemImageOnly item={item} link={link} />;
  }
}

// --- Helper: Link ---
function getLink(item: CarouselItemFragment) {
  if (item.externalUrl?.value) return item.externalUrl.value;
  if (item.internalUrl?.value) return item.internalUrl.value;
  if (item.referencedProduct?.reference) {
    return `/products/${item.referencedProduct.reference.handle}`;
  }
  return undefined;
}

function ItemLink({
  link,
  children,
  className,
}: {
  link?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!link) return <div className={className}>{children}</div>;

  const isExternal = link.startsWith('http');
  if (isExternal) {
    return (
      <a
        href={link}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={link} className={className}>
      {children}
    </Link>
  );
}

// --- Variants ---

// 1. Image Only Variant
function CarouselItemImageOnly({
  item,
  link,
}: {
  item: CarouselItemFragment;
  link?: string;
}) {
  const image = item.image?.reference?.image;
  const label = item.label?.value;

  if (!image) return null;

  const isExternal = link?.startsWith('http');

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] group/item overflow-hidden">
      <ItemLink link={link} className="block w-full h-full">
        <Image
          data={image}
          draggable={false}
          sizes="(min-width: 768px) 420px, 80vw"
          className="absolute inset-0 w-full h-full object-cover md:transition-transform md:duration-700 md:group-hover/item:scale-105"
        />
        {/* External Link Button */}
        {link && isExternal && (
          <div className="absolute top-2 right-2 z-10 w-[40px] h-[40px] bg-[#646464]/60 flex items-center justify-center transition-opacity hover:opacity-100">
            <ExternalLink className="text-white w-5 h-5" />
          </div>
        )}
        {/* Caption Overlay (Bottom) */}
        {label && (
          <div className="absolute bottom-0 left-0 right-0 h-[97px] flex items-center justify-center pointer-events-none bg-linear-to-t from-black via-black/40 to-transparent">
            <div className="text-white text-caption tracking-[2.3px]">
              {label}
            </div>
          </div>
        )}
      </ItemLink>
    </div>
  );
}

// 2. Card Variant
function CarouselItemCard({
  item,
  link,
}: {
  item: CarouselItemFragment;
  link?: string;
}) {
  const image = item.image?.reference?.image;
  const label = item.label?.value;
  const description = item.description?.value;
  const caption = item.caption?.value;

  if (!image) return null;

  return (
    <div className="flex flex-col h-full w-full bg-transparent overflow-hidden">
      <ItemLink link={link} className="flex flex-col h-full group/item">
        {/* Image */}
        <div className="relative w-full aspect-330/418 overflow-hidden mb-4">
          <Image
            data={image}
            sizes="(min-width: 768px) 420px, 80vw"
            draggable={false}
            className="w-full h-full object-cover md:transition-transform md:duration-500 md:group-hover/item:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start text-left gap-3">
          {label && <h3>{label}</h3>}
          {description && (
            <p className="line-clamp-3 text-pretty">{description}</p>
          )}
          {caption && <p className="text-secondary">{caption}</p>}
        </div>
      </ItemLink>
    </div>
  );
}

// 3. Split Variant
function CarouselItemSplit({
  item,
  link,
  variant,
}: {
  item: CarouselItemFragment;
  link?: string;
  variant: 'image-top' | 'content-top';
}) {
  const image = item.image?.reference?.image;
  const logo = item.logo?.reference?.image;
  const label = item.label?.value;

  if (!image) return null;

  const ImageSection = (
    <div className="flex-1 relative min-h-[250px] w-full overflow-hidden group/item">
      <LinkWrapper link={link} className="block w-full h-full">
        <Image
          data={image}
          draggable={false}
          sizes="(min-width: 768px) 420px, 100vw"
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            // 'md:transition-transform md:duration-500 md:group-hover/item:scale-105',
          )}
        />
      </LinkWrapper>
    </div>
  );

  const ContentSection = (
    <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 gap-8 text-center min-h-[250px] w-full">
      {/* Text */}
      {label && <p className="text-black max-w-[363px]">{label}</p>}
      {/* Logo */}
      {logo && (
        <div className="w-[127px] h-[32px] relative">
          <Image
            data={logo}
            draggable={false}
            sizes="127px"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-stretch border-white/50 md:border-r border-b md:border-b-0 last:border-0 bg-white shadow-sm">
      {variant === 'image-top' ? (
        <>
          {ImageSection}
          {ContentSection}
        </>
      ) : (
        <>
          {ContentSection}
          {ImageSection}
        </>
      )}
    </div>
  );
}

function LinkWrapper({
  link,
  children,
  className,
}: {
  link?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!link) return <div className={className}>{children}</div>;
  return (
    <ItemLink link={link} className={className}>
      {children}
    </ItemLink>
  );
}
