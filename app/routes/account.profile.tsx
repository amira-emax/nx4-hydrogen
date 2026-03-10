import {Link, useOutletContext} from 'react-router';
import type {Route} from './+types/account.profile';
import {Button} from '~/components/ui/button';
import type {CustomerFragment} from 'types/customer-accountapi.generated';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Profile'}];
};

export async function loader({context}: Route.LoaderArgs) {
  context.customerAccount.handleAuthStatus();

  return {};
}

export default function AccountProfile() {
  const {customer} = useOutletContext<{customer: CustomerFragment}>();
  const defaultAddress = customer.defaultAddress;

  return (
    <div className="flex flex-col items-center gap-10 pt-10">
      {/* Personal Info Section */}
      <div className="flex flex-col items-center gap-6 w-full">
        <h3 className="text-body-regular font-medium">Personal Info</h3>
        <div className="flex flex-col items-center gap-2 w-full">
          {/* First Name */}
          <div className="flex flex-col items-center w-full">
            <span className="text-body-medium text-secondary">First Name</span>
            <span className="text-body-medium">
              {customer.firstName || '—'}
            </span>
          </div>
          {/* Last Name */}
          <div className="flex flex-col items-center w-full">
            <span className="text-body-medium text-secondary">Last Name</span>
            <span className="text-body-medium">{customer.lastName || '—'}</span>
          </div>
          {/* Email Address */}
          <div className="flex flex-col items-center w-full">
            <span className="text-body-medium text-secondary">
              Email Address
            </span>
            <span className="text-body-medium">
              {customer.emailAddress?.emailAddress || '—'}
            </span>
          </div>
          {/* Phone Number */}
          <div className="flex flex-col items-center w-full">
            <span className="text-body-medium text-secondary">
              Phone Number
            </span>
            <span className="text-body-medium">
              {defaultAddress?.phoneNumber || '—'}
            </span>
          </div>
        </div>
        <Link to="/account/profile/edit">
          <Button variant="box" size="sm">
            Edit Info
          </Button>
        </Link>
      </div>

      {/* Default Address Section */}
      <div className="flex flex-col items-center gap-6 w-full">
        <h3 className="text-body-regular font-medium">Default Address</h3>
        <div className="flex flex-col items-center w-full">
          <span className="text-body-regular text-center max-w-[200px]">
            {defaultAddress ? (
              <>
                {defaultAddress.address1}
                {defaultAddress.address2 && `, ${defaultAddress.address2}`}
                <br />
                {defaultAddress.city}
                {defaultAddress.zoneCode && `, ${defaultAddress.zoneCode}`}{' '}
                {defaultAddress.zip}
                <br />
                {defaultAddress.territoryCode}
              </>
            ) : (
              'No address saved'
            )}
          </span>
        </div>
        <Link to="/account/addresses">
          <Button variant="box" size="sm">
            Manage Address
          </Button>
        </Link>
      </div>
    </div>
  );
}
