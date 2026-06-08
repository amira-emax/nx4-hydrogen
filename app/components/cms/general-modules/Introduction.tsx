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

interface ImageBlockNode {
  id: string;
  brandImage?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  text?: {value?: string};
  textPosition?: {value?: string};
}

export interface IntroductionFragment {
  id: string;
  type: string;
  bgImage?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  bgOverlay?: {value?: string};
  heroHeaderTop?: {value?: string};
  headerTopColorType?: {value?: string};
  headerTopColor?: {value?: string};
  headerTopGradient?: {value?: string};
  heroImage?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  heroImageOverlay?: {value?: string};
  imageSize?: {value?: string};
  imgPaddingTop?: {value?: string};
  imgPaddingBottom?: {value?: string};
  layout?: {value?: string};
  textAlign?: {value?: string};
  heroHeader?: {value?: string};
  headerColorType?: {value?: string};
  headerColor?: {value?: string};
  headerGradient?: {value?: string};
  heroLabel?: {value?: string};
  heroDescription?: {value?: string};
  urlLabel?: {value?: string};
  url?: {value?: string};
  contentColor?: {value?: string};
  gridLabel?: {value?: string};
  gridTitle?: {value?: string};
  gridTextColor?: {value?: string};
  gridHeadingAlign?: {value?: string};
  imageAspect?: {value?: string};
  overlay?: {value?: string};
  overlayColor?: {value?: string};
  textShadow?: {value?: string};
  bottomHeader?: {value?: string};
  bottomDescription?: {value?: string};
  bottomDescPaddingTop?: {value?: string};
  bottomDescPaddingBottom?: {value?: string};
  imageBlocks?: {references?: {nodes: ImageBlockNode[]}};
}

interface IntroductionProps {
  reference: IntroductionFragment;
}

