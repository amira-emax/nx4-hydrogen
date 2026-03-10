import {useLoaderData} from 'react-router';
import ModuleRenderer from '~/components/cms/general-modules/ModuleRenderer';
import {CONTACT_US_PAGE_CMS_QUERY} from '~/graphql/cms/query/ContactUsPageQuery';
import type {Route} from './+types/contact-us';
import type {ContactUsPageCmsQuery} from 'types/storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Contact Us | NX4 Bird Nest'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {
    ...criticalData,
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{contactUsPage}] = await Promise.all([
    context.storefront.query<ContactUsPageCmsQuery>(CONTACT_US_PAGE_CMS_QUERY, {
      variables: {
        handle: context.env.CONTACT_US_PAGE_CMS_SLUG || 'contact-us-page',
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    contactUsPage,
  };
}

export default function ContactUsPage() {
  const {contactUsPage} = useLoaderData<typeof loader>();
  return (
    <div className="contact-us pt-[80px] pb-[120px]">
      <ModuleRenderer
        modules={contactUsPage?.modules?.references?.nodes || []}
      />
    </div>
  );
}
