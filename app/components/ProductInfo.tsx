import {Image, Money, type MappedProductOptions} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {ProductForm} from '~/components/ProductForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import type {ProductFragment} from '../../types/storefrontapi.generated';
import {cn} from '~/lib/utils';
import {Button} from './ui/button';
import {CircleHelp} from 'lucide-react';
import CtaButton from './cms/CtaButton';

type ProductInfoProps = {
  certifiedLogos: ProductFragment['certifiedLogos'];
  highlights: ProductFragment['highlights'];
  title: string;
  price: MoneyV2;
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  descriptionHtml: ProductFragment['descriptionHtml'];
  showProductHelp: ProductFragment['showProductHelp'];
  productHelp: ProductFragment['productHelp'];
  complimentaryShipping: ProductFragment['complimentaryShipping'];
  setIsHelpOpen: (open: boolean) => void;
  cta: ProductFragment['cta'];
};

export function ProductInfo({
  certifiedLogos,
  highlights,
  title,
  price,
  productOptions,
  selectedVariant,
  descriptionHtml,
  showProductHelp,
  productHelp,
  complimentaryShipping,
  setIsHelpOpen,
  cta,
}: ProductInfoProps) {
  return (
    <div
      className={cn(
        // Layout & Spacing
        'flex flex-col gap-6 w-full mx-auto justify-end xl:justify-center',
        'py-[32px] [@media(max-height:728px)]:pt-[32px] px-6',
        'xl:gap-6 xl:px-0',
        'md:pt-0 md:px-8',

        // Grid & Positioning (default: full width at md when short)
        'self-start md:col-span-12',

        // md+: side-by-side layout (Default Desktop)
        'md:col-span-6 md:col-start-7',
        'xl:col-span-4 xl:col-start-8 xl:max-w-[320px]',

        // md + Short: Override to Stacked Layout (Mobile-like)
        'md:[@media(max-height:728px)]:col-span-12',
        'xl:[@media(max-height:728px)]:max-w-full',

        // Sticky & Scroll Behavior (md+: tall only)
        'md:[@media(min-height:728px)]:sticky md:[@media(min-height:728px)]:top-[calc(var(--header-height)+var(--global-banner-height))]',
        'md:[@media(min-height:728px)]:h-[calc(100dvh-(var(--header-height)+var(--global-banner-height)))]',
        'md:[@media(min-height:728px)]:overflow-y-auto no-scrollbar',
      )}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <h3 className="text-foreground text-pretty">{title}</h3>
          <div className="text-h3">
            <Money data={price} withoutTrailingZeros />
          </div>
        </div>
      </div>

      {/* Product Form */}
      <ProductForm
        productOptions={productOptions}
        selectedVariant={selectedVariant}
        complimentaryShipping={complimentaryShipping}
      />

      {/* Description */}
      <div
        className="prose text-body-regular text-muted-foreground"
        dangerouslySetInnerHTML={{__html: descriptionHtml}}
      />

      {/* Highlights Accordion */}
      {highlights?.references?.nodes && (
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {highlights.references.nodes.map((node, index) => {
              if (!node?.label?.value || !node?.content?.value) return null;
              return (
                <AccordionItem key={node.id} value={node.id}>
                  <AccordionTrigger
                    className={cn(
                      'font-medium hover:no-underline',
                      index == (highlights?.references?.nodes?.length ?? 0) - 1
                        ? 'border-b border-border'
                        : '',
                    )}
                  >
                    {node.label.value}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-regular text-muted-foreground whitespace-pre-wrap">
                    {node.content.value}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      )}

      {/* Certified By Section */}
      {certifiedLogos?.references?.nodes && (
        <div className="flex flex-col gap-4">
          <span className="text-caption text-muted-foreground">
            Certified by
          </span>
          <div className="flex gap-2 md:gap-4 items-center w-fit md:w-full">
            {certifiedLogos.references.nodes.map((logo, index) => {
              if (!logo?.image) return null;
              return (
                <div
                  key={index}
                  className="sm:h-[32px] md:h-[40px] xl:h-[64px] min-w-[50px] max-w-[64px]"
                >
                  <Image
                    data={logo.image}
                    draggable={false}
                    sizes="auto"
                    className="object-contain h-full w-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Help & Discover Buttons */}
      <div
        className={cn(
          'w-full flex justify-between items-center',
          'xl:hidden',
          'md:pt-0 md:pb-0',
          'xl:[@media(max-height:728px)]:flex', // Explicitly override xl:hidden when short
        )}
      >
        {showProductHelp?.value === 'true' && productHelp ? (
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsHelpOpen(true)}
            className="gap-2"
          >
            <CircleHelp className="w-4 h-4" />
            Help?
          </Button>
        ) : (
          <div />
        )}
        {cta && (
          <CtaButton reference={cta.reference} variant="link" size="sm" />
        )}
      </div>
    </div>
  );
}
