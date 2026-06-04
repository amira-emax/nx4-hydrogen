import {Image} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {cn} from '~/lib/utils';

interface LogoImageNode {
  id: string;
  logoImage?: {reference?: {image?: {url: string; altText?: string; width?: number; height?: number}}};
}

export interface ScrollableImageFragment {
  id: string;
  type: string;
  bgImage?: {reference?: {image?: {url: string; altText?: string; width?: number; height?: number}}};
  bgPosition?: {value?: string};
  bgFix?: {value?: string};
  sectionHeight?: {value?: string};
  textFade?: {value?: string};
  contentFont?: {value?: string};
  headerFont?: {value?: string};
  headerColorType?: {value?: string};
  headerColor?: {value?: string};
  headerGradient?: {value?: string};
  contentColor?: {value?: string};
  textPosition?: {value?: string};
  textAlignment?: {value?: string};
  header?: {value?: string};
  label?: {value?: string};
  body?: {value?: string};
  urlLabel?: {value?: string};
  url?: {value?: string};
  urlTextItalic?: {value?: string};
  ctaFontWeight?: {value?: string};
  logoImages?: {references?: {nodes: LogoImageNode[]}};
}

interface ScrollableImageProps {
  reference: ScrollableImageFragment;
}

export function ScrollableImage({reference}: ScrollableImageProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const bgImage = reference.bgImage?.reference?.image;
  const bgPosition = reference.bgPosition?.value || 'center';
  const bgFix = reference.bgFix?.value === 'true';
  const sectionHeight = reference.sectionHeight?.value || '50';
  const textFade = reference.textFade?.value === 'true';
  const contentFont = reference.contentFont?.value || 'font-image-future';
  const headerFont = reference.headerFont?.value || contentFont;
  const headerColorType = reference.headerColorType?.value || 'solid';
  const headerColor = reference.headerColor?.value || '#000000';
  const headerGradient = reference.headerGradient?.value;
  const contentColor = reference.contentColor?.value || '#000000';
  const textPosition = reference.textPosition?.value || 'center';
  const textAlignment = reference.textAlignment?.value || 'left';
  const header = reference.header?.value;
  const label = reference.label?.value;
  const body = reference.body?.value;
  const urlLabel = reference.urlLabel?.value;
  const url = reference.url?.value;
  const urlTextItalic = reference.urlTextItalic?.value === 'true';
  const ctaFontWeight = reference.ctaFontWeight?.value || 'font-normal';
  const logoNodes = reference.logoImages?.references?.nodes || [];

  useEffect(() => {
    if (!textFade || !contentRef.current) return;
    const el = contentRef.current;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 1s ease, transform 1s ease';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      {threshold: 0.2},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [textFade]);

  const textPositionClass =
    textPosition === 'top'
      ? 'items-start'
      : textPosition === 'bottom'
        ? 'items-end'
        : 'items-center';

  const contentAlignClass =
    textAlignment === 'center'
      ? 'text-center mx-auto max-w-5xl'
      : textAlignment === 'right'
        ? 'text-right ml-auto'
        : 'text-left max-w-2xl';

  const headerStyle: React.CSSProperties =
    headerColorType === 'solid'
      ? {color: headerColor}
      : {
          background: headerGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };

  return (
    <section
      className={cn('relative w-full bg-no-repeat bg-cover flex', textPositionClass)}
      style={{
        backgroundImage: bgImage ? `url('${bgImage.url}')` : undefined,
        backgroundPosition: bgPosition,
        backgroundAttachment: bgFix ? 'fixed' : 'scroll',
        minHeight: `${sectionHeight}vh`,
        backgroundColor: '#1a1a1a',
      }}
    >
      <div
        ref={contentRef}
        className={cn('p-10 lg:px-8 relative z-10', contentAlignClass)}
        style={{color: contentColor}}
      >
        {header && (
          <h2
            className={cn('mb-2 md:text-lg font-bold', headerFont)}
            style={headerStyle}
          >
            {header}
          </h2>
        )}

        {label && (
          <h2 className={cn('mb-2 md:text-lg font-bold', contentFont)}>
            {label}
          </h2>
        )}

        {body && (
          <p className={cn('md:text-lg', contentFont)}>
            {body}
          </p>
        )}

        {urlLabel && url && (
          <h2 className={cn('md:text-lg py-10', ctaFontWeight, contentFont)}>
            <a href={url} target="_blank" rel="noreferrer" style={{color: contentColor}}>
              <span className={cn('nav-underline-dual', urlTextItalic && 'italic')}>
                {urlLabel}
              </span>
            </a>
          </h2>
        )}

        {logoNodes.length > 0 && (
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center">
              {logoNodes.map((node) => {
                const img = node.logoImage?.reference?.image;
                return (
                  <div key={node.id} className="recognition-item relative text-center">
                    <div className="overflow-hidden">
                      {img && (
                        <Image
                          data={img}
                          className="mx-auto object-contain w-70 h-50"
                          loading="lazy"
                          sizes="280px"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
