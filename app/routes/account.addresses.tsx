import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
import type {
  AddressFragment,
  CustomerFragment,
} from 'customer-accountapi.generated';
import {
  data,
  Form,
  Link,
  useActionData,
  useNavigation,
  useOutletContext,
  type Fetcher,
} from 'react-router';
import type {Route} from './+types/account.addresses';
import {
  UPDATE_ADDRESS_MUTATION,
  DELETE_ADDRESS_MUTATION,
  CREATE_ADDRESS_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';
import {Button} from '~/components/ui/button';

export type ActionResponse = {
  addressId?: string | null;
  createdAddress?: AddressFragment;
  defaultAddress?: string | null;
  deletedAddress?: string | null;
  error: Record<AddressFragment['id'], string> | null;
  updatedAddress?: AddressFragment;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Addresses'}];
};

export async function loader({context}: Route.LoaderArgs) {
  context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: Route.ActionArgs) {
  const {customerAccount} = context;

  try {
    const form = await request.formData();

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    // this will ensure redirecting to login never happen for mutatation
    const isLoggedIn = await customerAccount.isLoggedIn();
    if (!isLoggedIn) {
      return data(
        {error: {[addressId]: 'Unauthorized'}},
        {
          status: 401,
        },
      );
    }

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : false;
    const address: CustomerAddressInput = {};
    const keys: (keyof CustomerAddressInput)[] = [
      'address1',
      'address2',
      'city',
      'company',
      'territoryCode',
      'firstName',
      'lastName',
      'phoneNumber',
      'zoneCode',
      'zip',
    ];

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    switch (request.method) {
      case 'POST': {
        // handle new address creation
        try {
          const {data, errors} = await customerAccount.mutate(
            CREATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressCreate?.userErrors?.length) {
            throw new Error(data?.customerAddressCreate?.userErrors[0].message);
          }

          if (!data?.customerAddressCreate?.customerAddress) {
            throw new Error('Customer address create failed.');
          }

          return {
            error: null,
            createdAddress: data?.customerAddressCreate?.customerAddress,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'PUT': {
        // handle address updates
        try {
          const {data, errors} = await customerAccount.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
                defaultAddress,
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressUpdate?.userErrors?.length) {
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
          }

          if (!data?.customerAddressUpdate?.customerAddress) {
            throw new Error('Customer address update failed.');
          }

          return {
            error: null,
            updatedAddress: address,
            defaultAddress,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      case 'DELETE': {
        // handles address deletion
        try {
          const {data, errors} = await customerAccount.mutate(
            DELETE_ADDRESS_MUTATION,
            {
              variables: {
                addressId: decodeURIComponent(addressId),
                language: customerAccount.i18n.language,
              },
            },
          );

          if (errors?.length) {
            throw new Error(errors[0].message);
          }

          if (data?.customerAddressDelete?.userErrors?.length) {
            throw new Error(data?.customerAddressDelete?.userErrors[0].message);
          }

          if (!data?.customerAddressDelete?.deletedAddressId) {
            throw new Error('Customer address delete failed.');
          }

          return {error: null, deletedAddress: addressId};
        } catch (error: unknown) {
          if (error instanceof Error) {
            return data(
              {error: {[addressId]: error.message}},
              {
                status: 400,
              },
            );
          }
          return data(
            {error: {[addressId]: error}},
            {
              status: 400,
            },
          );
        }
      }

      default: {
        return data(
          {error: {[addressId]: 'Method not allowed'}},
          {
            status: 405,
          },
        );
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return data(
        {error: error.message},
        {
          status: 400,
        },
      );
    }
    return data(
      {error},
      {
        status: 400,
      },
    );
  }
}

export default function Addresses() {
  const {customer} = useOutletContext<{customer: CustomerFragment}>();
  const {defaultAddress, addresses} = customer;

  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      {/* Addresses Section */}
      <div className="flex flex-col items-center gap-6 w-full">
        <h3 className="text-body-regular font-medium">Saved Addresses</h3>

        {addresses.nodes.length === 0 ? (
          <p className="text-body-regular text-secondary">
            You have no addresses saved.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full">
            {addresses.nodes.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isDefault={defaultAddress?.id === address.id}
              />
            ))}
          </div>
        )}

        {/* Add Address Button */}
        <Link to="/account/address/new">
          <Button variant="box" size="sm">
            Add Address
          </Button>
        </Link>
      </div>
    </div>
  );
}

function AddressCard({
  address,
  isDefault,
}: {
  address: AddressFragment;
  isDefault: boolean;
}) {
  const {state, formMethod} = useNavigation();
  const actionData = useActionData<ActionResponse>();
  const error = actionData?.error?.[address.id];
  const isDeleting = formMethod === 'DELETE' && state !== 'idle';

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-col items-center w-full">
        {isDefault && (
          <span className="text-detail text-secondary uppercase mb-1">
            Default
          </span>
        )}
        <span className="text-body-regular text-center max-w-[200px]">
          {address.firstName} {address.lastName}
          {address.company && (
            <>
              <br />
              {address.company}
            </>
          )}
          <br />
          {address.address1}
          {address.address2 && `, ${address.address2}`}
          <br />
          {address.city}
          {address.zoneCode && `, ${address.zoneCode}`} {address.zip}
          <br />
          {address.territoryCode}
          {address.phoneNumber && (
            <>
              <br />
              {address.phoneNumber}
            </>
          )}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <Link to={`/account/address/${encodeURIComponent(address.id)}`}>
          <Button variant="link" size="sm">
            Edit
          </Button>
        </Link>
        <Form method="DELETE">
          <input type="hidden" name="addressId" value={address.id} />
          <Button
            type="submit"
            variant="link"
            size="sm"
            disabled={isDeleting}
            className="text-destructive"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Form>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-body-medium text-destructive text-center">{error}</p>
      )}
    </div>
  );
}
