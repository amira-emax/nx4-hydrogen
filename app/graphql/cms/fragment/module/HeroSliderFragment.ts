/**
 * HeroSlider module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...SliderItem spread, which is defined in a separate file
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const HERO_SLIDER_FRAGMENT = `#graphql
  fragment HeroSlider on Metaobject {
    id
    type
    items: field(key: "items") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            ...SliderItem
          }
        }
      }
    }
    desktopHeight: field(key: "desktop_height") {
      value
    }
    mobileHeight: field(key: "mobile_height") {
      value
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
