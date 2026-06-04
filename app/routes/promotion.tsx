import {useLoaderData} from 'react-router';
import ModuleRenderer from '~/components/cms/general-modules/ModuleRenderer';
import {PROMOTION_PAGE_CMS_QUERY} from '~/graphql/cms/query/PromotionPageQuery';
import type {Route} from './+types/promotion';
import type {PromotionPageCmsQuery} from 'types/storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Promotion | NX4 Bird Nest'}];
};

export async function loader(args: Route.LoaderArgs) {
  const criticalData = await loadCriticalData(args);
  return {...criticalData};
}

async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{promotionPage}] = await Promise.all([
    context.storefront.query<PromotionPageCmsQuery>(PROMOTION_PAGE_CMS_QUERY, {
      variables: {
        handle: context.env.PROMOTION_PAGE_CMS_SLUG || 'promotion-page',
      },
    }),
  ]);

  return {promotionPage};
}

export default function PromotionPage() {
  const {promotionPage} = useLoaderData<typeof loader>();
  return (
    <div className="promotion">
      <ModuleRenderer modules={promotionPage?.modules?.references?.nodes || []} />
    </div>
  );
}
