export const HERO_ACCORDIONS_GROUP_FRAGMENT = `#graphql
  fragment HeroAccordionsGroup on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    accordions: field(key: "accordions") {
      references(first: 20) {
        nodes {
          ...Accordion
        }
      }
    }
    anchor: field(key: "anchor") {
      reference {
        ... on Product {
          id
          title
          handle
        }
      }
    }
  }`;