export function Introduction({reference}: IntroductionProps) {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    imageRefs.current.forEach((img) => {
      if (!img) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scale-105');
            } else {
              entry.target.classList.remove('scale-105');
            }
          });
        },
        {threshold: 0.4},
      );
      observer.observe(img);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const bgImage = reference.bgImage?.reference?.image;
  const bgOverlay = reference.bgOverlay?.value;
  const heroHeaderTop = parseRichText(reference.heroHeaderTop?.value);
  const headerTopColorType = reference.headerTopColorType?.value || 'solid';
  const headerTopColor = reference.headerTopColor?.value || '#000000';
  const headerTopGradient = reference.headerTopGradient?.value;
  const heroImage = reference.heroImage?.reference?.image;
  const heroImageOverlay = reference.heroImageOverlay?.value;
  const imageSize = reference.imageSize?.value || '100';
  const imgPaddingTop = reference.imgPaddingTop?.value || '0';
  const imgPaddingBottom = reference.imgPaddingBottom?.value || '0';
  const layout = reference.layout?.value || 'image_first';
  const textAlign = reference.textAlign?.value || 'text-start';
  const heroHeader = parseRichText(reference.heroHeader?.value);
  const headerColorType = reference.headerColorType?.value || 'solid';
  const headerColor = reference.headerColor?.value || '#000000';
  const headerGradient = reference.headerGradient?.value;
  const heroLabel = reference.heroLabel?.value;
  const heroDescription = parseRichText(reference.heroDescription?.value);
  const urlLabel = reference.urlLabel?.value;
  const url = reference.url?.value;
  const contentColor = reference.contentColor?.value || '#333333';
  const gridLabel = reference.gridLabel?.value;
  const gridTitle = reference.gridTitle?.value;
  const gridTextColor = reference.gridTextColor?.value || '#ffffff';
  const gridHeadingAlign = reference.gridHeadingAlign?.value || 'text-left';
  const imageAspect = reference.imageAspect?.value || 'aspect-square';
  const showOverlay = reference.overlay?.value === 'true';
  const overlayColor =
    reference.overlayColor?.value ||
    'linear-gradient(0deg, #4F3012 0%, rgba(59, 44, 23, 0) 33%)';
  const showTextShadow = reference.textShadow?.value === 'true';
  const bottomHeader = parseRichText(reference.bottomHeader?.value);
  const bottomDescription = reference.bottomDescription?.value;
  const bottomDescPaddingTop = reference.bottomDescPaddingTop?.value || '80';
  const bottomDescPaddingBottom =
    reference.bottomDescPaddingBottom?.value || '80';
  const imageBlocks = reference.imageBlocks?.references?.nodes || [];

  const hasTextContent = heroHeader || heroLabel || heroDescription;

  const headerStyle: React.CSSProperties =
    headerColorType === 'solid'
      ? {color: headerColor}
      : {
          background: headerGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };

  const headerTopStyle: React.CSSProperties =
    headerTopColorType === 'solid'
      ? {color: headerTopColor}
      : {
          background: headerTopGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };

  return (
    <>
      <section>
        <div
          className="relative justify-center mx-auto"
          style={
            bgImage
              ? {
                  backgroundImage: `url('${bgImage.url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          {bgOverlay && (
            <div
              className="absolute inset-0 pointer-events-none z-1"
              style={{background: bgOverlay}}
            />
          )}

          {heroHeaderTop && (
            <div className={cn('relative z-2 w-full px-20 pt-30', textAlign)}>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={headerTopStyle}
              >
                {heroHeaderTop}
              </h1>
            </div>
          )}

          <div
            className={cn(
              layout === 'center'
                ? 'relative z-2 flex items-center justify-center'
                : cn(
                    'relative z-2 flex flex-col md:flex-row items-center',
                    layout === 'text_first' && 'md:flex-row-reverse',
                  ),
            )}
          >
            <div
              className={cn(
                'w-full',
                layout !== 'center' ? 'md:w-1/2' : 'flex justify-center',
              )}
              style={{
                paddingTop: `${imgPaddingTop}px`,
                paddingBottom: `${imgPaddingBottom}px`,
              }}
            >
              {heroImage && (
                <Image
                  data={heroImage}
                  className={cn(layout === 'center' && 'mx-auto')}
                  style={{maxWidth: `${imageSize}%`}}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              )}
            </div>

            {heroImageOverlay && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{background: heroImageOverlay}}
              />
            )}

            {hasTextContent && (
              <div
                className={cn(
                  layout !== 'center'
                    ? 'w-full md:w-1/2 px-20'
                    : 'absolute inset-0 flex justify-center pt-30 md:pt-65',
                  textAlign,
                )}
              >
                <div>
                  {heroHeader && (
                    <h1
                      className="leading-tight text-3xl md:text-4xl lg:text-5xl  whitespace-pre-line"
                      style={headerStyle}
                    >
                      {heroHeader}
                    </h1>
                  )}
                  {heroLabel && (
                    <h3
                      className="text-xl lg:text-2xl "
                      style={{color: contentColor}}
                    >
                      {heroLabel}
                    </h3>
                  )}
                  {heroDescription && (
                    <h3
                      className="pt-2 text-xl lg:text-2xl font-light  whitespace-pre-line"
                      style={{color: contentColor}}
                    >
                      {heroDescription}
                    </h3>
                  )}
                  <div className="py-20 lg:py-33"></div>
                  {urlLabel && (
                    <h3
                      style={{color: contentColor}}
                      className={cn(
                        'lg:text-lg font-imagefuture font-normal tracking-widest',
                        layout === 'center' ? 'pt-20 pb-5' : 'pt-10 pb-3',
                      )}
                    >
                      {urlLabel}
                      <span>
                        <div className="flex justify-center">
                          <div className="h-30" style={{width: '1px', background: 'linear-gradient(180deg, #FFFFFF 40.38%, #090909 100%)'}} />
                        </div>
                      </span>
                    </h3>
                  )}
                </div>
              </div>
            )}
          </div>

          {(gridLabel || gridTitle) && (
            <div
              className={cn(
                'relative z-10 w-full px-15 md:px-25 mb-6',
                gridHeadingAlign,
              )}
            >
              {gridLabel && (
                <p
                  className="text-lg md:text-xl "
                  style={{color: gridTextColor}}
                >
                  {gridLabel}
                </p>
              )}
              {gridTitle && (
                <h2
                  className="text-2xl md:text-4xl "
                  style={{color: gridTextColor}}
                >
                  {gridTitle}
                </h2>
              )}
            </div>
          )}

          {imageBlocks.length > 0 && (
            <div
              className={cn(
                'relative z-2',
                layout === 'center' &&
                  'absolute inset-0 flex items-end justify-center pointer-events-none',
              )}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-15 md:px-40 items-center justify-center w-full">
                {imageBlocks.map((block, idx) => {
                  const blockImage = block.brandImage?.reference?.image;
                  const blockText = block.text?.value;
                  const blockTextPosition =
                    block.textPosition?.value || 'center';

                  return (
                    <div
                      key={block.id}
                      className={cn(
                        'relative overflow-hidden w-full rounded-3xl',
                        imageAspect,
                      )}
                    >
                      {blockImage && (
                        <img
                          ref={(el) => {
                            imageRefs.current[idx] = el;
                          }}
                          src={blockImage.url}
                          alt={blockImage.altText || ''}
                          className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-1000 ease-out"
                        />
                      )}

                      {showOverlay && (
                        <div
                          className="absolute inset-0"
                          style={{background: overlayColor}}
                        />
                      )}

                      {blockText && (
                        <div
                          className={cn(
                            'absolute inset-0 flex px-6 py-6',
                            blockTextPosition === 'top'
                              ? 'items-start'
                              : blockTextPosition === 'bottom'
                                ? 'items-end'
                                : 'items-center',
                          )}
                          style={{color: gridTextColor}}
                        >
                          <div className="w-full text-center">
                            <span
                              className={cn(
                                'text-xl md:text-2xl italic font-imagefuture font-normal tracking-wide',
                                showTextShadow && 'text-shadow-lg',
                              )}
                            >
                              {blockText}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {(bottomHeader || bottomDescription) && (
          <div
            className="w-full bg-black"
            style={{
              paddingTop: `${bottomDescPaddingTop}px`,
              paddingBottom: `${bottomDescPaddingBottom}px`,
            }}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
              {bottomHeader && (
                <h3
                  className="text-2xl md:text-4xl mb-4 "
                  style={headerStyle}
                >
                  {bottomHeader}
                </h3>
              )}
              {bottomDescription && (
                <p
                  className="mx-auto text-lg lg:text-xl font-imagefuture font-normal"
                  style={{color: '#C3C3C3BF'}}
                >
                  {bottomDescription}
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
