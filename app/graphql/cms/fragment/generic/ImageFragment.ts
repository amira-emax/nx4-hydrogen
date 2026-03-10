export const IMAGE_FRAGMENT = `#graphql
  fragment Image on MediaImage {
    image {
      height
      width
      url
      altText
    }
  }
`;
