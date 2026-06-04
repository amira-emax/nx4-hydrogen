import {Image} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {cn} from '~/lib/utils';

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

export interface BodyInfoFragment {
  id: string;
  type: string;
  bgImage?: {reference?: {image?: {url: string; altText?: string; width?: number; height?: number}}};
  featuredImage?: {reference?: {image?: {url: string; altText?: string; width?: number; height?: number}}};
  featuredVideo?: {reference?: {id?: string; sources?: VideoSource[]}};
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
  const featuredImage = reference.featuredImage?.reference?.image;
  const featuredVideoSources = reference.featuredVideo?.reference?.sources || [];
  const sectionHeaderPadding = reference.sectionHeaderPadding?.value || '0';
  const title = reference.title?.value;
  const titleItalic = reference.titleItalic?.value === 'true';
  const titleSemibold = reference.titleSemibold?.value !== 'false';
  const subTitleNumber = reference.subTitleNumber?.value;
  const subTitle = reference.subTitle?.value;
  const description = reference.description?.value;
  const caption = reference.caption?.value;
  const headerFont = reference.headerFont?.value || 'font-canela';
  const contentFont = reference.contentFont?.value || 'font-gt-america';
  const headerColorType = reference.headerColorType?.value || 'gradient';
  const headerColor = reference.headerColor?.value || '#000000';
  const headerGradient =
    reference.headerGradient?.value ||
    'linear-gradient(90deg, #FFFFFF 0%, #DED2C1 64.42%, #AE9672 100%)';
  const contentColor = reference.contentColor?.value || '#F4EDE2';
  const sectionContentPadding = reference.sectionContentPadding?.value || '0';
  const brandHeader = reference.brandHeader?.value;
  const brandSubHeader = reference.brandSubHeader?.value;
  const brandDescription = reference.brandDescription?.value;
  const textUrl = reference.textUrl?.value;
  const linkUrl = reference.linkUrl?.value;
  const urlLabelItalic = reference.urlLabelItalic?.value === 'true';
  const mediaItemHeight = reference.mediaItemHeight?.value || 'aspect-square';
  const mediaBlocks = reference.mediaBlocks?.references?.nodes || [];

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
        className="relative justify-center mx-auto pt-20"
        style={{
          ...(bgImage
            ? {
                backgroundImage: `url('${bgImage.url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
              }
            : {}),
          color: contentColor,
        }}
      >
        {/* Top grid: text + featured media */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center px-2 lg:px-20"
          style={{paddingBlock: `${sectionHeaderPadding}rem`}}
        >
          {/* Text content */}
          <div className="flex items-start justify-center h-full py-10">
            <div className="md:col-span-2 flex flex-col justify-center mt-6 md:mt-0">
              <div ref={headerRef} className="px-10" style={headerGradientStyle}>
                {title && (
                  <h2
                    className={cn(
                      'text-2xl',
                      contentFont,
                      titleItalic && 'italic',
                      titleSemibold && 'font-semibold',
                    )}
                  >
                    {title}
                  </h2>
                )}
                {subTitleNumber && (
                  <h1 className={cn('text-4xl md:text-5xl font-bold italic', headerFont)}>
                    {subTitleNumber}
                  </h1>
                )}
                {subTitle && (
                  <h2 className={cn('text-2xl', contentFont)}>{subTitle}</h2>
                )}
              </div>

              <div ref={descRef} className="px-10 py-10 md:text-lg">
                {description && (
                  <p className={cn('mb-4', contentFont)}>{description}</p>
                )}
                {caption && (
                  <div className={cn('py-20', contentFont)}>
                    <p className="border-l-4 pl-3">{caption}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured media */}
          <div className="justify-items-center">
            <div className="md:col-span-1 flex items-center justify-center w-[20rem] md:w-[30rem] aspect-[3/4] overflow-hidden">
              {featuredImage ? (
                <Image
                  data={featuredImage}
                  className="object-cover shadow-md rounded w-full h-full"
                  sizes="(min-width: 768px) 480px, 320px"
                />
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

        {/* Brand / content section */}
        <div className="pt-10 md:pt-20">
          <div className="px-6" style={{paddingBlock: `${sectionContentPadding}rem`}}>
            {brandHeader && (
              <div className="text-center py-10">
                <h2
                  className={cn('text-3xl md:text-4xl italic', headerFont)}
                  style={brandHeaderStyle}
                >
                  {brandHeader}
                </h2>
              </div>
            )}
            {brandSubHeader && (
              <h2 className={cn('md:text-2xl font-normal mt-12 mb-4 text-center', contentFont)}>
                {brandSubHeader}
              </h2>
            )}
            {brandDescription && (
              <h2
                className={cn(
                  'md:text-lg font-light lg:mb-12 text-center lg:px-65',
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

          {/* Media grid */}
          {mediaBlocks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center">
              {mediaBlocks.map((block) => {
                const videoSources = block.blockVideo?.reference?.sources || [];
                const blockName = block.name?.value;
                const textPosition = block.textPosition?.value || 'center';

                return (
                  <div
                    key={block.id}
                    className={cn('relative overflow-hidden w-full', mediaItemHeight)}
                  >
                    {videoSources.length > 0 && (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        {videoSources.map((src) => (
                          <source key={src.url} src={src.url} type={src.mimeType} />
                        ))}
                      </video>
                    )}

                    {blockName && (
                      <div
                        className={cn(
                          'absolute inset-0 flex px-6 py-6',
                          contentFont,
                          textPosition === 'top'
                            ? 'items-start'
                            : textPosition === 'bottom'
                              ? 'items-end'
                              : 'items-center',
                        )}
                      >
                        <div className="w-full text-center">
                          <span className={cn('text-shadow-lg text-2xl italic', contentFont)}>
                            {blockName}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
