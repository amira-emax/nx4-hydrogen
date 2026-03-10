/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type AccordionItemFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  content?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type CarouselItemFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  caption?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  logo?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  image?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  layout?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  externalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  internalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  referencedProduct?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type CtaFragment = Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  internalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  externalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  referencedProduct?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
  buttonVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  buttonSize?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  iconVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
};

export type SocialMediaPlatformFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  name?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  logo?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  url?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type ImageFragment = {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
  >;
};

export type IngredientItemFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
};

export type MenuGroupFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  items?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          internalUrl?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          externalUrl?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          referencedProduct?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
            >;
          }>;
          icon?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
          border?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
        }
      >;
    }>;
  }>;
};

export type CustomMenuItemFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  internalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  externalUrl?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  referencedProduct?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
  icon?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  border?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type ProductFeatureCardFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type SliderItemFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  desktopImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type TextBlockWithCtaFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        referencedProduct?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
          >;
        }>;
        buttonVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        buttonSize?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
};

export type AccordionFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  items?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          content?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
        }
      >;
    }>;
  }>;
  icon?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
};

export type HeroAccordionsGroupFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  accordions?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          items?: StorefrontAPI.Maybe<{
            references?: StorefrontAPI.Maybe<{
              nodes: Array<
                Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                  label?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  content?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }
              >;
            }>;
          }>;
          icon?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
        }
      >;
    }>;
  }>;
  anchor?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type HeroCarouselFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        referencedProduct?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
          >;
        }>;
        buttonVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        buttonSize?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
  items?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          description?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          caption?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          logo?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
          image?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
          layout?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          externalUrl?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          internalUrl?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          referencedProduct?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
            >;
          }>;
        }
      >;
    }>;
  }>;
  anchor?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type HeroFeaturedFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  platforms?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
        >;
      }>;
    }>;
  }>;
  anchor?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type HeroImageWithCtaFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  desktopImage?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
        >;
      }>;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
        >;
      }>;
    }>;
  }>;
  desktopHeight?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  mobileHeight?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  subtitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  description?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        referencedProduct?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
          >;
        }>;
        buttonVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        buttonSize?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
  contentGradient?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  contentPosition?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  contentOffset?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  contentColor?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  anchor?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type HeroIngredientsFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  logo?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  rotateLogo?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  desktopImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  desktopHeight?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  mobileHeight?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  items?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          description?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
        }
      >;
    }>;
  }>;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        referencedProduct?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
          >;
        }>;
        buttonVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        buttonSize?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
  anchor?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type HeroSliderFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  items?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          description?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          desktopImage?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
          mobileImage?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
        }
      >;
    }>;
  }>;
  desktopHeight?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  mobileHeight?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MetaobjectField, 'value'>
  >;
  anchor?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type HeroTextBlocksGroupFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  blocks?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          description?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          cta?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                label?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                internalUrl?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                externalUrl?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                referencedProduct?: StorefrontAPI.Maybe<{
                  reference?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                  >;
                }>;
                buttonVariant?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                buttonSize?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                iconVariant?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
              }
            >;
          }>;
        }
      >;
    }>;
  }>;
  anchor?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
    >;
  }>;
};

export type ProductBenefitsFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  cards?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
        }
      >;
    }>;
  }>;
};

export type ProductCoresFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  labels?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
  desktopImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
  mobileImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type ProductHelpFragment = Pick<
  StorefrontAPI.Metaobject,
  'id' | 'type'
> & {
  accordion?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        title?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        items?: StorefrontAPI.Maybe<{
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                label?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                content?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
              }
            >;
          }>;
        }>;
        icon?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
  textBlocksGroup?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          description?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          cta?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                label?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                internalUrl?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                externalUrl?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                referencedProduct?: StorefrontAPI.Maybe<{
                  reference?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                  >;
                }>;
                buttonVariant?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                buttonSize?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                iconVariant?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
              }
            >;
          }>;
        }
      >;
    }>;
  }>;
};

export type BlogPostsByHandleQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type BlogPostsByHandleQuery = {
  blog?: StorefrontAPI.Maybe<{
    articles: {
      nodes: Array<
        Pick<
          StorefrontAPI.Article,
          'id' | 'handle' | 'title' | 'excerpt' | 'contentHtml' | 'tags'
        > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
          caption?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'type' | 'value'>
          >;
        }
      >;
    };
  }>;
};

export type BlogArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type BlogArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Article,
          | 'handle'
          | 'title'
          | 'contentHtml'
          | 'publishedAt'
          | 'tags'
          | 'excerpt'
        > & {
          author?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ArticleAuthor, 'name'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'description' | 'title'>
          >;
          caption?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'type' | 'value'>
          >;
        }
      >;
    }
  >;
};

