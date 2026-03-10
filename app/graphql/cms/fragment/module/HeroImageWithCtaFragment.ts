/**
 * HeroImageWithCta module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * This fragment uses ...Cta and ...Image spreads, which are defined in separate files
 * and composed at query-level via template literals. The GraphQL language server
 * cannot resolve fragments across files, but the query works correctly at runtime.
 * Types are properly generated in storefrontapi.generated.d.ts.
 */
export const HERO_IMAGE_WITH_CTA_FRAGMENT = `#graphql
  fragment HeroImageWithCta on Metaobject {
    id
    type
    desktopImage: field(key: "desktop_image") {
      references(first: 2) {
        nodes {
          ... on MediaImage {
            ...Image
          }
        }
      }
    }
    mobileImage: field(key: "mobile_image") {
      references(first: 2) {
        nodes {
          ... on MediaImage {
            ...Image
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
    title: field(key: "title") {
      value
    }
    subtitle: field(key: "subtitle") {
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
    contentGradient: field(key: "content_gradient") {
      value
    }
    contentPosition: field(key: "content_position") {
      value
    }
    contentOffset: field(key: "content_offset") {
      value
    }
    contentColor: field(key: "content_color") {
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