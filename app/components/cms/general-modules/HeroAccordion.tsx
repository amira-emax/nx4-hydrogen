import {MinusIcon, PlusIcon} from 'lucide-react';
import type {
  AccordionFragment,
  AccordionItemFragment,
} from 'types/storefrontapi.generated';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

interface HeroAccordionProps {
  data: AccordionFragment;
}

export default function HeroAccordion({data}: HeroAccordionProps) {
  const {title, items} = data;
  const accordionItems = items?.references?.nodes || [];

  return (
    <div className="w-full max-w-[720px] flex flex-col gap-2">
      {/* Section Title (e.g. Product & Consumption) */}
      {title?.value && (
        <h4 className="text-body-regular font-medium text-secondary">
          {title.value}
        </h4>
      )}

      {/* Accordion List */}
      <Accordion type="multiple" className="w-full">
        {accordionItems.map((item) => {
          const accItem = item as AccordionItemFragment;
          return (
            <AccordionItem
              key={accItem.id}
              value={accItem.id}
              className="border-b border-black/10"
            >
              <AccordionTrigger className="hover:no-underline py-4 [&>svg:last-child]:hidden group">
                <span className="text-caption tracking-[1.35px] text-left">
                  {accItem.label?.value}
                </span>

                {/* Custom Icons Swapping based on state */}
                <span className="ml-4 shrink-0 transition-transform duration-200">
                  <PlusIcon className="w-3 h-3 group-data-[state=open]:hidden" />
                  <MinusIcon className="w-3 h-3 hidden group-data-[state=open]:block" />
                </span>
              </AccordionTrigger>

              <AccordionContent>
                {accItem.content?.value && (
                  <div className="text-body-regular text-black/80 whitespace-pre-line mb-6">
                    {accItem.content.value}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
