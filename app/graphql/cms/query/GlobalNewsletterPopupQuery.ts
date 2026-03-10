export const GLOBAL_NEWSLETTER_POPUP_CMS_QUERY = `#graphql
  query GlobalNewsletterPopupCms($handle: String!) {
    globalNewsletterPopup: metaobject(handle: {handle: $handle, type: "global_newsletter_popup"}) {
      id
      handle
      display: field(key: "display") {
        value
      }
      image: field(key: "image") {
        reference {
          ... on MediaImage {
            image {
              height
              width
              url
              altText
            }
          }
        }
      }
      title: field(key: "title") {
        value
      }
      description: field(key: "description") {
        value
      }
      caption: field(key: "caption") {
        value
      }
    }
  }
` as const;
