import {
  Analytics,
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSelectedProductOptions,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import type {Image as ShopifyImage} from '@shopify/hydrogen/storefront-api-types';
import {useState, useRef} from 'react';
import {data, useLoaderData} from 'react-router';
import ModuleRenderer from '~/components/cms/general-modules/ModuleRenderer';
import {ProductHelpSheet} from '~/components/ProductHelpSheet';
import {ProductImage} from '~/components/ProductImage';
import {ProductInfo} from '~/components/ProductInfo';
import {ProductStickyBar} from '~/components/ProductStickyBar';
import {ProductItem} from '~/components/ProductItem';
import {ACCORDION_ITEM_FRAGMENT} from '~/graphql/cms/fragment/generic/AccordionItemFragment';
import {IMAGE_FRAGMENT} from '~/graphql/cms/fragment/generic/ImageFragment';
import {PRODUCT_FEATURE_CARD_FRAGMENT} from '~/graphql/cms/fragment/generic/ProductFeatureCardFragment';
import {PRODUCT_BENEFITS_FRAGMENT} from '~/graphql/cms/fragment/module/ProductBenefitsFragment';
import {PRODUCT_CORES_FRAGMENT} from '~/graphql/cms/fragment/module/ProductCoresFragment';
import {BLOG_ARTICLE_QUERY} from '~/graphql/cms/query/BlogPostsQuery';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import type {Route} from './+types/products.$handle';
import {PRODUCT_HELP_FRAGMENT} from '~/graphql/cms/fragment/module/ProductHelpFragment';
import {TEXT_BLOCK_WITH_CTA_FRAGMENT} from '~/graphql/cms/fragment/generic/TextBlockWithCtaFragment';
import {ACCORDION_FRAGMENT} from '~/graphql/cms/fragment/module/AccordionFragment';
import {CTA_FRAGMENT} from '~/graphql/cms/fragment/generic/CtaFragment';
import {Button} from '~/components/ui/button';
import {AnimatePresence, motion, useInView} from 'motion/react';
import {COLLECTION_ITEM_FRAGMENT} from './collections.all';
import CtaButton from '~/components/cms/CtaButton';
import {cn} from '~/lib/utils';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `NX4 | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
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
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  // Fetch the product-specific blog article (blog handle: "product", article handle: product handle)
  const productArticlePromise = handle
    ? storefront
        .query(BLOG_ARTICLE_QUERY, {
          variables: {
            blogHandle: 'product',
            articleHandle: handle,
          },
        })
        .catch((error) => {
          console.error('Error fetching product article:', error);
          return null;
        })
    : Promise.resolve(null);

  return {
    productArticle: productArticlePromise,
  };
}

export default function Product() {
  const {product, productArticle} = useLoaderData<typeof loader>();

  // Use ref to track visibility of the top section (images + info)
  const topSectionRef = useRef(null);
  const isTopSectionInView = useInView(topSectionRef, {amount: 0.05});

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {
    title,
    descriptionHtml,
    images,
    highlights,
    certifiedLogos,
    showProductHelp,
    productHelp,
    complimentaryShipping,
    cta,
    modules,
    ctaExtra,
    relatedProducts,
  } = product;

  // destructure ProductHelp from dedicated metafield
  const {accordion, textBlocksGroup} = productHelp?.reference ?? {};

  // destructure modules
  const modulesNodes = modules?.references?.nodes ?? [];

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <div
        ref={topSectionRef}
        className={cn(
          'relative grid',
          'md:grid-cols-12',
          'md:[@media(max-height:728px)]:grid-cols-1', // Override to 1 column when short
        )}
      >
        <ProductImage
          mediaImages={(images.nodes ?? []) as ShopifyImage[]}
          selectedVariantImage={selectedVariant?.image}
        />
        {/* Desktop Help Button - Sticky at bottom */}
        {showProductHelp?.value === 'true' && productHelp && (
          <div
            className={cn(
              'hidden col-span-1 col-start-7 row-start-1 self-end sticky bottom-0 justify-center',
              'xl:flex',
              'xl:[@media(max-height:728px)]:hidden', // Hide when short
            )}
          >
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsHelpOpen(true)}
              className="absolute bottom-8 left-8"
            >
              Help?
            </Button>
          </div>
        )}
        <ProductInfo
          certifiedLogos={certifiedLogos}
          highlights={highlights}
          title={title}
          price={selectedVariant?.price}
          productOptions={productOptions}
          selectedVariant={selectedVariant}
          descriptionHtml={descriptionHtml}
          showProductHelp={showProductHelp}
          productHelp={productHelp}
          complimentaryShipping={complimentaryShipping}
          setIsHelpOpen={setIsHelpOpen}
          cta={cta}
        />
        {/* Desktop Discover Button - Sticky at bottom */}
        <div
          className={cn(
            'hidden col-span-1 col-start-12 row-start-1 self-end sticky bottom-0 justify-center',
            'xl:flex',
            'xl:[@media(max-height:728px)]:hidden', // Hide when short
          )}
        >
          {cta && (
            <CtaButton
              reference={cta.reference}
              variant="link"
              size="sm"
              className="absolute bottom-8 right-8"
            />
          )}
        </div>
      </div>
      <div className="w-full">
        <ModuleRenderer
          modules={modulesNodes}
          productArticlePromise={productArticle}
        />
        {/* Additional Discover CTA */}
        {ctaExtra && (
          <div className="flex justify-center mb-[120px]">
            <CtaButton reference={ctaExtra.reference} variant="box" size="md" />
          </div>
        )}

        {/* Related product here */}
        {relatedProducts?.references?.nodes &&
          relatedProducts.references.nodes.length > 0 && (
            <div className="w-full">
              <div className="flex justify-center py-4">
                <h2 className="text-h2-light text-center">Related</h2>
              </div>
              {relatedProducts.references.nodes.map((relatedProduct) => (
                <ProductItem key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          )}
        <AnimatePresence>
          {!isTopSectionInView && (
            <motion.div
              initial={{y: '100%'}}
              animate={{y: '0%'}}
              exit={{y: '100%'}}
              transition={{duration: 0.5, ease: 'easeInOut'}}
              className="sticky bottom-0 left-0 right-0 z-40"
            >
              <ProductStickyBar
                product={product}
                selectedVariant={selectedVariant}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
      {/* Product Help Aside */}
      {productHelp && (
        <ProductHelpSheet
          open={isHelpOpen}
          onOpenChange={setIsHelpOpen}
          accordion={accordion?.reference}
          textBlocks={textBlocksGroup?.references?.nodes || []}
        />
      )}
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
    images(first: 10) { 
      nodes {
        id
        height
        width
        url
        altText
      }
    }
    highlights: metafield(namespace: "custom", key: "highlights") {
       references(first: 10) {
        nodes {
          ... on Metaobject {
            ...AccordionItem
          }
        }
      }
    }
    certifiedLogos: metafield(namespace: "custom", key: "certified_logos") {
      references(first: 10) {
        nodes {
          ... on MediaImage {
            ...Image
          }
        }
      }
    }
    showProductHelp: metafield(namespace: "custom", key: "show_product_help") {
      value
    }
    productHelp: metafield(namespace: "custom", key: "product_help") {
      reference {
        ... on Metaobject {
          ...ProductHelp
        }
      }
    }
    complimentaryShipping: metafield(namespace: "custom", key: "complimentary_shipping") {
      value
    }
    cta: metafield(namespace: "custom", key: "cta") {
      reference {
        ... on Metaobject {
          ...Cta
        }
      }
    }
    modules: metafield(namespace: "custom", key: "modules") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            id
            type
            # Module fragments
            ...ProductBenefits
            ...ProductCores
          }
        }
      }
    }
    ctaExtra: metafield(namespace: "custom", key: "cta_extra") {
      reference {
        ... on Metaobject {
          ...Cta
        }
      }
    }
    relatedProducts: metafield(namespace: "custom", key: "related_products") {
      references(first: 10) {
        nodes {
          ... on Product {
            ...CollectionItem
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
  ${ACCORDION_ITEM_FRAGMENT}
  ${PRODUCT_FEATURE_CARD_FRAGMENT}
  ${PRODUCT_BENEFITS_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_CORES_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${CTA_FRAGMENT}
  ${TEXT_BLOCK_WITH_CTA_FRAGMENT}
  ${PRODUCT_HELP_FRAGMENT}
  ${COLLECTION_ITEM_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