export type ContactUsPageCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ContactUsPageCmsQuery = {
  contactUsPage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      modules?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              description?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              accordions?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      title?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      items?: StorefrontAPI.Maybe<{
                        references?: StorefrontAPI.Maybe<{
                          nodes: Array<
                            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                              label?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.MetaobjectField, 'value'>
                              >;
                              content?: StorefrontAPI.Maybe<
                                Pick<StorefrontAPI.MetaobjectField, 'value'>
                              >;
                            }
                          >;
                        }>;
                      }>;
                      icon?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                    }
                  >;
                }>;
              }>;
              anchor?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                >;
              }>;
              blocks?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      title?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      description?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      cta?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                            label?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MetaobjectField, 'value'>
                            >;
                            internalUrl?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MetaobjectField, 'value'>
                            >;
                            externalUrl?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MetaobjectField, 'value'>
                            >;
                            referencedProduct?: StorefrontAPI.Maybe<{
                              reference?: StorefrontAPI.Maybe<
                                Pick<
                                  StorefrontAPI.Product,
                                  'id' | 'title' | 'handle'
                                >
                              >;
                            }>;
                            buttonVariant?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MetaobjectField, 'value'>
                            >;
                            buttonSize?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MetaobjectField, 'value'>
                            >;
                            iconVariant?: StorefrontAPI.Maybe<
                              Pick<StorefrontAPI.MetaobjectField, 'value'>
                            >;
                          }
                        >;
                      }>;
                    }
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type FooterMenuCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type FooterMenuCmsQuery = {
  footerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      caption?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      groups?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              items?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      internalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      externalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      referencedProduct?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                        >;
                      }>;
                      icon?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                      border?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                    }
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type GlobalBannerCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type GlobalBannerCmsQuery = {
  globalBanner?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      display?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      content?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }
  >;
};

export type GlobalDesktopHeaderCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type GlobalDesktopHeaderCmsQuery = {
  globalDesktopHeader?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      items?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              label?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              internalUrl?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              externalUrl?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              referencedProduct?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                >;
              }>;
              icon?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              border?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type GlobalNewsletterPopupCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type GlobalNewsletterPopupCmsQuery = {
  globalNewsletterPopup?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      display?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      image?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
          >;
        }>;
      }>;
      title?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      description?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
      caption?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MetaobjectField, 'value'>
      >;
    }
  >;
};

export type GlobalSocialMediasCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type GlobalSocialMediasCmsQuery = {
  globalSocialMedias?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      label?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MetaobjectField, 'value'>>;
      platforms?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              name?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              logo?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              url?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type HomePageCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type HomePageCmsQuery = {
  homePage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      modules?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              desktopImage?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              mobileImage?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              desktopHeight?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              mobileHeight?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              subtitle?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              description?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cta?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                    label?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    internalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    externalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    referencedProduct?: StorefrontAPI.Maybe<{
                      reference?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                      >;
                    }>;
                    buttonVariant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    buttonSize?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    iconVariant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }
                >;
              }>;
              contentGradient?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              contentPosition?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              contentOffset?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              contentColor?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              anchor?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                >;
              }>;
              items?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      description?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      caption?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      logo?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                      image?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                      layout?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      externalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      internalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      referencedProduct?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                        >;
                      }>;
                      title?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      desktopImage?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                      mobileImage?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                    }
                  >;
                }>;
              }>;
              label?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              platforms?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
              }>;
              logo?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              rotateLogo?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cards?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      title?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                    }
                  >;
                }>;
              }>;
              labels?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type MobileMenuCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type MobileMenuCmsQuery = {
  mobileMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      items?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              label?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              internalUrl?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              externalUrl?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              referencedProduct?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                >;
              }>;
              icon?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              border?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type OriginsPageCmsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type OriginsPageCmsQuery = {
  originsPage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metaobject, 'id' | 'handle'> & {
      modules?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              desktopImage?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              mobileImage?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              desktopHeight?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              mobileHeight?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              subtitle?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              description?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cta?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                    label?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    internalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    externalUrl?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    referencedProduct?: StorefrontAPI.Maybe<{
                      reference?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                      >;
                    }>;
                    buttonVariant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    buttonSize?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    iconVariant?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                  }
                >;
              }>;
              contentGradient?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              contentPosition?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              contentOffset?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              contentColor?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              anchor?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                >;
              }>;
              items?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      description?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      caption?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      logo?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                      image?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                      layout?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      externalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      internalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      referencedProduct?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                        >;
                      }>;
                      title?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      desktopImage?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                      mobileImage?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<{
                          image?: StorefrontAPI.Maybe<
                            Pick<
                              StorefrontAPI.Image,
                              'height' | 'width' | 'url' | 'altText'
                            >
                          >;
                        }>;
                      }>;
                    }
                  >;
                }>;
              }>;
              label?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              platforms?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'height' | 'width' | 'url' | 'altText'
                      >
                    >;
                  }>;
                }>;
              }>;
              logo?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              rotateLogo?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cards?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      title?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                    }
                  >;
                }>;
              }>;
              labels?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, 'id' | 'lastCharacters'> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    }
  >;
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FooterQuery = {
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

export type MoneyProductItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type ProductItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  cardLabel?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'type' | 'value'>
  >;
  cardImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type CollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      products: {
        nodes: Array<
          Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              maxVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            cardLabel?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Metafield, 'type' | 'value'>
            >;
            cardImage?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'height' | 'width' | 'url' | 'altText'
                  >
                >;
              }>;
            }>;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type MoneyCollectionItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type CollectionItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title' | 'productType'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  compareAtPriceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'>
  >;
  cardLabel?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'type' | 'value'>
  >;
  cardImage?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
      >;
    }>;
  }>;
};

export type CatalogQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CatalogQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title' | 'productType'> & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        compareAtPriceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'>
        >;
        cardLabel?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metafield, 'type' | 'value'>
        >;
        cardImage?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<{
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
            >;
          }>;
        }>;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PolicyArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type PolicyArticleQuery = {
  blog?: StorefrontAPI.Maybe<{
    articleByHandle?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Article, 'title' | 'contentHtml'> & {
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'title' | 'description'>
        >;
      }
    >;
  }>;
};

