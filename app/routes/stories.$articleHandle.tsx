import {data, Link, useLoaderData} from 'react-router';
import type {Route} from './+types/stories.$articleHandle';
import {Image} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import HtmlContentBlock from '~/components/cms/HtmlContentBlock';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';

const BLOG_HANDLE = 'stories';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `NX4 | ${data?.article.title ?? ''}`}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return data({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const {articleHandle} = params;

  if (!articleHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(STORY_ARTICLE_QUERY, {
      variables: {blogHandle: BLOG_HANDLE, articleHandle},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: BLOG_HANDLE,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  // Filter out current article from related stories and take 3
  const relatedArticles = blog.articles.nodes
    .filter((node) => node.handle !== articleHandle)
    .slice(0, 3);

  return {article, relatedArticles};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function StoryArticle() {
  const {article, relatedArticles} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, publishedAt} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(publishedAt));

  return (
    <div className="bg-subtle w-full pt-[calc(var(--header-height)+var(--global-banner-height))] pb-[168px]">
      <article className="flex flex-col items-center w-full">
        {/* Hero Image */}
        {image && (
          <div className="w-full relative aspect-390/573 md:aspect-1440/690 overflow-hidden">
            <Image
              data={image}
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 max-w-[800px] text-center my-[56px]">
          <h2 className="text-h2-light">{title}</h2>
          <p className="text-body-medium text-black/40">{publishedDate}</p>
        </div>

        {/* Content */}
        <div className="w-full md:max-w-[520px] px-6 md:px-0 mb-[120px]">
          <HtmlContentBlock contentHtml={contentHtml} variant="blog" />
        </div>
      </article>

      {/* More Stories */}
      {relatedArticles.length > 0 && (
        <div className="flex flex-col items-center px-6 md:px-[56px] w-full">
          <div className="w-full max-w-[1200px] flex flex-col items-center gap-10">
            <h3 className="text-caption">More Stories</h3>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10 w-full">
              {relatedArticles.map((relatedArticle) => (
                <RelatedStoryCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                />
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="block md:hidden w-full">
              <Carousel
                plugins={[WheelGesturesPlugin()]}
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {relatedArticles.map((relatedArticle) => (
                    <CarouselItem
                      key={relatedArticle.id}
                      className="pl-4 basis-[85%]"
                    >
                      <RelatedStoryCard article={relatedArticle} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedStoryCard({article}: {article: any}) {
  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <Link
      to={`/stories/${article.handle}`}
      className="flex flex-col gap-3 group"
    >
      {/* Image */}
      {article.image && (
        <div className="relative aspect-3/4 w-full overflow-hidden bg-default-grey">
          <Image
            data={article.image}
            sizes="(min-width: 768px) 33vw, 50vw"
            className="h-full w-full object-cover md:transition-transform md:duration-500 md:group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-body-regular md:group-hover:opacity-70 md:transition-opacity">
          {article.title}
        </h3>
        <p className="text-xs tracking-[1.35px] leading-[18px] text-black/40">
          {publishedDate}
        </p>
      </div>
    </Link>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const STORY_ARTICLE_QUERY = `#graphql
  query StoryArticle(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
      articles(first: 4) {
        nodes {
          id
          title
          handle
          publishedAt
          image {
            id
            altText
            url
            width
            height
          }
        }
      }
    }
  }
` as const;
