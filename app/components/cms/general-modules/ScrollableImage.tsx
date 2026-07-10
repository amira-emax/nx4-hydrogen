import {Image} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {cn} from '~/lib/utils';

function parseRichText(value?: string): string {
  if (!value) return '';
  try {
    const ast = JSON.parse(value);
    const extract = (node: any): string => {
      if (node.type === 'text') return node.value || '';
      if (Array.isArray(node.children)) {
        const sep = node.type === 'root' ? '\n' : '';
        return node.children.map(extract).join(sep);
      }
      return '';
    };
    return extract(ast);
  } catch {
    return value;
  }
}

interface LogoImageNode {
  id: string;
  logoImage?: {reference?: {image?: {url: string; altText?: string; width?: number; height?: number}}};
}

export interface ScrollableImageFragment {
  id: string;
  type: string;
  bgImage?: {reference?: {image?: {url: string; altText?: string; width?: number; height?: number}}};
  bgImageMobile?: {reference?: {image?: {url: string; altText?: string; width?: number; height?: number}}};
  bgPosition?: {value?: string};
  bgFix?: {value?: string};
  sectionHeight?: {value?: string};
  sectionHeightMobile?: {value?: string};
  mobileTextLayout?: {value?: string};
  textFade?: {value?: string};
  contentFont?: {value?: string};
  headerFont?: {value?: string};
  headerColorType?: {value?: string};
  headerColor?: {value?: string};
  headerGradient?: {value?: string};
  contentColor?: {value?: string};
  textPosition?: {value?: string};
  textAlignment?: {value?: string};
  contentAlignment?: {value?: string};
  header?: {value?: string};
  label?: {value?: string};
  labelFontSize?: {value?: string};
  body?: {value?: string};
  bodyFontWeight?: {value?: string};
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
  const bgImageMobile = reference.bgImageMobile?.reference?.image || bgImage;
  const mobileAspectRatio =
    bgImageMobile?.width && bgImageMobile?.height
      ? `${bgImageMobile.width} / ${bgImageMobile.height}`
      : undefined;
  const bgPosition = reference.bgPosition?.value || 'center';
  const bgFix = reference.bgFix?.value === 'true';
  const sectionHeight = reference.sectionHeight?.value || '50';
  const sectionHeightMobile = reference.sectionHeightMobile?.value || sectionHeight;
  const isStackedMobile = reference.mobileTextLayout?.value === 'below';
  const textFade = reference.textFade?.value === 'true';
  const contentFont = reference.contentFont?.value || 'font-imagefuture';
  const headertext = 'text-lg md:text-2xl lg:text-3xl';
  const headerFont = reference.headerFont?.value || contentFont + ' ' + headertext;
  const headerColorType = reference.headerColorType?.value || 'solid';
  const headerColor = reference.headerColor?.value || '#000000';
  const headerGradient = reference.headerGradient?.value;
  const contentColor = reference.contentColor?.value || '#000000';
  const textPosition = reference.textPosition?.value || 'center';
  const textAlignment = reference.textAlignment?.value || 'left';
  const contentAlignment = reference.contentAlignment?.value || 'left';
  const header = reference.header?.value;
  const label = reference.label?.value;
  const labelFontSize = reference.labelFontSize?.value || 'text-xl md:text-2xl lg:text-3xl';
  const body = parseRichText(reference.body?.value);
  const bodyFontWeight = reference.bodyFontWeight?.value ||'font-normal text-xs lg:text-xl';
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

  const textPositionClassDesktop =
    textPosition === 'top'
      ? 'md:items-start'
      : textPosition === 'bottom'
        ? 'md:items-end'
        : 'md:items-center';

  const columnClass =
    contentAlignment === 'center'
      ? 'mx-auto w-full'
      : contentAlignment === 'right'
        ? 'ml-auto w-full md:w-1/2'
        : 'w-full md:w-1/2';

  const textAlignClass =
    textAlignment === 'center'
      ? 'text-center'
      : textAlignment === 'right'
        ? 'text-right'
        : 'text-left';

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
      className={cn(
        'relative w-full flex pb-2.5',
        isStackedMobile
          ? cn(
              'flex-col md:flex-row md:min-h-(--section-height)',
              textPositionClassDesktop,
            )
          : cn(
              'min-h-(--section-height-mobile) md:min-h-(--section-height)',
              textPositionClass,
            ),
      )}
      style={
        {
          '--section-height': `${sectionHeight}vh`,
          '--section-height-mobile': `${sectionHeightMobile}vh`,
          backgroundColor: 'black',
        } as React.CSSProperties
      }
    >
      {bgImageMobile && (
        isStackedMobile ? (
          <img
            src={bgImageMobile.url}
            alt={bgImageMobile.altText || ''}
            className="w-full h-auto object-cover md:hidden"
            style={mobileAspectRatio ? {aspectRatio: mobileAspectRatio} : undefined}
          />
        ) : (
          <div
            className="absolute inset-0 z-0 bg-no-repeat bg-cover md:hidden"
            style={{
              backgroundImage: `url('${bgImageMobile.url}')`,
              backgroundPosition: bgPosition,
              backgroundAttachment: bgFix ? 'fixed' : 'scroll',
            }}
          />
        )
      )}
      {bgImage && (
        <div
          className="absolute inset-0 z-0 bg-no-repeat bg-cover hidden md:block"
          style={{
            backgroundImage: `url('${bgImage.url}')`,
            backgroundPosition: bgPosition,
            backgroundAttachment: bgFix ? 'fixed' : 'scroll',
          }}
        />
      )}
      <div
        ref={contentRef}
        className={cn('p-10 lg:px-8 relative z-10 ', columnClass, textAlignClass)}
        style={{color: contentColor}}
      >
        {header && (
          <h2
            className={cn('-mb-2 ', headerFont)}
            style={headerStyle}
          >
            {header}
          </h2>
        )}

        {label && (
          <h2 className={cn('mb-2 font-medium',labelFontSize, contentFont)}>
            {label}
          </h2>
        )}

        {body && (
          <p className={cn('tracking-widest md:whitespace-pre-line text-center', contentFont, bodyFontWeight)}>
            {body}
          </p>
        )}

        {urlLabel && url && (
          <h2 className={cn('text-sm md:text-base lg:text-lg py-10')}>
            <a href={url} target="_blank" rel="noreferrer" style={{color: contentColor}}>
              <span className={cn('nav-underline-dual', urlTextItalic && 'italic', ctaFontWeight, contentFont)}>
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
