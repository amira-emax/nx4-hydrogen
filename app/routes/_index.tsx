import {useLoaderData} from 'react-router';
import ModuleRenderer from '~/components/cms/general-modules/ModuleRenderer';
import {HOME_PAGE_CMS_QUERY} from '~/graphql/cms/query/HomePageQuery';
import {PROMOTION_PAGE_CMS_QUERY} from '~/graphql/cms/query/PromotionPageQuery';
import type {Route} from './+types/_index';
import type {HomePageCmsQuery, PromotionPageCmsQuery} from 'types/storefrontapi.generated';

// Subdomain → CMS query mapping. Add new subdomains here.
const SUBDOMAIN_PAGES: Record<string, string> = {
  'discover.dailynx4.com': 'discover',
};

export const meta: Route.MetaFunction = ({data}) => {
  if (data?.page === 'discover') return [{title: 'Discover | NX4 Bird Nest'}];
  return [{title: 'NX4 Bird Nest'}];
};


export async function loader({request, context}: Route.LoaderArgs) {
  const host = new URL(request.url).hostname;
  const subdomainPage = SUBDOMAIN_PAGES[host];

  if (subdomainPage === 'discover') {
    const [{promotionPage}] = await Promise.all([
      context.storefront.query<PromotionPageCmsQuery>(PROMOTION_PAGE_CMS_QUERY, {
        variables: {
          handle: context.env.PROMOTION_PAGE_CMS_SLUG || 'promotion-page',
        },
      }),
    ]);
    return {page: 'discover', promotionPage, homePage: null};
  }

  const [{homePage}] = await Promise.all([
    context.storefront.query<HomePageCmsQuery>(HOME_PAGE_CMS_QUERY, {
      variables: {
        handle: context.env.HOME_PAGE_CMS_SLUG || 'home-page',
      },
    }),
  ]);

  return {page: 'home', homePage, promotionPage: null};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
// function loadDeferredData({context}: Route.LoaderArgs) {
//   const recommendedProducts = context.storefront
//     .query(RECOMMENDED_PRODUCTS_QUERY)
//     .catch((error: Error) => {
//       // Log query errors, but don't throw them so the page can still render
//       console.error(error);
//       return null;
//     });

//   return {
//     recommendedProducts,
//   };
// }

export default function Homepage() {
  const {page, homePage, promotionPage} = useLoaderData<typeof loader>();

  if (page === 'discover') {
    const p = promotionPage as any;
    const topLogo = p?.topLogo?.reference?.image;
    const topLabel = p?.topLabel?.value as string | undefined;
    return (
      <div className="promotion relative">
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">
          <div className="pointer-events-auto opacity-70">
            {topLogo ? (
              <img src={topLogo.url} alt={topLogo.altText || ''} className="h-8 md:h-15 lg:h-20 w-auto object-contain" />
            ) : (
              <span className="text-white text-sm tracking-widest font-semibold">NX4</span>
            )}
          </div>
          {topLabel && (
            <span className="pointer-events-auto opacity-70 text-white text-sm md:text-lg lg:text-xl font-light font-imagefuture tracking-widest">
              {topLabel}
            </span>
          )}
        </div>
        <ModuleRenderer modules={promotionPage?.modules?.references?.nodes || []} />
      </div>
    );
  }

  return (
    <div className="home">
      <ModuleRenderer modules={homePage?.modules?.references?.nodes || []} />
    </div>
  );
}

// function FeaturedCollection({
//   collection,
// }: {
//   collection: FeaturedCollectionFragment;
// }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// function RecommendedProducts({
//   products,
// }: {
//   products: Promise<RecommendedProductsQuery | null>;
// }) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {(response) => (
//             <div className="recommended-products-grid">
//               {response
//                 ? response.products.nodes.map((product) => (
//                     <ProductItem key={product.id} product={product} />
//                   ))
//                 : null}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }

// const FEATURED_COLLECTION_QUERY = `#graphql
//   fragment FeaturedCollection on Collection {
//     id
//     title
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//     handle
//   }
//   query FeaturedCollection($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...FeaturedCollection
//       }
//     }
//   }
// ` as const;

// const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   fragment RecommendedProduct on Product {
//     id
//     title
//     handle
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     featuredImage {
//       id
//       url
//       altText
//       width
//       height
//     }
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...RecommendedProduct
//       }
//     }
//   }
// ` as const;
