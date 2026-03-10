/**
 * HeroCarousel module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...CarouselItem spread, which is defined in a separate file
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const HERO_CAROUSEL_FRAGMENT = `#graphql
  fragment HeroCarousel on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    cta: field(key: "cta") {
      reference {
        ... on Metaobject {
          ...Cta
        }
      }
    }
    items: field(key: "items") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            ...CarouselItem
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
