import type {Route} from './+types/account_.login';

/// NOTE
/// in order to login through local dev server, we need to use ngrok otherwise shopify blocks it
/// We also have to add the ngrok url to the Hydrogen app customer API settings through the shopify admin panel
/// Sales channel > Hydrogen > Nx4 Hydrogen > Storefront Setting > Customer Account API > Application Setup
///

export async function loader({request, context}: Route.LoaderArgs) {
  return context.customerAccount.login({
    countryCode: context.storefront.i18n.country,
  });
}
