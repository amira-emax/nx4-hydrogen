import {Image} from '@shopify/hydrogen';
import {useEffect, useRef, useState} from 'react';
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

interface VideoSource {
  url: string;
  mimeType: string;
}

interface MediaBlockNode {
  id: string;
  blockVideo?: {reference?: {id?: string; sources?: VideoSource[]}};
  name?: {value?: string};
  textPosition?: {value?: string};
}

interface CertLogoNode {
  id: string;
  image?: {url: string; altText?: string; width?: number; height?: number};
}

export interface BodyInfoFragment {
  id: string;
  type: string;
  bgImage?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  bgImageMobile?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  featuredImage?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  featuredImages?: {
    references?: {
      nodes: {
        image?: {
          url: string;
          altText?: string;
          width?: number;
          height?: number;
        };
      }[];
    };
  };
  featuredVideo?: {reference?: {id?: string; sources?: VideoSource[]}};
  sectionImage?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  sectionImageMobile?: {
    reference?: {
      image?: {url: string; altText?: string; width?: number; height?: number};
    };
  };
  sectionHeaderPadding?: {value?: string};
  title?: {value?: string};
  titleItalic?: {value?: string};
  titleSemibold?: {value?: string};
  subTitleNumber?: {value?: string};
  subTitle?: {value?: string};
  description?: {value?: string};
  caption?: {value?: string};
  headerFont?: {value?: string};
  contentFont?: {value?: string};
  headerColorType?: {value?: string};
  headerColor?: {value?: string};
  headerGradient?: {value?: string};
  contentColor?: {value?: string};
  sectionContentPadding?: {value?: string};
  brandHeader?: {value?: string};
  brandSubHeader?: {value?: string};
  brandDescription?: {value?: string};
  certLogos?: {references?: {nodes: CertLogoNode[]}};
  certText?: {value?: string};
  textUrl?: {value?: string};
  linkUrl?: {value?: string};
  urlLabelItalic?: {value?: string};
  mediaItemHeight?: {value?: string};
  mediaBlocks?: {references?: {nodes: MediaBlockNode[]}};
}

interface BodyInfoProps {
  reference: BodyInfoFragment;
}

