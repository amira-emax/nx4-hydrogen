/**
 * ScrollableImage module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * The ...Image spread is defined in ImageFragment.ts and composed at query-level.
 */
export const SCROLLABLE_IMAGE_FRAGMENT = `#graphql
  fragment ScrollableImage on Metaobject {
    id
    type
    bgImage: field(key: "bg_image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    bgImageMobile: field(key: "background_image_mobile") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    bgPosition: field(key: "bg_position") {
      value
    }
    bgFix: field(key: "bg_fix") {
      value
    }
    sectionHeight: field(key: "section_height") {
      value
    }
    sectionHeightMobile: field(key: "section_height_mobile") {
      value
    }
    mobileTextLayout: field(key: "mobile_text_layout") {
      value
    }
    textFade: field(key: "text_fade") {
      value
    }
    contentFont: field(key: "content_font") {
      value
    }
    headerFont: field(key: "header_font") {
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
    contentColor: field(key: "content_color") {
      value
    }
    textPosition: field(key: "text_position") {
      value
    }
    textAlignment: field(key: "text_alignment") {
      value
    }
    contentAlignment: field(key: "content_alignment") {
      value
    }
    header: field(key: "header") {
      value
    }
    label: field(key: "label") {
      value
    }
    labelFontSize: field(key: "label_font_size") {
      value
    }
    body: field(key: "body") {
      value
    }
    bodyFontWeight: field(key: "body_font_weight") {
      value
    }
    urlLabel: field(key: "url_label") {
      value
    }
    url: field(key: "url") {
      value
    }
    urlTextItalic: field(key: "url_text_italic") {
      value
    }
    ctaFontWeight: field(key: "cta_font_weight") {
      value
    }
    logoImages: field(key: "logo_images") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            id
            logoImage: field(key: "logo_image") {
              reference {
                ... on MediaImage {
                  ...Image
                }
              }
            }
          }
        }
      }
    }
  }
`;
