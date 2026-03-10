/**
 * ProductHelp module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...Image spread, which is defined in a separate file
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const PRODUCT_HELP_FRAGMENT = `#graphql
  fragment ProductHelp on Metaobject {
    id
    type
    accordion: field(key: "accordion") {
      reference {
        ... on Metaobject {
          ...Accordion
        }
      }
    }
    textBlocksGroup: field(key: "text_blocks_group") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            ...TextBlockWithCta
          }
        }
      }
    }
  }
`;
