import type {CustomerAddressInput} from '@shopify/hydrogen/customer-account-api-types';
import type {
  AddressFragment,
  CustomerFragment,
} from 'customer-accountapi.generated';
import {
  data,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';
import type {Route} from './+types/account.address_.new';
import {CREATE_ADDRESS_MUTATION} from '~/graphql/customer-account/CustomerAddressMutations';
import {Button} from '~/components/ui/button';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {Checkbox} from '~/components/ui/checkbox';

export type ActionResponse = {
  error: string | null;
  createdAddress?: AddressFragment;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Add Address'}];
};

export async function loader({context}: Route.LoaderArgs) {
  context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: Route.ActionArgs) {
  const {customerAccount} = context;

  if (request.method !== 'POST') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
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
      if (typeof value === 'string' && value.length) {
        address[key] = value;
      }
    }

    const {data: mutationData, errors} = await customerAccount.mutate(
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

    if (mutationData?.customerAddressCreate?.userErrors?.length) {
      throw new Error(
        mutationData?.customerAddressCreate?.userErrors[0].message,
      );
    }

    if (!mutationData?.customerAddressCreate?.customerAddress) {
      throw new Error('Customer address create failed.');
    }

    return redirect('/account/addresses');
  } catch (error: any) {
    return data(
      {error: error.message, createdAddress: null},
      {
        status: 400,
      },
    );
  }
}

export default function AddAddress() {
  const {customer} = useOutletContext<{customer: CustomerFragment}>();
  const {state} = useNavigation();
  const actionData = useActionData<ActionResponse>();

  return (
    <div className="flex flex-col items-center w-full max-w-[720px] mt-10 mx-auto px-6">
      <Form method="POST" className="w-full flex flex-col gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="firstName"
            className="text-body-medium uppercase text-secondary"
          >
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            aria-label="First name"
            defaultValue={customer.firstName ?? ''}
            required
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="lastName"
            className="text-body-medium uppercase text-secondary"
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            aria-label="Last name"
            defaultValue={customer.lastName ?? ''}
            required
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Company */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="company"
            className="text-body-medium uppercase text-secondary"
          >
            Company (Optional)
          </Label>
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            aria-label="Company"
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Address Line 1 */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="address1"
            className="text-body-medium uppercase text-secondary"
          >
            Address Line 1
          </Label>
          <Input
            id="address1"
            name="address1"
            type="text"
            autoComplete="address-line1"
            aria-label="Address line 1"
            required
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Address Line 2 */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="address2"
            className="text-body-medium uppercase text-secondary"
          >
            Address Line 2 (Optional)
          </Label>
          <Input
            id="address2"
            name="address2"
            type="text"
            autoComplete="address-line2"
            aria-label="Address line 2"
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="city"
            className="text-body-medium uppercase text-secondary"
          >
            City
          </Label>
          <Input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            aria-label="City"
            required
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* State / Province */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="zoneCode"
            className="text-body-medium uppercase text-secondary"
          >
            State / Province
          </Label>
          <Input
            id="zoneCode"
            name="zoneCode"
            type="text"
            autoComplete="address-level1"
            aria-label="State/Province"
            required
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Zip / Postal Code */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="zip"
            className="text-body-medium uppercase text-secondary"
          >
            Zip / Postal Code
          </Label>
          <Input
            id="zip"
            name="zip"
            type="text"
            autoComplete="postal-code"
            aria-label="Zip/Postal code"
            required
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Country Code */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="territoryCode"
            className="text-body-medium uppercase text-secondary"
          >
            Country Code
          </Label>
          <Input
            id="territoryCode"
            name="territoryCode"
            type="text"
            autoComplete="country"
            aria-label="Country code"
            placeholder="e.g. MY, US, GB"
            maxLength={2}
            required
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="phoneNumber"
            className="text-body-medium uppercase text-secondary"
          >
            Phone Number (Optional)
          </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            aria-label="Phone number"
            placeholder="+60 12 345 6789"
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Default Address Checkbox */}
        <div className="flex items-start gap-3 mt-4">
          <Checkbox
            id="defaultAddress"
            name="defaultAddress"
            className="mt-0.5"
          />
          <Label
            htmlFor="defaultAddress"
            className="text-body-medium text-foreground font-normal cursor-pointer"
          >
            Set as default address
          </Label>
        </div>

        {/* Error Message */}
        {actionData?.error && (
          <p className="text-body-medium text-destructive mt-2">
            {actionData.error}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <Button
            type="submit"
            variant="box"
            size="sm"
            disabled={state !== 'idle'}
          >
            {state !== 'idle' ? 'Saving...' : 'Save Address'}
          </Button>
          <Link to="/account/addresses">
            <Button type="button" variant="link" size="sm">
              Cancel
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
