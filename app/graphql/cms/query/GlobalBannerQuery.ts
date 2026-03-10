export const GLOBAL_BANNER_CMS_QUERY = `#graphql
  query GlobalBannerCms($handle: String!) {
    globalBanner: metaobject(handle: {handle: $handle, type: "global_banner"}) {
      id
      handle
      display: field(key: "display") {
        value
      }
      content: field(key: "content") {
        value
      }
    }
  }
` as const;
