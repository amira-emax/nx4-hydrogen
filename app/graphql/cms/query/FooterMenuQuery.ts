import {MENU_GROUP_FRAGMENT} from '../fragment/generic/MenuGroupFragment';
import {CUSTOM_MENU_ITEM_FRAGMENT} from '../fragment/generic/MenuItemFragment';
import {IMAGE_FRAGMENT} from '../fragment/generic/ImageFragment';

export const FOOTER_MENU_CMS_QUERY = `#graphql
  ${IMAGE_FRAGMENT}
  ${CUSTOM_MENU_ITEM_FRAGMENT}
  ${MENU_GROUP_FRAGMENT}

  query FooterMenuCms($handle: String!) {
    footerMenu: metaobject(handle: {handle: $handle, type: "global_footer_menu"}) {
      id
      handle
      caption: field(key: "caption") {
        value
      }
      groups: field(key: "groups") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
                ...MenuGroup
            }
          }
        }
      }
    }
  }
` as const;
