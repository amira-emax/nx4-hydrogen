import {Suspense} from 'react';
import {Await} from 'react-router';
import HtmlContentBlock from '../HtmlContentBlock';
import type {
  BlogArticleQuery,
  ProductBenefitsFragment,
} from 'types/storefrontapi.generated';

interface ProductBenefitsProps {
  reference: ProductBenefitsFragment;
  contentPromise?: Promise<BlogArticleQuery | null> | null;
}

export function ProductBenefits({
  reference,
  contentPromise,
}: ProductBenefitsProps) {
  const label = reference.label?.value;
  const title = reference.title?.value;
  const cards = reference.cards?.references?.nodes || [];

  return (
    <section className=" py-[96px] md:py-[80px] px-6 flex flex-col items-center gap-14 md:gap-20">
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-6">
        {label && <p className="text-caption text-[#1b1b1b]">{label}</p>}
        {title && (
          <h2 className="font-light text-center tracking-[2.3px] max-w-2xl leading-tight">
            {title}
          </h2>
        )}
      </div>

      {/* Stats Grid */}
      {cards.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-center w-full md:max-w-4xl">
          {cards.map((card, index) => {
            const cardTitle = card.title?.value;
            const cardLabel = card.label?.value;

            return (
              <div
                key={card.id}
                className="flex flex-col md:flex-row items-center w-full"
              >
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-0 gap-2 xl:w-[250px]">
                  {cardTitle && <h1 className="text-h1-light">{cardTitle}</h1>}
                  {cardLabel && <p>{cardLabel}</p>}
                </div>
                {/* Divider */}
                {index < cards.length - 1 && (
                  <div className="w-full md:w-px h-px md:h-16 bg-gray-300 my-4 md:my-0 mx-0 md:mx-4" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Content - Deferred */}
      {contentPromise && (
        <Suspense
          fallback={
            <div className="animate-pulse h-20 w-full max-w-2xl bg-gray-100 rounded" />
          }
        >
          <Await resolve={contentPromise}>
            {(resolvedArticle) => {
              const contentHtml =
                resolvedArticle?.blog?.articleByHandle?.contentHtml;
              if (!contentHtml) return null;
              return (
                <div className="text-center max-w-2xl text-body-regular font-light leading-relaxed tracking-wide text-gray-800">
                  <HtmlContentBlock contentHtml={contentHtml} variant="blog" />
                </div>
              );
            }}
          </Await>
        </Suspense>
      )}
    </section>
  );
}
