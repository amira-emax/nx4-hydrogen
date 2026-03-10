import {NavLink} from 'react-router';
import {
  Plus,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {type VariantProps} from 'class-variance-authority';
import {Button, type buttonVariants} from '../ui/button';
import type {CtaFragment} from 'types/storefrontapi.generated';

// Define the type for the CTA button props
type CtaButtonProps = {
  reference?: CtaFragment | null;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
};

// Map of icon variants to their components
const iconMap = {
  Plus: Plus,
  ArrowRight: ArrowRight,
  ArrowUpRight: ArrowUpRight,
  ChevronRight: ChevronRight,
  ExternalLink: ExternalLink,
  None: null,
};

// Valid button variant and size keys
const validVariants = [
  'default',
  'box',
  'secondary',
  'ghost',
  'link',
  'inverse',
  'box-inverse',
  'ghost-inverse',
  'link-inverse',
  'filled',
  'destructive',
] as const;

const validSizes = ['default', 'sm', 'md', 'icon'] as const;

/** Parses a CMS variant string (e.g. "Box Inverse") into a valid button variant key (e.g. "box-inverse"). */
function parseButtonVariant(
  value: string | undefined,
): VariantProps<typeof buttonVariants>['variant'] {
  if (!value) return undefined;
  const normalized = value.toLowerCase().replace(/\s+/g, '-');
  return validVariants.includes(normalized as (typeof validVariants)[number])
    ? (normalized as VariantProps<typeof buttonVariants>['variant'])
    : 'default';
}

/** Parses a CMS size string (e.g. "Sm") into a valid button size key (e.g. "sm"). */
function parseButtonSize(
  value: string | undefined,
): VariantProps<typeof buttonVariants>['size'] {
  if (!value) return undefined;
  const normalized = value.toLowerCase().replace(/\s+/g, '-');
  return validSizes.includes(normalized as (typeof validSizes)[number])
    ? (normalized as VariantProps<typeof buttonVariants>['size'])
    : 'default';
}

function CtaButton({
  reference,
  className,
  variant = 'default',
}: CtaButtonProps) {
  // Early return if no reference data
  if (!reference) return null;

  // Handle potentially null fields
  const label = reference.label?.value ?? 'Learn More';
  const internalUrl = reference.internalUrl?.value ?? undefined;
  const externalUrl = reference.externalUrl?.value ?? undefined;
  const productHandle = reference.referencedProduct?.reference?.handle;
  const buttonVariant = parseButtonVariant(
    reference.buttonVariant?.value ?? undefined,
  );
  const buttonSize = parseButtonSize(reference.buttonSize?.value ?? undefined);

  const iconVariant =
    (reference.iconVariant?.value as keyof typeof iconMap) ?? undefined;

  // Determine the URL to use.
  // Priority: Referenced Product > Internal URL > External URL
  let url = '#';
  if (productHandle) {
    url = `/products/${productHandle}`;
  } else if (internalUrl) {
    url = internalUrl;
  } else if (externalUrl) {
    url = externalUrl;
  }

  // Determine if it's an external link
  const isExternal = !productHandle && !internalUrl && !!externalUrl;

  // Get the icon component if specified
  const IconComponent = iconVariant && iconMap[iconVariant];

  // Render button with or without icon
  const buttonContent = (
    <Button
      variant={buttonVariant ?? variant ?? 'default'}
      size={buttonSize ?? 'default'}
      className={className}
    >
      <div className="flex items-center">
        <p className="text-cta">{label}</p>
        {IconComponent && <IconComponent className="ml-2" size={10} />}
      </div>
    </Button>
  );

  // Wrap in NavLink for internal URLs, or use anchor for external
  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return <NavLink to={url}>{buttonContent}</NavLink>;
}

export default CtaButton;