export type ProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'availableForSale' | 'id' | 'sku' | 'title'
> & {
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  image?: StorefrontAPI.Maybe<
    {__typename: 'Image'} & Pick<
      StorefrontAPI.Image,
      'id' | 'url' | 'altText' | 'width' | 'height'
    >
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
};

export type ProductFragment = Pick<
  StorefrontAPI.Product,
  | 'id'
  | 'title'
  | 'vendor'
  | 'handle'
  | 'descriptionHtml'
  | 'description'
  | 'encodedVariantExistence'
  | 'encodedVariantAvailability'
> & {
  options: Array<
    Pick<StorefrontAPI.ProductOption, 'name'> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
          firstSelectableVariant?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.ProductVariant,
              'availableForSale' | 'id' | 'sku' | 'title'
            > & {
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              image?: StorefrontAPI.Maybe<
                {__typename: 'Image'} & Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
            }
          >;
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
              image?: StorefrontAPI.Maybe<{
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              }>;
            }
          >;
        }
      >;
    }
  >;
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
    }
  >;
  adjacentVariants: Array<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
    }
  >;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
  images: {
    nodes: Array<
      Pick<StorefrontAPI.Image, 'id' | 'height' | 'width' | 'url' | 'altText'>
    >;
  };
  highlights?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          content?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
        }
      >;
    }>;
  }>;
  certifiedLogos?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<{
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
        >;
      }>;
    }>;
  }>;
  showProductHelp?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
  productHelp?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        accordion?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              items?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      content?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                    }
                  >;
                }>;
              }>;
              icon?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
        textBlocksGroup?: StorefrontAPI.Maybe<{
          references?: StorefrontAPI.Maybe<{
            nodes: Array<
              Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                title?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                description?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MetaobjectField, 'value'>
                >;
                cta?: StorefrontAPI.Maybe<{
                  reference?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      internalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      externalUrl?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      referencedProduct?: StorefrontAPI.Maybe<{
                        reference?: StorefrontAPI.Maybe<
                          Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
                        >;
                      }>;
                      buttonVariant?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      buttonSize?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      iconVariant?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                    }
                  >;
                }>;
              }
            >;
          }>;
        }>;
      }
    >;
  }>;
  complimentaryShipping?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Metafield, 'value'>
  >;
  cta?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        referencedProduct?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
          >;
        }>;
        buttonVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        buttonSize?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
  modules?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
          label?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          title?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          cards?: StorefrontAPI.Maybe<{
            references?: StorefrontAPI.Maybe<{
              nodes: Array<
                Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                  title?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  label?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }
              >;
            }>;
          }>;
          labels?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MetaobjectField, 'value'>
          >;
          desktopImage?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
          mobileImage?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
        }
      >;
    }>;
  }>;
  ctaExtra?: StorefrontAPI.Maybe<{
    reference?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
        label?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        internalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        externalUrl?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        referencedProduct?: StorefrontAPI.Maybe<{
          reference?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
          >;
        }>;
        buttonVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        buttonSize?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
        iconVariant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MetaobjectField, 'value'>
        >;
      }
    >;
  }>;
  relatedProducts?: StorefrontAPI.Maybe<{
    references?: StorefrontAPI.Maybe<{
      nodes: Array<
        Pick<
          StorefrontAPI.Product,
          'id' | 'handle' | 'title' | 'productType'
        > & {
          featuredImage?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          priceRange: {
            minVariantPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            maxVariantPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
          };
          compareAtPriceRange: {
            minVariantPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            maxVariantPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
          };
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'>
          >;
          cardLabel?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Metafield, 'type' | 'value'>
          >;
          cardImage?: StorefrontAPI.Maybe<{
            reference?: StorefrontAPI.Maybe<{
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'height' | 'width' | 'url' | 'altText'
                >
              >;
            }>;
          }>;
        }
      >;
    }>;
  }>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  selectedOptions:
    | Array<StorefrontAPI.SelectedOptionInput>
    | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'title'
      | 'vendor'
      | 'handle'
      | 'descriptionHtml'
      | 'description'
      | 'encodedVariantExistence'
      | 'encodedVariantAvailability'
    > & {
      options: Array<
        Pick<StorefrontAPI.ProductOption, 'name'> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
              firstSelectableVariant?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'availableForSale' | 'id' | 'sku' | 'title'
                > & {
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  image?: StorefrontAPI.Maybe<
                    {__typename: 'Image'} & Pick<
                      StorefrontAPI.Image,
                      'id' | 'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                }
              >;
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
                  image?: StorefrontAPI.Maybe<{
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url'>
                    >;
                  }>;
                }
              >;
            }
          >;
        }
      >;
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
      adjacentVariants: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      images: {
        nodes: Array<
          Pick<
            StorefrontAPI.Image,
            'id' | 'height' | 'width' | 'url' | 'altText'
          >
        >;
      };
      highlights?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              label?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              content?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
            }
          >;
        }>;
      }>;
      certifiedLogos?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<{
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'height' | 'width' | 'url' | 'altText'>
            >;
          }>;
        }>;
      }>;
      showProductHelp?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      productHelp?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            accordion?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                  title?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                  items?: StorefrontAPI.Maybe<{
                    references?: StorefrontAPI.Maybe<{
                      nodes: Array<
                        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                          label?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          content?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                        }
                      >;
                    }>;
                  }>;
                  icon?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MetaobjectField, 'value'>
                  >;
                }
              >;
            }>;
            textBlocksGroup?: StorefrontAPI.Maybe<{
              references?: StorefrontAPI.Maybe<{
                nodes: Array<
                  Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                    title?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    description?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.MetaobjectField, 'value'>
                    >;
                    cta?: StorefrontAPI.Maybe<{
                      reference?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                          label?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          internalUrl?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          externalUrl?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          referencedProduct?: StorefrontAPI.Maybe<{
                            reference?: StorefrontAPI.Maybe<
                              Pick<
                                StorefrontAPI.Product,
                                'id' | 'title' | 'handle'
                              >
                            >;
                          }>;
                          buttonVariant?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          buttonSize?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                          iconVariant?: StorefrontAPI.Maybe<
                            Pick<StorefrontAPI.MetaobjectField, 'value'>
                          >;
                        }
                      >;
                    }>;
                  }
                >;
              }>;
            }>;
          }
        >;
      }>;
      complimentaryShipping?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      cta?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            label?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            internalUrl?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            externalUrl?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            referencedProduct?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
              >;
            }>;
            buttonVariant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            buttonSize?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            iconVariant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }
        >;
      }>;
      modules?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
              label?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              title?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              cards?: StorefrontAPI.Maybe<{
                references?: StorefrontAPI.Maybe<{
                  nodes: Array<
                    Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
                      title?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                      label?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.MetaobjectField, 'value'>
                      >;
                    }
                  >;
                }>;
              }>;
              labels?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MetaobjectField, 'value'>
              >;
              desktopImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
              mobileImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
      ctaExtra?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Metaobject, 'id' | 'type'> & {
            label?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            internalUrl?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            externalUrl?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            referencedProduct?: StorefrontAPI.Maybe<{
              reference?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Product, 'id' | 'title' | 'handle'>
              >;
            }>;
            buttonVariant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            buttonSize?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
            iconVariant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MetaobjectField, 'value'>
            >;
          }
        >;
      }>;
      relatedProducts?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<
            Pick<
              StorefrontAPI.Product,
              'id' | 'handle' | 'title' | 'productType'
            > & {
              featuredImage?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'id' | 'altText' | 'url' | 'width' | 'height'
                >
              >;
              priceRange: {
                minVariantPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                maxVariantPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
              };
              compareAtPriceRange: {
                minVariantPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
                maxVariantPrice: Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >;
              };
              selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'>
              >;
              cardLabel?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.Metafield, 'type' | 'value'>
              >;
              cardImage?: StorefrontAPI.Maybe<{
                reference?: StorefrontAPI.Maybe<{
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'height' | 'width' | 'url' | 'altText'
                    >
                  >;
                }>;
              }>;
            }
          >;
        }>;
      }>;
    }
  >;
};

