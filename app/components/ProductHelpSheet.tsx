import {X} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from '~/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import CtaButton from '~/components/cms/CtaButton';
import type {
  AccordionFragment,
  TextBlockWithCtaFragment,
} from '../../types/storefrontapi.generated';
import {AnimatePresence} from 'motion/react';

type ProductHelpSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accordion?: AccordionFragment | null;
  textBlocks?: TextBlockWithCtaFragment[];
};

export function ProductHelpSheet({
  open,
  onOpenChange,
  accordion,
  textBlocks = [],
}: ProductHelpSheetProps) {
  const accordionItems = accordion?.items?.references?.nodes || [];
  const iconVariant = accordion?.icon?.value === 'Plus' ? 'plus' : 'default';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <SheetContent
            forceMount
            side="right"
            className="p-0 gap-0 w-full sm:max-w-md border-0"
          >
            {/* Header */}
            <div className="bg-foreground flex items-center justify-center px-4 py-3 relative">
              <SheetTitle className="text-h3! text-accent text-center">
                Help
              </SheetTitle>
              <SheetClose className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-background hover:opacity-70 transition-opacity">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-[40px]">
              {/* FAQ Accordion */}
              {accordionItems.length > 0 && (
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={accordionItems[0]?.id}
                  className="w-full"
                >
                  {accordionItems.map((item) => {
                    if (!item?.label?.value) return null;
                    return (
                      <AccordionItem
                        key={item.id}
                        value={item.id}
                        className="border-b! border-secondary"
                      >
                        <AccordionTrigger
                          className="text-body-medium hover:no-underline py-2"
                          iconVariant={iconVariant}
                        >
                          {item.label.value}
                        </AccordionTrigger>
                        <AccordionContent className="text-body-regular text-muted-foreground pb-2 whitespace-pre-wrap">
                          {item.content?.value || ''}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}

              {/* OR Divider */}
              {textBlocks.length > 0 && (
                <div className="flex items-center justify-center">
                  <span className="text-caption text-muted-foreground">OR</span>
                </div>
              )}

              {/* Text Blocks (Contact sections) */}
              {textBlocks.map((block) => {
                if (!block?.title?.value) return null;

                return (
                  <div
                    key={block.id}
                    className="flex flex-col items-center text-center gap-4"
                  >
                    <h3 className="text-body-medium">{block.title.value}</h3>
                    {block.description?.value && (
                      <p className="text-body-regular text-muted-foreground whitespace-pre-wrap">
                        {block.description.value}
                      </p>
                    )}
                    <CtaButton
                      reference={block.cta?.reference}
                      variant="box"
                      size="sm"
                      className="min-w-[140px]"
                    />
                  </div>
                );
              })}
            </div>
          </SheetContent>
        )}
      </AnimatePresence>
    </Sheet>
  );
}
