export const CTA_FRAGMENT = `#graphql
  fragment Cta on Metaobject {
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
    buttonVariant: field(key: "button_variant") {
      value
    }
    buttonSize: field(key: "button_size") {
      value
    }
    iconVariant: field(key: "icon_variant") {
      value
    }
  }`;
