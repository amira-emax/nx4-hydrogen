import {redirect, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/account.orders.$id';
import {Money, Image} from '@shopify/hydrogen';
import type {
  OrderLineItemFullFragment,
  OrderQuery,
} from 'customer-accountapi.generated';
import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {Button} from '~/components/ui/button';
import {ChevronLeft} from 'lucide-react';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Order ${data?.order?.name}`}];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const {data, errors}: {data: OrderQuery; errors?: Array<{message: string}>} =
    await customerAccount.query(CUSTOMER_ORDER_QUERY, {
      variables: {
        orderId,
        language: customerAccount.i18n.language,
      },
    });

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const {order} = data;

  // Extract line items directly from nodes array
  const lineItems = order.lineItems.nodes;

  // Extract discount applications directly from nodes array
  const discountApplications = order.discountApplications.nodes;

  // Get fulfillment status from first fulfillment node
  const fulfillmentStatus = order.fulfillments.nodes[0]?.status ?? 'N/A';

  // Get first discount value with proper type checking
  const firstDiscount = discountApplications[0]?.value;

  // Type guard for MoneyV2 discount
  const discountValue =
    firstDiscount?.__typename === 'MoneyV2'
      ? (firstDiscount as Extract<
          typeof firstDiscount,
          {__typename: 'MoneyV2'}
        >)
      : null;

  // Type guard for percentage discount
  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue'
      ? (
          firstDiscount as Extract<
            typeof firstDiscount,
            {__typename: 'PricingPercentageValue'}
          >
        ).percentage
      : null;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>();

  // Format the order date
  const orderDate = new Date(order.processedAt!);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col gap-4 pb-[120px] pt-4 md:pt-20 px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col gap-2 items-center text-center py-4 md:py-10">
        <h2 className="text-h2-light">Order {order.name}</h2>
        <p className="text-body-regular text-secondary">
          Placed on {formattedDate} at {formattedTime}
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-secondary">
              <TableHead className="text-caption text-secondary">
                PRODUCT
              </TableHead>
              <TableHead className="text-caption text-secondary">SKU</TableHead>
              <TableHead className="text-caption text-secondary">
                PRICE
              </TableHead>
              <TableHead className="text-caption text-secondary">
                QUANTITY
              </TableHead>
              <TableHead className="text-caption text-secondary text-end">
                TOTAL
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((lineItem, index) => (
              <TableRow
                key={lineItem.id || index}
                className="hover:bg-transparent border-0"
              >
                <TableCell className="text-body-regular">
                  {lineItem.title}
                </TableCell>
                <TableCell className="text-body-regular text-secondary">
                  {lineItem.variantTitle || '-'}
                </TableCell>
                <TableCell className="text-body-regular">
                  <Money data={lineItem.price!} />
                </TableCell>
                <TableCell className="text-body-regular">
                  {lineItem.quantity}
                </TableCell>
                <TableCell className="text-body-regular text-end">
                  <Money data={lineItem.price!} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Summary Section - Desktop */}
        <div className="flex flex-col gap-2 border-t border-secondary py-4 mt-4">
          <div className="flex justify-between">
            <span className="text-caption text-secondary">SUBTOTAL</span>
            <span className="text-body-regular">
              <Money data={order.subtotal!} />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-caption text-secondary">SHIPPING</span>
            <span className="text-body-regular">-</span>
          </div>
          {((discountValue && discountValue.amount) || discountPercentage) && (
            <div className="flex justify-between">
              <span className="text-caption text-secondary">
                PROMO CODE:{' '}
                {discountPercentage ? `${discountPercentage}% OFF` : 'DISCOUNT'}
              </span>
              <span className="text-body-regular">
                {discountPercentage ? (
                  <span>-{discountPercentage}%</span>
                ) : (
                  discountValue && (
                    <span>
                      - <Money data={discountValue} />
                    </span>
                  )
                )}
              </span>
            </div>
          )}
        </div>

        {/* Total - Desktop */}
        <div className="flex justify-between border-t border-secondary py-4">
          <span className="text-caption text-secondary">TOTAL</span>
          <span className="text-body-regular">
            <Money data={order.totalPrice!} />
          </span>
        </div>

        {/* Addresses and Back Button - Desktop */}
        <div className="grid grid-cols-3 gap-8 border-t border-secondary pt-10 mt-4">
          {/* Billing Address */}
          <div className="flex flex-col gap-2">
            <h3 className="text-caption text-secondary">BILLING ADDRESS</h3>
            {order?.shippingAddress ? (
              <address className="not-italic flex flex-col gap-1">
                <p className="text-body-regular">
                  {order.shippingAddress.name}
                </p>
                {order.shippingAddress.formatted && (
                  <p className="text-body-regular text-secondary">
                    {order.shippingAddress.formatted.join(', ')}
                  </p>
                )}
              </address>
            ) : (
              <p className="text-body-regular text-secondary">-</p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="flex flex-col gap-2">
            <h3 className="text-caption text-secondary">SHIPPING ADDRESS</h3>
            {order?.shippingAddress ? (
              <address className="not-italic flex flex-col gap-1">
                <p className="text-body-regular">
                  {order.shippingAddress.name}
                </p>
                {order.shippingAddress.formatted && (
                  <p className="text-body-regular text-secondary">
                    {order.shippingAddress.formatted.join(', ')}
                  </p>
                )}
              </address>
            ) : (
              <p className="text-body-regular text-secondary">-</p>
            )}
          </div>

          {/* Back Button */}
          <div className="flex justify-end items-end">
            <Link to="/account/orders">
              <Button variant="box" size="sm">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Line Items - Mobile Cards */}
        {lineItems.map((lineItem, index) => (
          <div
            key={lineItem.id || index}
            className="flex flex-col gap-1 border-b border-secondary pb-4"
          >
            <div className="flex justify-between">
              <span className="text-caption text-secondary">PRODUCT</span>
              <span className="text-body-regular text-end">
                {lineItem.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption text-secondary">SKU</span>
              <span className="text-body-regular text-end">
                {lineItem.variantTitle || '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption text-secondary">PRICE</span>
              <span className="text-body-regular text-end">
                <Money data={lineItem.price!} />
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption text-secondary">QUANTITY</span>
              <span className="text-body-regular text-end">
                {lineItem.quantity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-caption text-secondary">TOTAL</span>
              <span className="text-body-regular text-end">
                <Money data={lineItem.price!} />
              </span>
            </div>
          </div>
        ))}

        {/* Summary Section - Mobile */}
        <div className="flex flex-col gap-2 border-b border-secondary pb-4">
          <div className="flex justify-between">
            <span className="text-caption text-secondary">SUBTOTAL</span>
            <span className="text-body-regular">
              <Money data={order.subtotal!} />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-caption text-secondary">SHIPPING</span>
            <span className="text-body-regular">-</span>
          </div>
          {((discountValue && discountValue.amount) || discountPercentage) && (
            <div className="flex justify-between">
              <span className="text-caption text-secondary">
                PROMO CODE :{' '}
                {discountPercentage ? `${discountPercentage}% OFF` : 'DISCOUNT'}
              </span>
              <span className="text-body-regular">
                {discountPercentage ? (
                  <span>-{discountPercentage}%</span>
                ) : (
                  discountValue && (
                    <span>
                      -<Money data={discountValue} />
                    </span>
                  )
                )}
              </span>
            </div>
          )}
        </div>

        {/* Total - Mobile */}
        <div className="flex justify-between border-b border-secondary pb-4">
          <span className="text-caption text-secondary">TOTAL</span>
          <span className="text-body-regular">
            <Money data={order.totalPrice!} />
          </span>
        </div>

        {/* Billing Address - Mobile */}
        <div className="flex flex-col gap-2 border-b border-secondary pb-4">
          <h3 className="text-caption text-secondary">BILLING ADDRESS</h3>
          {order?.shippingAddress ? (
            <address className="not-italic flex flex-col">
              <p className="text-body-regular">{order.shippingAddress.name}</p>
              {order.shippingAddress.formatted && (
                <p className="text-body-regular text-secondary">
                  {order.shippingAddress.formatted.join(', ')}
                </p>
              )}
            </address>
          ) : (
            <p className="text-body-regular text-secondary">-</p>
          )}
        </div>

        {/* Shipping Address - Mobile */}
        <div className="flex flex-col gap-2 pb-4">
          <h3 className="text-caption text-secondary">SHIPPING ADDRESS</h3>
          {order?.shippingAddress ? (
            <address className="not-italic flex flex-col">
              <p className="text-body-regular">{order.shippingAddress.name}</p>
              {order.shippingAddress.formatted && (
                <p className="text-body-regular text-secondary">
                  {order.shippingAddress.formatted.join(', ')}
                </p>
              )}
            </address>
          ) : (
            <p className="text-body-regular text-secondary">-</p>
          )}
        </div>

        {/* Back Button - Mobile */}
        <div className="flex justify-center pt-4">
          <Link
            to="/account/orders"
            className="text-cta flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
