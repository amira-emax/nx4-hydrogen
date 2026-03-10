import type {HeroTextBlocksGroupFragment} from 'types/storefrontapi.generated';
import {TextBlockWithCta} from '../TextBlockWithCta';

interface HeroTextBlocksGroupProps {
  data: HeroTextBlocksGroupFragment;
}

export default function HeroTextBlocksGroup({data}: HeroTextBlocksGroupProps) {
  const {blocks} = data;
  const blockNodes = blocks?.references?.nodes || [];
  const anchorId = data.anchor?.reference?.handle;

  if (blockNodes.length === 0) return null;

  return (
    <div
      id={anchorId || undefined}
      className="bg-subtle w-full py-[64px] px-6 md:py-[120px] md:px-[56px] flex flex-col items-center"
    >
      <div className="w-full flex flex-col items-center gap-[40px]">
        {blockNodes.map((block) => {
          // Cast to any because the Union type might not automatically infer safely in loop without check,
          // but we know it matches the fragment we expect.
          const textBlock = block as any;

          return (
            <TextBlockWithCta
              key={textBlock.id}
              block={textBlock}
              className="w-full"
            />
          );
        })}
      </div>
    </div>
  );
}
