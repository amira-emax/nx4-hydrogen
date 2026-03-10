import type {HeroAccordionsGroupFragment} from 'types/storefrontapi.generated';
import HeroAccordion from './HeroAccordion';

interface HeroAccordionsGroupProps {
  data: HeroAccordionsGroupFragment;
}

export default function HeroAccordionsGroup({data}: HeroAccordionsGroupProps) {
  const {title, description, accordions} = data;
  const accordionNodes = accordions?.references?.nodes || [];
  const anchorId = data.anchor?.reference?.handle;

  if (accordionNodes.length === 0) return null;

  return (
    <div
      id={anchorId || undefined}
      className="bg-subtle w-full py-[48px] px-6 md:px-[56px] flex flex-col items-center"
    >
      <div className="w-full flex flex-col items-center max-w-[720px]">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-2 mb-[56px] text-left w-full">
          {title?.value && (
            <h3 className="text-caption tracking-[2.3px]">{title.value}</h3>
          )}
          {description?.value && (
            <p className="text-body-regular tracking-[1.35px]">
              {description.value}
            </p>
          )}
        </div>

        {/* Accordions List */}
        <div className="w-full flex flex-col gap-12">
          {accordionNodes.map((accordion) => {
            const accordionData = accordion as any; // Cast for now, inferred correctly in runtime
            return (
              <HeroAccordion key={accordionData.id} data={accordionData} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
