import type {CustomerUpdateInput} from '@shopify/hydrogen/customer-account-api-types';
import {useState} from 'react';
import {
  data,
  Form,
  Link,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';
import type {CustomerFragment} from 'types/customer-accountapi.generated';
import {Button} from '~/components/ui/button';
import {Checkbox} from '~/components/ui/checkbox';
import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import BirthDateSelect from '~/components/BirthDateSelect';
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import {METAFIELDS_SET_MUTATION} from '~/graphql/customer-account/MetafieldsSetMutation';
import type {Route} from './+types/account.profile_.edit';

export type ActionResponse = {
  error: string | null;
  customer: CustomerFragment | null;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Edit Profile'}];
};

export async function loader({context}: Route.LoaderArgs) {
  context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: Route.ActionArgs) {
  const {customerAccount} = context;

  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
    const customer: CustomerUpdateInput = {};
    const validInputKeys = ['firstName', 'lastName'] as const;

    // Extract birth date components
    const day = form.get('day');
    const month = form.get('month');
    const year = form.get('year');

    // Handle standard fields
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key as any)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key as (typeof validInputKeys)[number]] = value;
      }
    }

    // Extract consent values used for metafields
    const emailMarketingConsent = form.get('marketingConsent') === 'on';
    const personalizedUpdateConsent =
      form.get('personalizationConsent') === 'on';

    // Update customer standard fields
    const {data: mutationData, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
          language: customerAccount.i18n.language,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!mutationData?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    // Handle birth date metafield update if fully provided
    if (day && month && year) {
      const birthDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      const {data: metafieldData, errors: metafieldErrors} =
        await customerAccount.mutate(METAFIELDS_SET_MUTATION, {
          variables: {
            metafields: [
              {
                namespace: 'facts',
                key: 'birth_date',
                value: birthDate,
                type: 'date',
                ownerId: mutationData.customerUpdate.customer.id,
              },
              {
                namespace: 'custom',
                key: 'email_marketing_consent',
                value: emailMarketingConsent ? 'true' : 'false',
                type: 'boolean',
                ownerId: mutationData.customerUpdate.customer.id,
              },
              {
                namespace: 'custom',
                key: 'personalized_update_consent',
                value: personalizedUpdateConsent ? 'true' : 'false',
                type: 'boolean',
                ownerId: mutationData.customerUpdate.customer.id,
              },
            ],
          },
        });

      if (metafieldErrors?.length) {
        console.error('Metafield update error:', metafieldErrors);
        // We don't throw here to avoid blocking standard profile update success
      }
    }

    return {
      error: null,
      customer: mutationData?.customerUpdate?.customer,
    };
  } catch (error: any) {
    return data(
      {error: error.message, customer: null},
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfileEdit() {
  const {customer} = useOutletContext<{customer: CustomerFragment}>();
  const {state} = useNavigation();
  const actionData = useActionData<ActionResponse>();
  const currentCustomer = actionData?.customer ?? customer;

  // Parse existing birth date from metafield
  // @ts-ignore
  const initialBirthDate = customer.birthDate?.value || '';
  // @ts-ignore
  const initialMarketingConsent =
    customer.emailMarketingConsent?.value === 'true';
  // @ts-ignore
  const initialPersonalizedConsent =
    customer.personalizedUpdateConsent?.value === 'true';
  const [initialYear, initialMonth, initialDay] = initialBirthDate.split('-');

  const [day, setDay] = useState(initialDay ? String(Number(initialDay)) : '');
  const [month, setMonth] = useState(initialMonth || '');
  const [year, setYear] = useState(initialYear || '');

  return (
    <div className="flex flex-col items-center w-full max-w-[720px] mt-10 mx-auto px-6">
      <Form method="PUT" className="w-full flex flex-col gap-4">
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
            defaultValue={currentCustomer.firstName ?? ''}
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
            defaultValue={currentCustomer.lastName ?? ''}
            className="bg-white rounded-none p-4 text-body-medium"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="email"
            className="text-body-medium uppercase text-secondary"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-label="Email"
            defaultValue={currentCustomer.emailAddress?.emailAddress ?? ''}
            readOnly
            className="bg-white rounded-none p-4 text-body-medium opacity-60 cursor-not-allowed"
          />
        </div>

        {/* Birth Date */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="birthDate"
            className="text-body-medium uppercase text-secondary"
          >
            Birth Date
          </Label>
          <div className="grid grid-cols-1">
            <BirthDateSelect
              day={day}
              setDay={setDay}
              month={month}
              setMonth={setMonth}
              year={year}
              setYear={setYear}
            />
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="marketingConsent"
              name="marketingConsent"
              className="mt-0.5"
              defaultChecked={initialMarketingConsent}
            />
            <Label
              htmlFor="marketingConsent"
              className="text-body-medium text-foreground font-normal cursor-pointer text-start"
            >
              I consent to receive marketing communication by email
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="personalizationConsent"
              name="personalizationConsent"
              className="mt-0.5"
              defaultChecked={initialPersonalizedConsent}
            />
            <Label
              htmlFor="personalizationConsent"
              className="text-body-medium text-foreground font-normal cursor-pointer text-start"
            >
              I would like to receive updates about NX4 new activities,
              exclusive products, tailored services and to have a personalised
              client experience based on my interests.
            </Label>
          </div>
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
            {state !== 'idle' ? 'Saving...' : 'Save Changes'}
          </Button>
          <Link to="/account/profile">
            <Button type="button" variant="link" size="sm">
              Cancel
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
