import {ProductBenefits} from '../product-modules/ProductBenefits';
import {ProductCores} from '../product-modules/ProductCores';
import {HeroImageWithCta} from './HeroImageWithCta';
import {HeroFeatured} from './HeroFeatured';
import {HeroIngredients} from './HeroIngredients';
import {HeroSlider} from './HeroSlider';
import {HeroCarousel} from './HeroCarousel';
import HeroAccordionsGroup from './HeroAccordionsGroup';
import HeroTextBlocksGroup from './HeroTextBlocksGroup';
import type {
  BlogArticleQuery,
  HeroAccordionsGroupFragment,
  HeroCarouselFragment,
  HeroFeaturedFragment,
  HeroImageWithCtaFragment,
  HeroIngredientsFragment,
  HeroSliderFragment,
  HeroTextBlocksGroupFragment,
  ProductBenefitsFragment,
  ProductCoresFragment,
} from 'types/storefrontapi.generated';

// Union type for all module types
export type CmsModule =
  | HeroAccordionsGroupFragment
  | HeroCarouselFragment
  | HeroFeaturedFragment
  | HeroImageWithCtaFragment
  | HeroIngredientsFragment
  | HeroSliderFragment
  | HeroTextBlocksGroupFragment
  | ProductBenefitsFragment
  | ProductCoresFragment;

interface ModuleRendererProps {
  modules: CmsModule[];
  productArticlePromise?: Promise<BlogArticleQuery | null> | null;
}

export default function ModuleRenderer({
  modules,
  productArticlePromise,
}: ModuleRendererProps) {
  if (!modules || modules.length === 0) {
    return null;
  }

  return (
    <>
      {modules.map((module, index) => {
        // TODO: for now only HeroImageWithCta has this dynamic loading logic
        // since landing page 1st module always use HeroImageWIthCta module
        // depending on new module types at future, can add more dynamic loading logic into the modules
        // Eager & high priority load images of first 2 modules
        const shouldEagerLoad = index <= 2;

        // Use the module's type to determine which component to render
        switch (module.type) {
          case 'hero_carousel':
            return (
              <HeroCarousel
                key={module.id || index}
                reference={module as HeroCarouselFragment}
              />
            );

          case 'hero_accordions_group':
            return (
              <HeroAccordionsGroup
                key={module.id || index}
                data={module as HeroAccordionsGroupFragment}
              />
            );

          case 'hero_text_blocks_group':
            return (
              <HeroTextBlocksGroup
                key={module.id || index}
                data={module as HeroTextBlocksGroupFragment}
              />
            );

          case 'hero_image_with_cta':
            return (
              <HeroImageWithCta
                key={module.id || index}
                reference={module as HeroImageWithCtaFragment}
                shouldEagerLoad={shouldEagerLoad}
              />
            );

          case 'hero_featured':
            return (
              <HeroFeatured
                key={module.id || index}
                reference={module as HeroFeaturedFragment}
              />
            );

          case 'hero_ingredients':
            return (
              <HeroIngredients
                key={module.id || index}
                reference={module as HeroIngredientsFragment}
              />
            );

          case 'hero_slider':
            return (
              <HeroSlider
                key={module.id || index}
                reference={module as HeroSliderFragment}
              />
            );

          case 'product_cores':
            return (
              <ProductCores
                key={module.id || index}
                reference={module as ProductCoresFragment}
              />
            );

          case 'product_benefits':
            return (
              <ProductBenefits
                key={module.id || index}
                reference={module as ProductBenefitsFragment}
                contentPromise={productArticlePromise}
              />
            );

          default:
            // For debugging purposes, log unknown module types
            console.warn(`Unknown module type: ${module.type}`);
            return null;
        }
      })}
    </>
  );
}
