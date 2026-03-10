/**
 * ProductBenefits module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...ProductFeatureCard spread, which is defined in a separate file
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const PRODUCT_BENEFITS_FRAGMENT = `#graphql
  fragment ProductBenefits on Metaobject {
    id
    type
    label: field(key: "label") {
      value
    }
    title: field(key: "title") {
      value
    }
    cards: field(key: "cards") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            ...ProductFeatureCard
          }
        }
      }
    }
  }
`;
