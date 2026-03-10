// Base fragments - include once at query level
import { IMAGE_FRAGMENT } from '../fragment/generic/ImageFragment';
import { CTA_FRAGMENT } from '../fragment/generic/CtaFragment';
import { CAROUSEL_ITEM_FRAGMENT } from '../fragment/generic/CarouselItemFragment';
import { INGREDIENT_ITEM_FRAGMENT } from '../fragment/generic/IngredientItemFragment';
import { PRODUCT_FEATURE_CARD_FRAGMENT } from '../fragment/generic/ProductFeatureCardFragment';
import { SLIDER_ITEM_FRAGMENT } from '../fragment/generic/SliderItemFragment';

// Module fragments
import { HERO_IMAGE_WITH_CTA_FRAGMENT } from '../fragment/module/HeroImageWithCtaFragment';
import { HERO_CAROUSEL_FRAGMENT } from '../fragment/module/HeroCarouselFragment';
import { HERO_FEATURED_FRAGMENT } from '../fragment/module/HeroFeaturedFragment';
import { HERO_INGREDIENTS_FRAGMENT } from '../fragment/module/HeroIngredientsFragment';
import { HERO_SLIDER_FRAGMENT } from '../fragment/module/HeroSliderFragment';
import { PRODUCT_BENEFITS_FRAGMENT } from '../fragment/module/ProductBenefitsFragment';
import { PRODUCT_CORES_FRAGMENT } from '../fragment/module/ProductCoresFragment';

export const ORIGINS_PAGE_CMS_QUERY = `#graphql
  # Generic fragments
  ${IMAGE_FRAGMENT}
  ${CTA_FRAGMENT}
  ${CAROUSEL_ITEM_FRAGMENT}
  ${INGREDIENT_ITEM_FRAGMENT}
  ${PRODUCT_FEATURE_CARD_FRAGMENT}
  ${SLIDER_ITEM_FRAGMENT}

  # Module fragments
  ${HERO_IMAGE_WITH_CTA_FRAGMENT}
  ${HERO_CAROUSEL_FRAGMENT}
  ${HERO_FEATURED_FRAGMENT}
  ${HERO_INGREDIENTS_FRAGMENT}
  ${HERO_SLIDER_FRAGMENT}
  ${PRODUCT_BENEFITS_FRAGMENT}
  ${PRODUCT_CORES_FRAGMENT}
  
  query OriginsPageCms($handle: String!) {
    originsPage: metaobject(handle: {handle: $handle, type: "origins_page"}) {
      id
      handle
      modules: field(key: "modules") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              id
              type
              # Module fragments
              ...HeroImageWithCta
              ...HeroCarousel
              ...HeroFeatured
              ...HeroIngredients
              ...HeroSlider
              ...ProductBenefits
              ...ProductCores
            }
          }
        }
      }
    }
  }
` as const;
