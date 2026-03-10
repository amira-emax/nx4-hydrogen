export const INGREDIENT_ITEM_FRAGMENT = `#graphql
  fragment IngredientItem on Metaobject {
    id
    type
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
  }`;
