import {data, Link, useLoaderData} from 'react-router';
import type {Route} from './+types/stories._index';
import {Image, getPaginationVariables} from '@shopify/hydrogen';
import type {ArticleItemFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

const BLOG_HANDLE = 'stories';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `NX4 | ${data?.blog.title ?? 'Stories'}`}];
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
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 9,
  });

  const [{blog}] = await Promise.all([
    context.storefront.query(STORIES_QUERY, {
      variables: {
        blogHandle: BLOG_HANDLE,
        ...paginationVariables,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  return {blog};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Stories() {
  const {blog} = useLoaderData<typeof loader>();
  const {articles} = blog;

  return (
    <div className="bg-subtle w-full pt-[120px] pb-[168px]">
      <div className="flex flex-col items-center px-6 md:px-[56px]">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-2 pb-[40px] md:pb-[56px] w-full">
          <p className="text-caption text-center">Stories</p>
          <h1 className="text-h2-light text-center">
            Stories from the Wild Cave
          </h1>
        </div>

        {/* Articles Grid */}
        <div className="w-full max-w-[1200px]">
          <PaginatedResourceSection<ArticleItemFragment>
            connection={articles}
            resourcesClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-14"
          >
            {({node: article, index}) => (
              <ArticleItem
                article={article}
                key={article.id}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            )}
          </PaginatedResourceSection>
        </div>
      </div>
    </div>
  );
}

function ArticleItem({
  article,
  loading,
}: {
  article: ArticleItemFragment;
  loading?: HTMLImageElement['loading'];
}) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt!));

  // Extract excerpt from contentHtml (strip HTML and limit characters)
  const excerpt = article.contentHtml
    ? article.contentHtml
        .replace(/<[^>]*>/g, '')
        .substring(0, 120)
        .trim() + '...'
    : '';

  return (
    <Link
      to={`/stories/${article.handle}`}
      className="group flex flex-col gap-3"
    >
      {/* Image */}
      {article.image && (
        <div className="relative aspect-3/4 w-full overflow-hidden bg-default-grey">
          <Image
            alt={article.image.altText || article.title}
            data={article.image}
            draggable={false}
            loading={loading}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover md:transition-transform md:duration-500 md:group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-h3-regular md:group-hover:opacity-70 md:transition-opacity">
          {article.title}
        </h3>
        {excerpt && <p className="line-clamp-3 text-balance">{excerpt}</p>}
        <p className="text-black/40">{publishedAt}</p>
      </div>
    </Link>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const STORIES_QUERY = `#graphql
  query StoriesBlog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
` as const;
