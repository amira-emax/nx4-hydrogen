export const HERO_TEXT_BLOCKS_GROUP_FRAGMENT = `#graphql
  fragment HeroTextBlocksGroup on Metaobject {
    id
    type
    blocks: field(key: "blocks") {
      references(first: 10) {
        nodes {
          ...TextBlockWithCta
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
