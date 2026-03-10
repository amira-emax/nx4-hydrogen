import {CUSTOM_MENU_ITEM_FRAGMENT} from '../fragment/generic/MenuItemFragment';
import {IMAGE_FRAGMENT} from '../fragment/generic/ImageFragment';

export const MOBILE_MENU_CMS_QUERY = `#graphql
  ${IMAGE_FRAGMENT}
  ${CUSTOM_MENU_ITEM_FRAGMENT}

  query MobileMenuCms($handle: String!) {
    mobileMenu: metaobject(handle: {handle: $handle, type: "global_mobile_menu"}) {
      id
      handle
      items: field(key: "items") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              ...CustomMenuItem
            }
          }
        }
      }
    }
  }
` as const;
