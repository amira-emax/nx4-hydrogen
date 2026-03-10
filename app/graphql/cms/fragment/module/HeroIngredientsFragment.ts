/**
 * HeroIngredients module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...IngredientItem, ...Image, and ...Cta spreads, which are defined
 * in separate files and composed at query-level via template literals. The GraphQL
 * language server cannot resolve fragments across files, but the query works correctly
 * at runtime. Types are properly generated in storefrontapi.generated.d.ts.
 */
export const HERO_INGREDIENTS_FRAGMENT = `#graphql
  fragment HeroIngredients on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    logo: field(key: "logo") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    rotateLogo: field(key: "rotate_logo") {
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
    desktopHeight: field(key: "desktop_height") {
      value
    }
    mobileHeight: field(key: "mobile_height") {
      value
    }
    items: field(key: "items") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            ...IngredientItem
          }
        }
      }
    }
    cta: field(key: "cta") {
      reference {
        ... on Metaobject {
          ...Cta
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
