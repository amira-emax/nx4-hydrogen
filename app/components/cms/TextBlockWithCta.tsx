import CtaButton from '~/components/cms/CtaButton';
import type {TextBlockWithCtaFragment} from 'types/storefrontapi.generated';

interface TextBlockWithCtaProps {
  block: TextBlockWithCtaFragment;
  className?: string;
}

export function TextBlockWithCta({
  block,
  className = '',
}: TextBlockWithCtaProps) {
  const {title, description, cta} = block;
  const hasCta = cta?.reference;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}
    >
      {/* Title */}
      {title?.value && (
        <h3
          className={`
            text-caption tracking-[2.3px]
            ${hasCta ? 'mb-4' : 'mb-2'}
          `}
        >
          {title.value}
        </h3>
      )}

      {/* Description */}
      {description?.value && (
        <div className="text-body-regular max-w-[480px] mb-4 whitespace-pre-line">
          <p>{description.value}</p>
        </div>
      )}

      {/* CTA */}
      {cta?.reference && (
        <div className="mt-2">
          <CtaButton reference={cta.reference} variant="box" />
        </div>
      )}
    </div>
  );
}