export type SearchProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'handle' | 'id' | 'publishedAt' | 'title' | 'trackingParameters' | 'vendor'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
      }
    >;
  };

export type SearchPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type SearchArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type PageInfoFragmentFragment = Pick<
  StorefrontAPI.PageInfo,
  'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
>;

export type RegularSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  term: StorefrontAPI.Scalars['String']['input'];
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type RegularSearchQuery = {
  articles: {
    nodes: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  pages: {
    nodes: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'handle'
        | 'id'
        | 'publishedAt'
        | 'title'
        | 'trackingParameters'
        | 'vendor'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PredictiveArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    blog: Pick<StorefrontAPI.Blog, 'handle'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          blog: Pick<StorefrontAPI.Blog, 'handle'>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

export type StoryArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoryArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Article,
          'handle' | 'title' | 'contentHtml' | 'publishedAt'
        > & {
          author?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ArticleAuthor, 'name'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'description' | 'title'>
          >;
        }
      >;
      articles: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'id' | 'title' | 'handle' | 'publishedAt'
          > & {
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
          }
        >;
      };
    }
  >;
};

export type StoriesBlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoriesBlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'title' | 'handle'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
      articles: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
          > & {
            author?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ArticleAuthor, 'name'>
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            blog: Pick<StorefrontAPI.Blog, 'handle'>;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type ArticleItemFragment = Pick<
  StorefrontAPI.Article,
  'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
> & {
  author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, 'name'>>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  blog: Pick<StorefrontAPI.Blog, 'handle'>;
};

interface GeneratedQueryTypes {
  '#graphql\nquery BlogPostsByHandle($handle: String!) {\n  blog(handle: $handle) {\n    articles(first: 25) {\n      nodes {\n        id\n        handle\n        title\n        excerpt\n        contentHtml\n        image {\n          height\n          width\n          url\n          altText\n        }\n        tags\n        caption: metafield(key: "caption", namespace: "custom") {\n          type\n          value\n        }\n      }\n    }\n  }\n}': {
    return: BlogPostsByHandleQuery;
    variables: BlogPostsByHandleQueryVariables;
  };
  '#graphql\n  query BlogArticle(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      articleByHandle(handle: $articleHandle) {\n        handle\n        title\n        contentHtml\n        publishedAt\n        author: authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n        tags\n        excerpt\n        caption: metafield(key: "caption", namespace: "custom") {\n          type\n          value\n        }\n      }\n    }\n  }\n': {
    return: BlogArticleQuery;
    variables: BlogArticleQueryVariables;
  };
  '#graphql\n  # Generic fragments\n  #graphql\n  fragment Cta on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n    buttonVariant: field(key: "button_variant") {\n      value\n    }\n    buttonSize: field(key: "button_size") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n  }\n  #graphql\n  fragment AccordionItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    content: field(key: "content") {\n      value\n    }\n  }\n  #graphql\n  fragment TextBlockWithCta on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ...Cta\n      }\n    }\n  }\n\n  # Module fragments\n  #graphql\n  fragment Accordion on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ...AccordionItem\n        }\n      }\n    }\n    icon: field(key: "icon") {\n      value\n    }\n  }\n  #graphql\n  fragment HeroTextBlocksGroup on Metaobject {\n    id\n    type\n    blocks: field(key: "blocks") {\n      references(first: 10) {\n        nodes {\n          ...TextBlockWithCta\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n  #graphql\n  fragment HeroAccordionsGroup on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    accordions: field(key: "accordions") {\n      references(first: 20) {\n        nodes {\n          ...Accordion\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n  \n  query ContactUsPageCms($handle: String!) {\n    contactUsPage: metaobject(handle: {handle: $handle, type: "contact_us_page"}) {\n      id\n      handle\n      modules: field(key: "modules") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n              # Module fragments\n              ...HeroAccordionsGroup\n              ...HeroTextBlocksGroup\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: ContactUsPageCmsQuery;
    variables: ContactUsPageCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment Image on MediaImage {\n    image {\n      height\n      width\n      url\n      altText\n    }\n  }\n\n  #graphql\n  fragment CustomMenuItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n    icon: field(key: "icon") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    border: field(key: "border") {\n      value\n    }\n  }\n  #graphql\n  fragment MenuGroup on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...CustomMenuItem\n          }\n        }\n      }\n    }\n  }\n\n  query FooterMenuCms($handle: String!) {\n    footerMenu: metaobject(handle: {handle: $handle, type: "global_footer_menu"}) {\n      id\n      handle\n      caption: field(key: "caption") {\n        value\n      }\n      groups: field(key: "groups") {\n        references(first: 10) {\n          nodes {\n            ... on Metaobject {\n                ...MenuGroup\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: FooterMenuCmsQuery;
    variables: FooterMenuCmsQueryVariables;
  };
  '#graphql\n  query GlobalBannerCms($handle: String!) {\n    globalBanner: metaobject(handle: {handle: $handle, type: "global_banner"}) {\n      id\n      handle\n      display: field(key: "display") {\n        value\n      }\n      content: field(key: "content") {\n        value\n      }\n    }\n  }\n': {
    return: GlobalBannerCmsQuery;
    variables: GlobalBannerCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment Image on MediaImage {\n    image {\n      height\n      width\n      url\n      altText\n    }\n  }\n\n  #graphql\n  fragment CustomMenuItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n    icon: field(key: "icon") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    border: field(key: "border") {\n      value\n    }\n  }\n\n  query GlobalDesktopHeaderCms($handle: String!) {\n    globalDesktopHeader: metaobject(handle: {handle: $handle, type: "global_desktop_header"}) {\n      id\n      handle\n      items: field(key: "items") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              ...CustomMenuItem\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: GlobalDesktopHeaderCmsQuery;
    variables: GlobalDesktopHeaderCmsQueryVariables;
  };
  '#graphql\n  query GlobalNewsletterPopupCms($handle: String!) {\n    globalNewsletterPopup: metaobject(handle: {handle: $handle, type: "global_newsletter_popup"}) {\n      id\n      handle\n      display: field(key: "display") {\n        value\n      }\n      image: field(key: "image") {\n        reference {\n          ... on MediaImage {\n            image {\n              height\n              width\n              url\n              altText\n            }\n          }\n        }\n      }\n      title: field(key: "title") {\n        value\n      }\n      description: field(key: "description") {\n        value\n      }\n      caption: field(key: "caption") {\n        value\n      }\n    }\n  }\n': {
    return: GlobalNewsletterPopupCmsQuery;
    variables: GlobalNewsletterPopupCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment Image on MediaImage {\n    image {\n      height\n      width\n      url\n      altText\n    }\n  }\n\n  #graphql\n  fragment SocialMediaPlatform on Metaobject {\n    id\n    type\n    name: field(key: "name") {\n      value\n    }\n    logo: field(key: "logo") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    url: field(key: "url") {\n      value\n    }\n  }\n\n  query GlobalSocialMediasCms($handle: String!) {\n    globalSocialMedias: metaobject(handle: {handle: $handle, type: "global_social_medias"}) {\n      id\n      handle\n      label: field(key: "label") {\n        value\n      }\n      platforms: field(key: "platforms") {\n        references(first: 10) {\n          nodes {\n            ... on Metaobject {\n                ...SocialMediaPlatform\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: GlobalSocialMediasCmsQuery;
    variables: GlobalSocialMediasCmsQueryVariables;
  };
  '#graphql\n  # Generic fragments\n  #graphql\n  fragment Image on MediaImage {\n    image {\n      height\n      width\n      url\n      altText\n    }\n  }\n\n  #graphql\n  fragment Cta on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n    buttonVariant: field(key: "button_variant") {\n      value\n    }\n    buttonSize: field(key: "button_size") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n  }\n  #graphql\n  fragment CarouselItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    caption: field(key: "caption") {\n      value\n    }\n    logo: field(key: "logo") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    image: field(key: "image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    layout: field(key: "layout") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n  #graphql\n  fragment IngredientItem on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n  }\n  #graphql\n  fragment ProductFeatureCard on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    label: field(key: "label") {\n      value\n    }\n  }\n  #graphql\n  fragment SliderItem on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    label: field(key: "label") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n  }\n\n  # Module fragments\n  #graphql\n  fragment HeroImageWithCta on Metaobject {\n    id\n    type\n    desktopImage: field(key: "desktop_image") {\n      references(first: 2) {\n        nodes {\n          ... on MediaImage {\n            ...Image\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      references(first: 2) {\n        nodes {\n          ... on MediaImage {\n            ...Image\n          }\n        }\n      }\n    }\n    desktopHeight: field(key: "desktop_height") {\n      value\n    }\n    mobileHeight: field(key: "mobile_height") {\n      value\n    }\n    title: field(key: "title") {\n      value\n    }\n    subtitle: field(key: "subtitle") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    contentGradient: field(key: "content_gradient") {\n      value\n    }\n    contentPosition: field(key: "content_position") {\n      value\n    }\n    contentOffset: field(key: "content_offset") {\n      value\n    }\n    contentColor: field(key: "content_color") {\n      value\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroCarousel on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...CarouselItem\n          }\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroFeatured on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    platforms: field(key: "platforms") {\n      references(first: 20) {\n        nodes {\n          ... on MediaImage {\n            ...Image\n          }\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroIngredients on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    logo: field(key: "logo") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    rotateLogo: field(key: "rotate_logo") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    desktopHeight: field(key: "desktop_height") {\n      value\n    }\n    mobileHeight: field(key: "mobile_height") {\n      value\n    }\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...IngredientItem\n          }\n        }\n      }\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroSlider on Metaobject {\n    id\n    type\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...SliderItem\n          }\n        }\n      }\n    }\n    desktopHeight: field(key: "desktop_height") {\n      value\n    }\n    mobileHeight: field(key: "mobile_height") {\n      value\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment ProductBenefits on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    title: field(key: "title") {\n      value\n    }\n    cards: field(key: "cards") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...ProductFeatureCard\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment ProductCores on Metaobject {\n    id\n    type\n    labels: field(key: "labels") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n  }\n\n  \n  query HomePageCms($handle: String!) {\n    homePage: metaobject(handle: {handle: $handle, type: "home_page"}) {\n      id\n      handle\n      modules: field(key: "modules") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n              # Module fragments\n              ...HeroImageWithCta\n              ...HeroCarousel\n              ...HeroFeatured\n              ...HeroIngredients\n              ...HeroSlider\n              ...ProductBenefits\n              ...ProductCores\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: HomePageCmsQuery;
    variables: HomePageCmsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment Image on MediaImage {\n    image {\n      height\n      width\n      url\n      altText\n    }\n  }\n\n  #graphql\n  fragment CustomMenuItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n    icon: field(key: "icon") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    border: field(key: "border") {\n      value\n    }\n  }\n\n  query MobileMenuCms($handle: String!) {\n    mobileMenu: metaobject(handle: {handle: $handle, type: "global_mobile_menu"}) {\n      id\n      handle\n      items: field(key: "items") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              ...CustomMenuItem\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: MobileMenuCmsQuery;
    variables: MobileMenuCmsQueryVariables;
  };
  '#graphql\n  # Generic fragments\n  #graphql\n  fragment Image on MediaImage {\n    image {\n      height\n      width\n      url\n      altText\n    }\n  }\n\n  #graphql\n  fragment Cta on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n    buttonVariant: field(key: "button_variant") {\n      value\n    }\n    buttonSize: field(key: "button_size") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n  }\n  #graphql\n  fragment CarouselItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    caption: field(key: "caption") {\n      value\n    }\n    logo: field(key: "logo") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    image: field(key: "image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    layout: field(key: "layout") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n  #graphql\n  fragment IngredientItem on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n  }\n  #graphql\n  fragment ProductFeatureCard on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    label: field(key: "label") {\n      value\n    }\n  }\n  #graphql\n  fragment SliderItem on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    label: field(key: "label") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n  }\n\n  # Module fragments\n  #graphql\n  fragment HeroImageWithCta on Metaobject {\n    id\n    type\n    desktopImage: field(key: "desktop_image") {\n      references(first: 2) {\n        nodes {\n          ... on MediaImage {\n            ...Image\n          }\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      references(first: 2) {\n        nodes {\n          ... on MediaImage {\n            ...Image\n          }\n        }\n      }\n    }\n    desktopHeight: field(key: "desktop_height") {\n      value\n    }\n    mobileHeight: field(key: "mobile_height") {\n      value\n    }\n    title: field(key: "title") {\n      value\n    }\n    subtitle: field(key: "subtitle") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    contentGradient: field(key: "content_gradient") {\n      value\n    }\n    contentPosition: field(key: "content_position") {\n      value\n    }\n    contentOffset: field(key: "content_offset") {\n      value\n    }\n    contentColor: field(key: "content_color") {\n      value\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroCarousel on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...CarouselItem\n          }\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroFeatured on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    platforms: field(key: "platforms") {\n      references(first: 20) {\n        nodes {\n          ... on MediaImage {\n            ...Image\n          }\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroIngredients on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    logo: field(key: "logo") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    rotateLogo: field(key: "rotate_logo") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    desktopHeight: field(key: "desktop_height") {\n      value\n    }\n    mobileHeight: field(key: "mobile_height") {\n      value\n    }\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...IngredientItem\n          }\n        }\n      }\n    }\n    cta: field(key: "cta") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment HeroSlider on Metaobject {\n    id\n    type\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...SliderItem\n          }\n        }\n      }\n    }\n    desktopHeight: field(key: "desktop_height") {\n      value\n    }\n    mobileHeight: field(key: "mobile_height") {\n      value\n    }\n    anchor: field(key: "anchor") {\n      reference {\n        ... on Product {\n          id\n          title\n          handle\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment ProductBenefits on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    title: field(key: "title") {\n      value\n    }\n    cards: field(key: "cards") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...ProductFeatureCard\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment ProductCores on Metaobject {\n    id\n    type\n    labels: field(key: "labels") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n  }\n\n  \n  query OriginsPageCms($handle: String!) {\n    originsPage: metaobject(handle: {handle: $handle, type: "origins_page"}) {\n      id\n      handle\n      modules: field(key: "modules") {\n        references(first: 20) {\n          nodes {\n            ... on Metaobject {\n              id\n              type\n              # Module fragments\n              ...HeroImageWithCta\n              ...HeroCarousel\n              ...HeroFeatured\n              ...HeroIngredients\n              ...HeroSlider\n              ...ProductBenefits\n              ...ProductCores\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: OriginsPageCmsQuery;
    variables: OriginsPageCmsQueryVariables;
  };
  '#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  '#graphql\n  query Footer(\n    $country: CountryCode\n    $footerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment MoneyProductItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductItem\n      }\n      maxVariantPrice {\n        ...MoneyProductItem\n      }\n    }\n    cardLabel: metafield(key: "card_label", namespace: "custom") {\n      type\n      value\n    }\n    cardImage: metafield(key: "card_image", namespace: "custom") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n  query Collection(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ProductItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n      }\n    }\n  }\n': {
    return: CollectionQuery;
    variables: CollectionQueryVariables;
  };
  '#graphql\n  query Catalog(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...CollectionItem\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment MoneyCollectionItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment CollectionItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n    selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n      id\n      availableForSale\n    }\n    productType\n    cardLabel: metafield(key: "card_label", namespace: "custom") {\n      type\n      value\n    }\n    cardImage: metafield(key: "card_image", namespace: "custom") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n': {
    return: CatalogQuery;
    variables: CatalogQueryVariables;
  };
  '#graphql\n  query PolicyArticle(\n    $articleHandle: String!\n    $blogHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      articleByHandle(handle: $articleHandle) {\n        title\n        contentHtml\n        seo {\n          title\n          description\n        }\n      }\n    }\n  }\n': {
    return: PolicyArticleQuery;
    variables: PolicyArticleQueryVariables;
  };
  '#graphql\n  query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n  #graphql\n  fragment Product on Product {\n    id\n    title\n    vendor\n    handle\n    descriptionHtml\n    description\n    encodedVariantExistence\n    encodedVariantAvailability\n    options {\n      name\n      optionValues {\n        name\n        firstSelectableVariant {\n          ...ProductVariant\n        }\n        swatch {\n          color\n          image {\n            previewImage {\n              url\n            }\n          }\n        }\n      }\n    }\n    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n      ...ProductVariant\n    }\n    adjacentVariants (selectedOptions: $selectedOptions) {\n      ...ProductVariant\n    }\n    seo {\n      description\n      title\n    }\n    images(first: 10) { \n      nodes {\n        id\n        height\n        width\n        url\n        altText\n      }\n    }\n    highlights: metafield(namespace: "custom", key: "highlights") {\n       references(first: 10) {\n        nodes {\n          ... on Metaobject {\n            ...AccordionItem\n          }\n        }\n      }\n    }\n    certifiedLogos: metafield(namespace: "custom", key: "certified_logos") {\n      references(first: 10) {\n        nodes {\n          ... on MediaImage {\n            ...Image\n          }\n        }\n      }\n    }\n    showProductHelp: metafield(namespace: "custom", key: "show_product_help") {\n      value\n    }\n    productHelp: metafield(namespace: "custom", key: "product_help") {\n      reference {\n        ... on Metaobject {\n          ...ProductHelp\n        }\n      }\n    }\n    complimentaryShipping: metafield(namespace: "custom", key: "complimentary_shipping") {\n      value\n    }\n    cta: metafield(namespace: "custom", key: "cta") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    modules: metafield(namespace: "custom", key: "modules") {\n      references(first: 10) {\n        nodes {\n          ... on Metaobject {\n            id\n            type\n            # Module fragments\n            ...ProductBenefits\n            ...ProductCores\n          }\n        }\n      }\n    }\n    ctaExtra: metafield(namespace: "custom", key: "cta_extra") {\n      reference {\n        ... on Metaobject {\n          ...Cta\n        }\n      }\n    }\n    relatedProducts: metafield(namespace: "custom", key: "related_products") {\n      references(first: 10) {\n        nodes {\n          ... on Product {\n            ...CollectionItem\n          }\n        }\n      }\n    }\n  }\n  #graphql\n  fragment ProductVariant on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n  }\n\n  #graphql\n  fragment AccordionItem on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    content: field(key: "content") {\n      value\n    }\n  }\n  #graphql\n  fragment ProductFeatureCard on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    label: field(key: "label") {\n      value\n    }\n  }\n  #graphql\n  fragment ProductBenefits on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    title: field(key: "title") {\n      value\n    }\n    cards: field(key: "cards") {\n      references(first: 20) {\n        nodes {\n          ... on Metaobject {\n            ...ProductFeatureCard\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment Image on MediaImage {\n    image {\n      height\n      width\n      url\n      altText\n    }\n  }\n\n  #graphql\n  fragment ProductCores on Metaobject {\n    id\n    type\n    labels: field(key: "labels") {\n      value\n    }\n    desktopImage: field(key: "desktop_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n    mobileImage: field(key: "mobile_image") {\n      reference {\n        ... on MediaImage {\n          ...Image\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment Accordion on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    items: field(key: "items") {\n      references(first: 20) {\n        nodes {\n          ...AccordionItem\n        }\n      }\n    }\n    icon: field(key: "icon") {\n      value\n    }\n  }\n  #graphql\n  fragment Cta on Metaobject {\n    id\n    type\n    label: field(key: "label") {\n      value\n    }\n    internalUrl: field(key: "internal_url") {\n      value\n    }\n    externalUrl: field(key: "external_url") {\n      value\n    }\n    referencedProduct: field(key: "referenced_product") {\n      reference {\n        ... on Product{\n          id\n          title\n          handle\n        }\n      }\n    }\n    buttonVariant: field(key: "button_variant") {\n      value\n    }\n    buttonSize: field(key: "button_size") {\n      value\n    }\n    iconVariant: field(key: "icon_variant") {\n      value\n    }\n  }\n  #graphql\n  fragment TextBlockWithCta on Metaobject {\n    id\n    type\n    title: field(key: "title") {\n      value\n    }\n    description: field(key: "description") {\n      value\n    }\n    cta: field(key: "cta") {\n      reference {\n        ...Cta\n      }\n    }\n  }\n  #graphql\n  fragment ProductHelp on Metaobject {\n    id\n    type\n    accordion: field(key: "accordion") {\n      reference {\n        ... on Metaobject {\n          ...Accordion\n        }\n      }\n    }\n    textBlocksGroup: field(key: "text_blocks_group") {\n      references(first: 10) {\n        nodes {\n          ... on Metaobject {\n            ...TextBlockWithCta\n          }\n        }\n      }\n    }\n  }\n\n  #graphql\n  fragment MoneyCollectionItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment CollectionItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n    compareAtPriceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n    selectedOrFirstAvailableVariant(ignoreUnknownOptions: true) {\n      id\n      availableForSale\n    }\n    productType\n    cardLabel: metafield(key: "card_label", namespace: "custom") {\n      type\n      value\n    }\n    cardImage: metafield(key: "card_image", namespace: "custom") {\n      reference {\n        ... on MediaImage {\n          image {\n            height\n            width\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query RegularSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $term: String!\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    articles: search(\n      query: $term,\n      types: [ARTICLE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Article {\n          ...SearchArticle\n        }\n      }\n    }\n    pages: search(\n      query: $term,\n      types: [PAGE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Page {\n          ...SearchPage\n        }\n      }\n    }\n    products: search(\n      after: $endCursor,\n      before: $startCursor,\n      first: $first,\n      last: $last,\n      query: $term,\n      sortKey: RELEVANCE,\n      types: [PRODUCT],\n      unavailableProducts: HIDE,\n    ) {\n      nodes {\n        ...on Product {\n          ...SearchProduct\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  #graphql\n  fragment SearchProduct on Product {\n    __typename\n    handle\n    id\n    publishedAt\n    title\n    trackingParameters\n    vendor\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n      compareAtPrice {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n  #graphql\n  fragment SearchPage on Page {\n     __typename\n     handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment SearchArticle on Article {\n    __typename\n    handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment PageInfoFragment on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n\n': {
    return: RegularSearchQuery;
    variables: RegularSearchQueryVariables;
  };
  '#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...PredictiveProduct\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    blog {\n      handle\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
  '#graphql\n  query StoryArticle(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      articleByHandle(handle: $articleHandle) {\n        handle\n        title\n        contentHtml\n        publishedAt\n        author: authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n      }\n      articles(first: 4) {\n        nodes {\n          id\n          title\n          handle\n          publishedAt\n          image {\n            id\n            altText\n            url\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n': {
    return: StoryArticleQuery;
    variables: StoryArticleQueryVariables;
  };
  '#graphql\n  query StoriesBlog(\n    $language: LanguageCode\n    $blogHandle: String!\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      title\n      handle\n      seo {\n        title\n        description\n      }\n      articles(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ArticleItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n      }\n    }\n  }\n  fragment ArticleItem on Article {\n    author: authorV2 {\n      name\n    }\n    contentHtml\n    handle\n    id\n    image {\n      id\n      altText\n      url\n      width\n      height\n    }\n    publishedAt\n    title\n    blog {\n      handle\n    }\n  }\n': {
    return: StoriesBlogQuery;
    variables: StoriesBlogQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
