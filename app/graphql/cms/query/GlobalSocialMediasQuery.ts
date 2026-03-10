import {SOCIAL_MEDIA_PLATFORM_FRAGMENT} from '../fragment/generic/FooterSocialMediaFragment';
import { IMAGE_FRAGMENT } from '../fragment/generic/ImageFragment';

export const GLOBAL_SOCIAL_MEDIAS_QUERY = `#graphql
  ${IMAGE_FRAGMENT}
  ${SOCIAL_MEDIA_PLATFORM_FRAGMENT}

  query GlobalSocialMediasCms($handle: String!) {
    globalSocialMedias: metaobject(handle: {handle: $handle, type: "global_social_medias"}) {
      id
      handle
      label: field(key: "label") {
        value
      }
      platforms: field(key: "platforms") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
                ...SocialMediaPlatform
            }
          }
        }
      }
    }
  }
` as const;
