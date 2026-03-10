/**
 * ProductCores module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...Image spread, which is defined in a separate file
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const PRODUCT_CORES_FRAGMENT = `#graphql
  fragment ProductCores on Metaobject {
    id
    type
    labels: field(key: "labels") {
      value
    }
    desktopImage: field(key: "desktop_image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    mobileImage: field(key: "mobile_image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
  }
`;
