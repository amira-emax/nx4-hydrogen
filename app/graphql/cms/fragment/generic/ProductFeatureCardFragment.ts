export const PRODUCT_FEATURE_CARD_FRAGMENT = `#graphql
  fragment ProductFeatureCard on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    label: field(key: "label") {
      value
    }
  }`;
