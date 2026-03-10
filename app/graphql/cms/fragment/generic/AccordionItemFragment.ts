export const ACCORDION_ITEM_FRAGMENT = `#graphql
  fragment AccordionItem on Metaobject {
    id
    type
    label: field(key: "label") {
      value
    }
    content: field(key: "content") {
      value
    }
  }`;
