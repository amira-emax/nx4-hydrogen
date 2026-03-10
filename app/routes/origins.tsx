import {useLoaderData} from 'react-router';
import ModuleRenderer from '~/components/cms/general-modules/ModuleRenderer';
import {ORIGINS_PAGE_CMS_QUERY} from '~/graphql/cms/query/OriginsPageQuery';
import type {Route} from './+types/origins';
import type {OriginsPageCmsQuery} from 'types/storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Our Origins | NX4 Bird Nest'}];
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
  const [{originsPage}] = await Promise.all([
    context.storefront.query<OriginsPageCmsQuery>(ORIGINS_PAGE_CMS_QUERY, {
      variables: {
        handle: context.env.ORIGINS_PAGE_CMS_SLUG || 'origins-page',
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    originsPage,
  };
}

export default function OriginsPage() {
  const {originsPage} = useLoaderData<typeof loader>();
  return (
    <div className="origins">
      <ModuleRenderer modules={originsPage?.modules?.references?.nodes || []} />
    </div>
  );
}
