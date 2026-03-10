import {useState} from 'react';
import {useLoaderData} from 'react-router';
import type {Route} from './+types/policy.$handle';
import HtmlContentBlock from '~/components/cms/HtmlContentBlock';
import {Button} from '~/components/ui/button';
import {CookieSettingsDialog} from '~/components/cms/CookieSettingsDialog';

const BLOG_HANDLE = 'policy';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `NX4 Bird Nest | ${data?.article.title ?? ''}`}];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const {handle} = params;

  if (!handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const data = await context.storefront.query(POLICY_ARTICLE_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      articleHandle: handle,
      language: context.storefront.i18n?.language,
    },
  });

  const article = data.blog?.articleByHandle;

  if (!article) {
    throw new Response('Not found', {status: 404});
  }

  return {article, handle};
}

export default function Policy() {
  const {article, handle} = useLoaderData<typeof loader>();
  const [cookieDialogOpen, setCookieDialogOpen] = useState(false);
  const isCookiePolicy = handle.includes('cookie');

  return (
    <div className="bg-subtle w-full pt-[120px] pb-[168px]">
      <div className="flex flex-col items-center px-6 md:px-[56px]">
        {/* Policy Content */}
        <div className="flex flex-col gap-[56px] items-center px-0 md:px-[80px] w-full">
          <div className="flex flex-col items-center w-full max-w-[720px]">
            <h2 className="mb-10 w-full text-h2-light text-center">
              {article.title}
            </h2>
            <div className="flex flex-col items-center w-full gap-6">
              <HtmlContentBlock
                contentHtml={article.contentHtml}
                variant="policy"
              />
              {isCookiePolicy && (
                <Button variant="box" onClick={() => setCookieDialogOpen(true)}>
                  Cookies settings
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCookiePolicy && (
        <CookieSettingsDialog
          open={cookieDialogOpen}
          onOpenChange={setCookieDialogOpen}
        />
      )}
    </div>
  );
}

const POLICY_ARTICLE_QUERY = `#graphql
  query PolicyArticle(
    $articleHandle: String!
    $blogHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        seo {
          title
          description
        }
      }
    }
  }
` as const;
