import {
  flattenConnection,
  getPaginationVariables,
  Money,
  Pagination,
} from '@shopify/hydrogen';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from 'customer-accountapi.generated';
import {Link, useLoaderData} from 'react-router';
import {Button} from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
import {
  buildOrderSearchQuery,
  parseOrderFilters,
  type OrderFilterParams,
} from '~/lib/orderFilters';
import type {Route} from './+types/account.orders._index';

type OrdersLoaderData = {
  customer: CustomerOrdersFragment;
  filters: OrderFilterParams;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Orders'}];
};

export async function loader({request, context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const url = new URL(request.url);
  const filters = parseOrderFilters(url.searchParams);
  const query = buildOrderSearchQuery(filters);

  const {data, errors} = await customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
      query,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return {customer: data.customer, filters};
}

export default function Orders() {
  const {customer, filters} = useLoaderData<OrdersLoaderData>();
  const {orders} = customer;
  const hasFilters = !!(filters.name || filters.confirmationNumber);

  return (
    <div className="flex flex-col items-center gap-10 pt-10 w-full">
      {/* Order History Section */}
      <div className="flex flex-col items-center gap-6 w-full px-6 md:px-10">
        <h3 className="text-h2-light text-center">Order History</h3>

        {orders?.nodes.length ? (
          <OrdersContent orders={orders} />
        ) : (
          <EmptyOrders hasFilters={hasFilters} />
        )}
      </div>
    </div>
  );
}

function OrdersContent({orders}: {orders: CustomerOrdersFragment['orders']}) {
  return (
    <div className="w-full max-w-4xl" aria-live="polite">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <OrdersTable orders={orders} />
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <OrdersCards orders={orders} />
      </div>
    </div>
  );
}

function OrdersTable({orders}: {orders: CustomerOrdersFragment['orders']}) {
  return (
    <Pagination connection={orders}>
      {({nodes, isLoading, PreviousLink, NextLink}) => (
        <div>
          <PreviousLink className="text-body-regular text-center block mb-4">
            {isLoading ? 'Loading...' : '↑ Load previous'}
          </PreviousLink>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-caption">ORDER</TableHead>
                <TableHead className="text-caption">DATE</TableHead>
                <TableHead className="text-caption">CONFIRMATION</TableHead>
                <TableHead className="text-caption">PAYMENT</TableHead>
                <TableHead className="text-caption">SHIPPING</TableHead>
                <TableHead className="text-caption">TOTAL</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodes.map((order: OrderItemFragment) => (
                <OrderTableRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
          <NextLink className="text-body-regular text-center block mt-4">
            {isLoading ? 'Loading...' : 'Load more ↓'}
          </NextLink>
        </div>
      )}
    </Pagination>
  );
}

function OrderTableRow({order}: {order: OrderItemFragment}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  const formattedDate = new Date(order.processedAt).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
  );

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className="text-start text-body-regular">
        #{order.number}
      </TableCell>
      <TableCell className="text-start text-body-regular">
        {formattedDate}
      </TableCell>
      <TableCell className="text-start text-body-regular">
        {order.confirmationNumber || '-'}
      </TableCell>
      <TableCell className="text-start text-body-regular capitalize">
        {order.financialStatus?.toLowerCase()}
      </TableCell>
      <TableCell className="text-start text-body-regular capitalize">
        {fulfillmentStatus?.toLowerCase() || 'Pending'}
      </TableCell>
      <TableCell className="text-start text-body-regular">
        <Money data={order.totalPrice} />
      </TableCell>
      <TableCell>
        <Link to={`/account/orders/${btoa(order.id)}`}>
          <Button variant="box" size="sm">
            View
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}

function OrdersCards({orders}: {orders: CustomerOrdersFragment['orders']}) {
  return (
    <Pagination connection={orders}>
      {({nodes, isLoading, PreviousLink, NextLink}) => (
        <div>
          <PreviousLink className="text-body-regular text-center block mb-4">
            {isLoading ? 'Loading...' : '↑ Load previous'}
          </PreviousLink>
          <div className="flex flex-col gap-6">
            {nodes.map((order: OrderItemFragment) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          <NextLink className="text-body-regular text-center block mt-4">
            {isLoading ? 'Loading...' : 'Load more ↓'}
          </NextLink>
        </div>
      )}
    </Pagination>
  );
}

function OrderCard({order}: {order: OrderItemFragment}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  const formattedDate = new Date(order.processedAt).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    },
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Order Details */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="text-caption">ORDER</span>
          <span className="text-body-regular">#{order.number}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-caption">DATE</span>
          <span className="text-body-regular">{formattedDate}</span>
        </div>
        {order.confirmationNumber && (
          <div className="flex justify-between">
            <span className="text-caption">CONFIRMATION</span>
            <span className="text-body-regular">
              {order.confirmationNumber}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-caption">PAYMENT</span>
          <span className="text-body-regular capitalize">
            {order.financialStatus?.toLowerCase()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-caption">SHIPPING</span>
          <span className="text-body-regular capitalize">
            {fulfillmentStatus?.toLowerCase() || 'Pending'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-caption">TOTAL</span>
          <span className="text-body-regular">
            <Money data={order.totalPrice} />
          </span>
        </div>
      </div>

      {/* View Button */}
      <Link to={`/account/orders/${btoa(order.id)}`} className="w-full">
        <Button variant="box" size="sm" className="w-full">
          View
        </Button>
      </Link>
    </div>
  );
}

function EmptyOrders({hasFilters = false}: {hasFilters?: boolean}) {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      {hasFilters ? (
        <>
          <p className="text-body-regular text-secondary text-center">
            No orders found matching your search.
          </p>
          <Link to="/account/orders">
            <Button variant="link" size="sm">
              Clear filters
            </Button>
          </Link>
        </>
      ) : (
        <>
          <p className="text-body-regular text-secondary text-center">
            You haven&apos;t placed any orders yet.
          </p>
          <Link to="/collections/all">
            <Button variant="box" size="sm">
              Start Shopping
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
