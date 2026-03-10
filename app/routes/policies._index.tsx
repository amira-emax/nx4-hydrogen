import {redirect} from 'react-router';
import type {Route} from './+types/policies._index';

export async function loader({context}: Route.LoaderArgs) {
  return redirect('/not-found');
}

// Original code preserved below
/* policies._index.tsx disabled * /
import {useState} from 'react';
import {useLoaderData} from 'react-router';
// import type {Route} from './+types/policies._index';
import HtmlContentBlock from '~/components/cms/HtmlContentBlock';
import {Button} from '~/components/ui/button';
import {CookieSettingsDialog} from '~/components/cms/CookieSettingsDialog';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Policies | NX4 Bird Nest'}];
};

export async function loader({context}: Route.LoaderArgs) {
  const data = await context.storefront.query(POLICIES_CONTENT_QUERY, {
    variables: {
      language: context.storefront.i18n?.language,
    },
  });

  const shippingPolicy = data.shop?.shippingPolicy;
  const refundPolicy = data.shop?.refundPolicy;

  if (!shippingPolicy && !refundPolicy) {
    throw new Response('No policies found', {status: 404});
  }

  return {shippingPolicy, refundPolicy};
}

export default function PoliciesIndex() {
  const {shippingPolicy, refundPolicy} = useLoaderData<typeof loader>();
  const [cookieDialogOpen, setCookieDialogOpen] = useState(false);

  return (
    <div className="bg-subtle w-full pt-[120px] pb-[168px]">
      <div className="flex flex-col items-center px-6 md:px-[56px]">
        {/* policies._index.tsx disabled * / Shipping & Return Policy Section * /}
        <div className="flex flex-col items-center pb-[40px] w-full">
          <h1 className="text-body-regular tracking-[1.5px] text-center">
            Shipping & Return Policy
          </h1>
        </div>

        <div className="flex flex-col gap-[56px] items-center px-0 md:px-[80px] w-full">
          {/* policies._index.tsx disabled * / Shipping Policy Section * /}
          {shippingPolicy?.body && (
            <div className="flex flex-col items-center w-full max-w-[720px]">
              <HtmlContentBlock
                contentHtml={shippingPolicy.body}
                variant="policy"
              />
            </div>
          )}

          {/* policies._index.tsx disabled * / Return & Exchange Section * /}
          {refundPolicy?.body && (
            <div className="flex flex-col items-center w-full max-w-[720px]">
              <p className="mb-4 text-caption w-full">Return and Exchange</p>
              <HtmlContentBlock
                contentHtml={refundPolicy.body}
                variant="policy"
              />
            </div>
          )}

          {/* policies._index.tsx disabled * / Cookies Policy Section * /}
          <div className="flex flex-col items-center w-full max-w-[720px]">
            <p className="mb-4 text-caption w-full">Cookies Policy</p>
            <div className="flex flex-col items-center w-full text-xs tracking-[1.35px] leading-[18px]">
              <p className="mb-[12px] md:mb-[24px]">
                We use cookies to personalise content and ads, to provide social
                media features and to analyse our traffic data. We also share
                information on your use of our site with our social media,
                advertising and analytics partners. You can read more about any
                of our purposes or the vendors that we use by clicking on
                &apos;Cookie Settings.&apos; This preference centre is
                accessible at any time through the &apos;Cookie Settings&apos;
                button located on every page.
              </p>
              <p className="mb-[12px] md:mb-[24px]">
                When you visit any website, it may store or retrieve information
                using your browser, mostly in the form of cookies. This
                information might be personal information about you, your
                preferences or your device and is mostly used to make the site
                work as you expect it to. The information does not usually
                directly identify you, but it can give you a more personalised
                web experience. Because we respect your right to privacy, you
                can choose not to allow some types of cookies.
              </p>
              <p className="mb-[12px] md:mb-[24px]">
                At any time you have the option to accept or decline the use of
                cookies using the on/off settings of the preference centre, by
                clicking on the button below:
              </p>

              <Button variant="box" onClick={() => setCookieDialogOpen(true)}>
                Cookies settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* policies._index.tsx disabled * / Cookie Settings Dialog * /}
      <CookieSettingsDialog
        open={cookieDialogOpen}
        onOpenChange={setCookieDialogOpen}
      />
    </div>
  );
}

// Query to fetch both shipping and refund policies with full content
const POLICIES_CONTENT_QUERY = `#graphql
  fragment PolicyContent on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query PoliciesContent(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      shippingPolicy {
        ...PolicyContent
      }
      refundPolicy {
        ...PolicyContent
      }
    }
  }
` as const;
*/
