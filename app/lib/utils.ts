import {clsx, type ClassValue} from 'clsx';
import {extendTailwindMerge} from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-h1',
        'text-h1-allcaps',
        'text-h1-light',
        'text-h2-light',
        'text-h3',
        'text-body-regular',
        'text-body-medium',
        'text-cta',
        'text-caption',
        'text-detail',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

// Helper to ensure unit is present
export const formatHeight = (h?: string) => {
  if (!h) return undefined;
  if (h.includes('vh') || h.includes('px') || h.includes('%')) return h;
  return `${h}px`;
};
