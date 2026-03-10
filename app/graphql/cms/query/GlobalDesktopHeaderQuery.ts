import {CUSTOM_MENU_ITEM_FRAGMENT} from '../fragment/generic/MenuItemFragment';
import {IMAGE_FRAGMENT} from '../fragment/generic/ImageFragment';

export const GLOBAL_DESKTOP_HEADER_CMS_QUERY = `#graphql
  ${IMAGE_FRAGMENT}
  ${CUSTOM_MENU_ITEM_FRAGMENT}

  query GlobalDesktopHeaderCms($handle: String!) {
    globalDesktopHeader: metaobject(handle: {handle: $handle, type: "global_desktop_header"}) {
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
