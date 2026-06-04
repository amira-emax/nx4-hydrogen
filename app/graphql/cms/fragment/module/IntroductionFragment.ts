/**
 * Introduction module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * The ...Image spread is defined in ImageFragment.ts and composed at query-level.
 * Types are properly generated in storefrontapi.generated.d.ts after codegen.
 */
export const INTRODUCTION_FRAGMENT = `#graphql
  fragment Introduction on Metaobject {
    id
    type
    bgImage: field(key: "bg_image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    bgOverlay: field(key: "bg_overlay") {
      value
    }
    heroHeaderTop: field(key: "hero_header_top") {
      value
    }
    headerTopColorType: field(key: "header_top_color_type") {
      value
    }
    headerTopColor: field(key: "header_top_color") {
      value
    }
    headerTopGradient: field(key: "header_top_gradient") {
      value
    }
    heroImage: field(key: "hero_image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    heroImageOverlay: field(key: "hero_image_overlay") {
      value
    }
    imageSize: field(key: "image_size") {
      value
    }
    imgPaddingTop: field(key: "img_padding_top") {
      value
    }
    imgPaddingBottom: field(key: "img_padding_bottom") {
      value
    }
    layout: field(key: "layout") {
      value
    }
    textAlign: field(key: "text_align") {
      value
    }
    heroHeader: field(key: "hero_header") {
      value
    }
    headerColorType: field(key: "header_color_type") {
      value
    }
    headerColor: field(key: "header_color") {
      value
    }
    headerGradient: field(key: "header_gradient") {
      value
    }
    heroLabel: field(key: "hero_label") {
      value
    }
    heroDescription: field(key: "hero_description") {
      value
    }
    urlLabel: field(key: "url_label") {
      value
    }
    url: field(key: "url") {
      value
    }
    contentColor: field(key: "content_color") {
      value
    }
    gridLabel: field(key: "grid_label") {
      value
    }
    gridTitle: field(key: "grid_title") {
      value
    }
    gridTextColor: field(key: "grid_text_color") {
      value
    }
    gridHeadingAlign: field(key: "grid_heading_align") {
      value
    }
    imageAspect: field(key: "image_aspect") {
      value
    }
    overlay: field(key: "overlay") {
      value
    }
    overlayColor: field(key: "overlay_color") {
      value
    }
    textShadow: field(key: "text_shadow") {
      value
    }
    bottomHeader: field(key: "header") {
      value
    }
    bottomDescription: field(key: "description") {
      value
    }
    bottomDescPaddingTop: field(key: "bottom_desc_padding_top") {
      value
    }
    bottomDescPaddingBottom: field(key: "bottom_desc_padding_bottom") {
      value
    }
    imageBlocks: field(key: "image_blocks") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            id
            brandImage: field(key: "brand_image") {
              reference {
                ... on MediaImage {
                  ...Image
                }
              }
            }
            text: field(key: "text") {
              value
            }
            textPosition: field(key: "text_position") {
              value
            }
          }
        }
      }
    }
  }
`;
