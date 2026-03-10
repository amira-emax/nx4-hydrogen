/**
 * HeroFeatured module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...Image spread, which is defined in a separate file
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const HERO_FEATURED_FRAGMENT = `#graphql
  fragment HeroFeatured on Metaobject {
    id
    type
    label: field(key: "label") {
      value
    }
    description: field(key: "description") {
      value
    }
    platforms: field(key: "platforms") {
      references(first: 20) {
        nodes {
          ... on MediaImage {
            ...Image
          }
        }
      }
    }
    anchor: field(key: "anchor") {
      reference {
        ... on Product {
          id
          title
          handle
        }
      }
    }
  }
`;
