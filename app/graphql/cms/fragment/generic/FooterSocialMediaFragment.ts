// Note: This fragment uses ...Image spread.
// The Image fragment must be included at the query level.
export const SOCIAL_MEDIA_PLATFORM_FRAGMENT = `#graphql
  fragment SocialMediaPlatform on Metaobject {
    id
    type
    name: field(key: "name") {
      value
    }
    logo: field(key: "logo") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    url: field(key: "url") {
      value
    }
  }`;
