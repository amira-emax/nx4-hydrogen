import {useLoaderData} from 'react-router';
import ModuleRenderer from '~/components/cms/general-modules/ModuleRenderer';
import {PROMOTION_PAGE_CMS_QUERY} from '~/graphql/cms/query/PromotionPageQuery';
import type {Route} from './+types/promotion';
import type {PromotionPageCmsQuery} from 'types/storefrontapi.generated';

export const handle = {isLandingPage: true};

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

  const page = promotionPage as any;
  const topLogo = page?.topLogo?.reference?.image;
  const topLabel = page?.topLabel?.value as string | undefined;

  return (
    <div className="promotion relative">
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">
        <div className="pointer-events-auto">
          {topLogo ? (
            <img src={topLogo.url} alt={topLogo.altText || ''} className="h-8 md:h-15 lg:h-20 w-auto object-contain" />
          ) : (
            <span className="text-white text-sm tracking-widest font-semibold">NX4</span>
          )}
        </div>
        {topLabel && (
          <span className="pointer-events-auto text-white text-sm md:text-lg lg:text-2xl font-extralight tracking-wide">
            {topLabel}
          </span>
        )}
      </div>
      <ModuleRenderer modules={promotionPage?.modules?.references?.nodes || []} />
    </div>
  );
}
