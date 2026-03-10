export const TEXT_BLOCK_WITH_CTA_FRAGMENT = `#graphql
  fragment TextBlockWithCta on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    cta: field(key: "cta") {
      reference {
        ...Cta
      }
    }
  }`;
