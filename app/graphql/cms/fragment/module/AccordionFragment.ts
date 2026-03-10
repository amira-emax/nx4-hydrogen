export const ACCORDION_FRAGMENT = `#graphql
  fragment Accordion on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    items: field(key: "items") {
      references(first: 20) {
        nodes {
          ...AccordionItem
        }
      }
    }
    icon: field(key: "icon") {
      value
    }
  }`;
