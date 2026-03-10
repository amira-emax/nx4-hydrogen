/**
 * CarouselItem generic fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...Image spread, which is defined in a separate file
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const CAROUSEL_ITEM_FRAGMENT = `#graphql
  fragment CarouselItem on Metaobject {
    id
    type
    label: field(key: "label") {
      value
    }
    description: field(key: "description") {
      value
    }
    caption: field(key: "caption") {
      value
    }
    logo: field(key: "logo") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    image: field(key: "image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    layout: field(key: "layout") {
      value
    }
    externalUrl: field(key: "external_url") {
      value
    }
    internalUrl: field(key: "internal_url") {
      value
    }
    referencedProduct: field(key: "referenced_product") {
      reference {
        ... on Product{
          id
          title
          handle
        }
      }
    }
  }`;
