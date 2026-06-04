// Base fragments
import {IMAGE_FRAGMENT} from '../fragment/generic/ImageFragment';

// Module fragments
import {INTRODUCTION_FRAGMENT} from '../fragment/module/IntroductionFragment';
import {SCROLLABLE_IMAGE_FRAGMENT} from '../fragment/module/ScrollableImageFragment';
import {BODY_INFO_FRAGMENT} from '../fragment/module/BodyInfoFragment';

export const PROMOTION_PAGE_CMS_QUERY = `#graphql
  # Generic fragments
  ${IMAGE_FRAGMENT}

  # Module fragments
  ${INTRODUCTION_FRAGMENT}
  ${SCROLLABLE_IMAGE_FRAGMENT}
  ${BODY_INFO_FRAGMENT}

  query PromotionPageCms($handle: String!) {
    promotionPage: metaobject(handle: {handle: $handle, type: "promotion_page"}) {
      id
      handle
      modules: field(key: "modules") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              id
              type
              # Module fragments
              ...Introduction
              ...ScrollableImage
              ...BodyInfo
            }
          }
        }
      }
    }
  }
` as const;
