// Note: This fragment uses ...Image spread.
// The Image fragment must be included at the query level.
export const CUSTOM_MENU_ITEM_FRAGMENT = `#graphql
  fragment CustomMenuItem on Metaobject {
    id
    type
    label: field(key: "label") {
      value
    }
    internalUrl: field(key: "internal_url") {
      value
    }
    externalUrl: field(key: "external_url") {
      value
    }
    referencedProduct: field(key: "referenced_product") {
      reference {
        ... on Product{
          id
          title
          handle
        }
      }
    }
    icon: field(key: "icon") {
      reference {
        ... on MediaImage {
          ...Image
        }
      }
    }
    border: field(key: "border") {
      value
    }
  }`;
