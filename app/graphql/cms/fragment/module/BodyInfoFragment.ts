/**
 * BodyInfo module fragment.
 *
 * NOTE: The "Unknown fragment" error shown by the IDE is expected.
 * The ...Image spread is defined in ImageFragment.ts and composed at query-level.
 */
export const BODY_INFO_FRAGMENT = `#graphql
  fragment BodyInfo on Metaobject {
    id
    type
    bgImage: field(key: "bg_image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    featuredImage: field(key: "image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    featuredImages: field(key: "featured_images") {
      references(first: 10) {
        nodes {
          ... on MediaImage {
            ...Image
          }
        }
      }
    }
    featuredVideo: field(key: "video") {
      reference {
        ... on Video {
          id
          sources {
            url
            mimeType
          }
        }
      }
    }
    sectionHeaderPadding: field(key: "section_header_padding") {
      value
    }
    title: field(key: "title") {
      value
    }
    titleItalic: field(key: "title_italic") {
      value
    }
    titleSemibold: field(key: "title_semibold") {
      value
    }
    subTitleNumber: field(key: "sub_title_number") {
      value
    }
    subTitle: field(key: "sub_title") {
      value
    }
    description: field(key: "description") {
      value
    }
    caption: field(key: "caption") {
      value
    }
    headerFont: field(key: "header_font") {
      value
    }
    contentFont: field(key: "content_font") {
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
    sectionContentPadding: field(key: "section_content_padding") {
      value
    }
    brandHeader: field(key: "brand_header") {
      value
    }
    brandSubHeader: field(key: "brand_sub_header") {
      value
    }
    brandDescription: field(key: "brand_description") {
      value
    }
    sectionImage: field(key: "section_image") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    certLogos: field(key: "cert_logos") {
      references(first: 10) {
        nodes {
          ... on MediaImage {
            id
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
    certText: field(key: "cert_text") {
      value
    }
    textUrl: field(key: "text_url") {
      value
    }
    linkUrl: field(key: "link_url") {
      value
    }
    urlLabelItalic: field(key: "url_label_italic") {
      value
    }
    mediaItemHeight: field(key: "media_item_height") {
      value
    }
    mediaBlocks: field(key: "media_blocks") {
      references(first: 10) {
        nodes {
          ... on Metaobject {
            id
            blockVideo: field(key: "video") {
              reference {
                ... on Video {
                  id
                  sources {
                    url
                    mimeType
                  }
                }
              }
            }
            name: field(key: "name") {
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
