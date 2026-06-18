import {type FetcherWithComponents} from 'react-router';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {Button} from '~/components/ui/button';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
  variant = 'secondary',
  page,
  productInfo,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  className?: string;
  variant?:
    | 'default'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'box'
    | 'inverse'
    | 'box-inverse'
    | 'filled';
  page?: string;
  productInfo?: {
    id: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    currency: string;
  };
}) {
  function handleClick() {
    if (productInfo) {
      const info = {
        id: productInfo.id,
        name: productInfo.name,
        variant: productInfo.variant,
        price: productInfo.price,
        quantity: productInfo.quantity,
        currency: productInfo.currency,
      };

      window.dataLayer = window.dataLayer || [];
      const payload = {
        event: 'add_to_cart',
        eventPage: page ?? 'unknown',
        details: info,
        product_id: info.id,
        currency: info.currency,
        quantity: info.quantity,
      };
      console.log('[DataLayer] add_to_cart', payload);
      window.dataLayer.push(payload);
    }
    onClick?.();
  }

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <Button
            type="submit"
            onClick={handleClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            variant={variant}
            className={className}
          >
            {children}
          </Button>
        </>
      )}
    </CartForm>
  );
}