export function BodyInfo({reference}: BodyInfoProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const bgImage = reference.bgImage?.reference?.image;
  const bgImageMobile = reference.bgImageMobile?.reference?.image || bgImage;
  const featuredImage = reference.featuredImage?.reference?.image;
  const featuredImages = (reference.featuredImages?.references?.nodes || [])
    .map((n) => n.image)
    .filter(
      (
        img,
      ): img is {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      } => !!img,
    );
  const slideImages =
    featuredImages.length > 0
      ? featuredImages
      : featuredImage
        ? [featuredImage]
        : [];
  const featuredVideoSources =
    reference.featuredVideo?.reference?.sources || [];

  const [activeSlide, setActiveSlide] = useState(0);
  const sectionHeaderPadding = reference.sectionHeaderPadding?.value || '0';
  const title = reference.title?.value;
  const titleItalic = reference.titleItalic?.value === 'true';
  const titleSemibold = reference.titleSemibold?.value !== 'false';
  const subTitleNumber = reference.subTitleNumber?.value;
  const subTitle = reference.subTitle?.value;
  const description = reference.description?.value;
  const caption = reference.caption?.value;
  const headerFont = reference.headerFont?.value || 'font-imagefuture';
  const contentFont = reference.contentFont?.value || 'font-imagefuture ';
  const headerColorType = reference.headerColorType?.value || 'gradient';
  const headerColor = reference.headerColor?.value || '#000000';
  const headerGradient =
    reference.headerGradient?.value ||
    'linear-gradient(90deg, #FFFFFF 0%, #DED2C1 64.42%, #AE9672 100%)';
  const contentColor = reference.contentColor?.value || '#F4EDE2';
  const sectionContentPadding = reference.sectionContentPadding?.value || '0';
  const brandHeader = reference.brandHeader?.value;
  const brandSubHeader = reference.brandSubHeader?.value;
  const brandDescription = parseRichText(reference.brandDescription?.value);
  const textUrl = reference.textUrl?.value;
  const linkUrl = reference.linkUrl?.value;
  const urlLabelItalic = reference.urlLabelItalic?.value === 'true';
  const sectionImage = reference.sectionImage?.reference?.image;
  const sectionImageMobile =
    reference.sectionImageMobile?.reference?.image || sectionImage;
  const certLogos = reference.certLogos?.references?.nodes || [];
  const certText = reference.certText?.value;
  const mediaItemHeight = reference.mediaItemHeight?.value || 'aspect-square';
  const mediaBlocks = reference.mediaBlocks?.references?.nodes || [];

  const body = parseRichText(reference.body?.value);

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const animate = (
      el: HTMLElement | null,
      type: 'up' | 'in',
      delayMs: number,
      durationMs: number,
    ) => {
      if (!el) return;
      el.style.opacity = '0';
      if (type === 'up') el.style.transform = 'translateY(20px)';

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = `opacity ${durationMs}ms ease${type === 'up' ? `, transform ${durationMs}ms ease` : ''}`;
              el.style.opacity = '1';
              if (type === 'up') el.style.transform = 'translateY(0)';
            }, delayMs);
            observer.disconnect();
          }
        },
        {threshold: 0.1},
      );
      observer.observe(el);
      cleanups.push(() => observer.disconnect());
    };

    animate(headerRef.current, 'up', 100, 900);
    animate(descRef.current, 'in', 450, 2000);

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    if (slideImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  const headerGradientStyle: React.CSSProperties = {
    background: headerGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const brandHeaderStyle: React.CSSProperties =
    headerColorType === 'solid'
      ? {color: headerColor}
      : {
          background: headerGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        };

  return (
    <section>
      <div
        className="relative justify-center mx-auto md:py-20"
        style={{color: contentColor}}
      >
        {bgImageMobile && (
          <div
            className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-top md:hidden"
            style={{backgroundImage: `url('${bgImageMobile.url}')`}}
          />
        )}
        {bgImage && (
          <div
            className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-top hidden md:block"
            style={{backgroundImage: `url('${bgImage.url}')`}}
          />
        )}
        {/* Top grid: text + featured media */}
        {(title ||
          subTitleNumber ||
          subTitle ||
          description ||
          caption ||
          featuredImage ||
          featuredVideoSources.length > 0) && (
          <div
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center px-2 lg:px-20"
            style={{paddingBlock: `${sectionHeaderPadding}rem`}}
          >
            {/* Text content */}
            <div className="order-2 md:order-0 flex items-start justify-center h-full md:py-10">
              <div className="md:col-span-2 flex flex-col h-full text-center md:mt-0 md:text-left">
                <div
                  ref={headerRef}
                  className="px-10"
                  style={headerGradientStyle}
                >
                  {title && (
                    <h2
                      className={cn(
                        'text-xl md:text-3xl',
                        contentFont,
                        titleItalic && 'italic',
                        titleSemibold && 'font-semibold',
                      )}
                    >
                      {title}
                    </h2>
                  )}
                  {subTitleNumber && (
                    <h1
                      className={cn(
                        'text-4xl md:text-5xl font-semibold italic',
                        headerFont,
                      )}
                    >
                      {subTitleNumber}
                    </h1>
                  )}
                  {subTitle && (
                    <h2 className={cn('text-xl md:text-3xl', contentFont)}>{subTitle}</h2>
                  )}
                </div>

                <div ref={descRef} className="px-10 py-5 md:py-10 mt-auto">
                  {description && (
                    <div  className={cn('md:pt-30')}>
                      <p className={cn('md:mb-4 text-sm lg:text-lg', contentFont)}>
                        {description}
                      </p>
                    </div>
                  )}
                  {caption && (
                    <div className={cn('py-5 md:py-10')}>
                      <p className={cn('text-lg md:text-lg lg:text-xl font-medium italic', contentFont)} >
                        {caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured media */}
            <div className="order-1 md:order-0 justify-items-center">
              <div className="md:col-span-1 flex items-center justify-center w-[20rem] md:w-[30rem] aspect-[3/4] overflow-hidden relative">
                {slideImages.length > 0 ? (
                  <>
                    {slideImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt={img.altText || ''}
                        className={cn(
                          'absolute inset-0  object-cover shadow-md rounded-3xl transition-opacity duration-700',
                          idx === activeSlide ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    ))}
                  </>
                ) : featuredVideoSources.length > 0 ? (
                  <video
                    autoPlay
                    muted
                    playsInline
                    loop
                    className="w-full h-full object-cover rounded-3xl shadow-md z-10"
                  >
                    {featuredVideoSources.map((src) => (
                      <source key={src.url} src={src.url} type={src.mimeType} />
                    ))}
                  </video>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Section image */}
        {sectionImageMobile && (
          <div className="relative z-10 flex justify-center md:px-6 pt-10 md:hidden">
            <Image
              data={sectionImageMobile}
              className="md:rounded-2xl shadow-md w-full max-w-4xl object-cover"
              sizes="100vw"
            />
          </div>
        )}
        {sectionImage && (
          <div className="relative z-10 hidden md:flex justify-center md:px-6 pt-10">
            <Image
              data={sectionImage}
              className="md:rounded-2xl shadow-md w-full max-w-4xl object-cover"
              sizes="(min-width: 768px) 672px, 100vw"
            />
          </div>
        )}

        {/* Brand / content section */}
        {(brandHeader ||
          brandSubHeader ||
          brandDescription ||
          (textUrl && linkUrl)) && (
          <div className="relative z-10 pt-10 md:pt-20">
            <div
              className="px-6"
            >
              {brandHeader && (
                <div className="text-center">
                  <h2
                    className={cn(
                      'text-xl md:text-2xl font-medium mb-4',
                      headerFont,
                    )}
                    style={brandHeaderStyle}
                  >
                    {brandHeader}
                  </h2>
                </div>
              )}
              {brandSubHeader && (
                <h2
                  className={cn(
                    'md:text-xl lg:text-2xl font-normal mt-12 mb-4 text-center',
                    contentFont,
                  )}
                >
                  {brandSubHeader}
                </h2>
              )}
              {brandDescription && (
                <h2
                  className={cn(
                    'text-xs md:text-lg font-light lg:mb-12 text-center whitespace-pre-line',
                    contentFont,
                  )}
                >
                  {brandDescription}
                </h2>
              )}
              {textUrl && linkUrl && (
                <h2 className="md:text-lg font-normal mb-5 lg:mb-12 text-center">
                  <a
                    href={linkUrl}
                    className={cn(
                      'nav-underline-dual',
                      contentFont,
                      urlLabelItalic && 'italic',
                    )}
                  >
                    {textUrl}
                  </a>
                </h2>
              )}
            </div>
          </div>
        )}

        {certLogos.length > 0 && (
          <div className={cn(certLogos.length > 2 ? 'max-w-xs md:max-w-2xl' : 'max-w-xs', 'relative z-10 mx-auto')}>
            <div
              className="px-6"
              style={{paddingBlock: `${sectionContentPadding}rem`}}
            >
              <div className="flex justify-center items-center">
                {certLogos.map((logo) =>
                  logo.image ? (
                    <Image
                      key={logo.id}
                      data={logo.image}
                      className="h-12 md:h-20 w-auto object-contain"
                      sizes="80px"
                    />
                  ) : null,
                )}
              </div>
              {certText && (
                <p className={cn('mt-4 text-center text-sm md:text-base font-light tracking-widest', contentFont)} style={{color: contentColor}}>
                  {certText}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
