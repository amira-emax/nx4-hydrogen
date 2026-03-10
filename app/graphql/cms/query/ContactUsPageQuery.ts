// Base fragments - include once at query level
import { CTA_FRAGMENT } from '../fragment/generic/CtaFragment';

// Module fragments
import { ACCORDION_ITEM_FRAGMENT } from '../fragment/generic/AccordionItemFragment';
import { TEXT_BLOCK_WITH_CTA_FRAGMENT } from '../fragment/generic/TextBlockWithCtaFragment';
import { ACCORDION_FRAGMENT } from '../fragment/module/AccordionFragment';
import { HERO_ACCORDIONS_GROUP_FRAGMENT } from '../fragment/module/HeroAccordionsGroupFragment';
import { HERO_TEXT_BLOCKS_GROUP_FRAGMENT } from '../fragment/module/HeroTextBlocksGroupFragment';

export const CONTACT_US_PAGE_CMS_QUERY = `#graphql
  # Generic fragments
  ${CTA_FRAGMENT}
  ${ACCORDION_ITEM_FRAGMENT}
  ${TEXT_BLOCK_WITH_CTA_FRAGMENT}

  # Module fragments
  ${ACCORDION_FRAGMENT}
  ${HERO_TEXT_BLOCKS_GROUP_FRAGMENT}
  ${HERO_ACCORDIONS_GROUP_FRAGMENT}
  
  query ContactUsPageCms($handle: String!) {
    contactUsPage: metaobject(handle: {handle: $handle, type: "contact_us_page"}) {
      id
      handle
      modules: field(key: "modules") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              id
              type
              # Module fragments
              ...HeroAccordionsGroup
              ...HeroTextBlocksGroup
            }
          }
        }
      }
    }
  }
` as const;
