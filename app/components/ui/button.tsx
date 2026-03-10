import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '~/lib/utils';
import {ChevronLeft, ChevronRight, ArrowLeft, ArrowRight} from 'lucide-react';

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-primary text-primary-foreground hover:bg-primary/90',
        box: 'border border-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
        secondary:
          'border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'border border-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'border border-transparent text-primary underline-offset-4 hover:underline',
        inverse:
          'border border-transparent bg-white text-black hover:bg-white/90',
        'box-inverse':
          'border border-white text-white bg-transparent hover:bg-white hover:text-black',
        'ghost-inverse':
          'border border-transparent hover:bg-white/20 text-white',
        'link-inverse':
          'border border-transparent text-white underline-offset-4 hover:underline',
        filled:
          'border border-transparent bg-strong text-accent hover:bg-primary',
        destructive:
          'border border-transparent bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      },
      size: {
        default: 'h-auto px-6 py-3 text-h3 has-[>svg]:px-4',
        sm: 'h-auto px-4 py-2 text-cta gap-1.5 has-[>svg]:px-3',
        md: 'h-auto px-6 py-3 text-h3 has-[>svg]:px-4',
        // lg: 'h-10 px-8 text-h3 has-[>svg]:px-4',
        icon: 'size-9',
        // 'icon-sm': 'size-8',
        // 'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  leftIcon,
  rightIcon,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    leftIcon?: boolean;
    rightIcon?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({variant, size, className}))}
      {...props}
    >
      {leftIcon && (
        <span className="relative flex items-center justify-center size-4">
          <ChevronLeft className="size-4 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-1" />
          <ArrowLeft className="absolute size-4 transition-all duration-300 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0" />
        </span>
      )}
      {props.children}
      {rightIcon && (
        <span className="relative flex items-center justify-center size-4">
          <ChevronRight className="size-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-1" />
          <ArrowRight className="absolute size-4 transition-all duration-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0" />
        </span>
      )}
    </Comp>
  );
}

export {Button, buttonVariants};
