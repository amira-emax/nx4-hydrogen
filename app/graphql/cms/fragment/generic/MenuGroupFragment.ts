// Note: This fragment uses ...CustomMenuItem spread.
// The CustomMenuItem and Image fragments must be included at the query level.
export const MENU_GROUP_FRAGMENT = `#graphql
  fragment MenuGroup on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    items: field(key: "items") {
      references(first: 20) {
        nodes {
          ... on Metaobject {
            ...CustomMenuItem
          }
        }
      }
    }
  }`;
