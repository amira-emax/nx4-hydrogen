import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  useLocation,
} from 'react-router';
import type {Route} from './+types/root';
import favicon from '~/assets/favicon.svg';
import {HEADER_QUERY} from '~/lib/fragments';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import customFonts from '~/styles/custom-fonts.css?url';
import tailwindCss from './styles/tailwind.css?url';
import reactMediumImageZoomCss from './styles/react-medium-image-zoom.css?url';
import {PageLayout} from './components/PageLayout';
import {NotFound} from './components/NotFound';
import {GLOBAL_BANNER_CMS_QUERY} from './graphql/cms/query/GlobalBannerQuery';
import {GLOBAL_NEWSLETTER_POPUP_CMS_QUERY} from './graphql/cms/query/GlobalNewsletterPopupQuery';
import {FOOTER_MENU_CMS_QUERY} from './graphql/cms/query/FooterMenuQuery';
import {GLOBAL_SOCIAL_MEDIAS_QUERY} from './graphql/cms/query/GlobalSocialMediasQuery';
import {MOBILE_MENU_CMS_QUERY} from './graphql/cms/query/MobileMenuQuery';
import {GLOBAL_DESKTOP_HEADER_CMS_QUERY} from './graphql/cms/query/GlobalDesktopHeaderQuery';
import {GoogleTagManager} from '~/components/GoogleTagManager';

export type RootLoader = typeof loader;

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  // Defaulting to no revalidation for root loader data to improve performance.
  // When using this feature, you risk your UI getting out of sync with your server.
  // Use with caution. If you are uncomfortable with this optimization, update the
  // line below to `return defaultShouldRevalidate` instead.
  // For more details see: https://remix.run/docs/en/main/route/should-revalidate
  return false;
};

/**
 * The main and reset stylesheets are added in the Layout component
 * to prevent a bug in development HMR updates.
 *
 * This avoids the "failed to execute 'insertBefore' on 'Node'" error
 * that occurs after editing and navigating to another page.
 *
 * It's a temporary fix until the issue is resolved.
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  const {storefront, env} = args.context;

  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language,
    },
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const [header, globalDesktopHeader] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu', // Adjust to your header menu handle
      },
    }),
    // Add other queries here, so that they are loaded in parallel
    storefront.query(GLOBAL_DESKTOP_HEADER_CMS_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        handle: context.env.GLOBAL_DESKTOP_HEADER_CMS_SLUG || 'desktop-header',
      },
    }),
  ]);

  return {header, globalDesktopHeader};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const {storefront, customerAccount, cart, env} = context;

  const mobileMenu = storefront
    .query(MOBILE_MENU_CMS_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        handle: env.GLOBAL_MOBILE_MENU_CMS_SLUG || 'mobile-menu',
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const footer = storefront
    .query(FOOTER_MENU_CMS_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        handle: env.GLOBAL_FOOTER_CMS_SLUG || 'footer',
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const globalBanner = storefront
    .query(GLOBAL_BANNER_CMS_QUERY, {
      cache: storefront.CacheNone(),
      variables: {
        handle: env.GLOBAL_BANNER_CMS_SLUG || 'banner',
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const globalNewsletterPopup = storefront
    .query(GLOBAL_NEWSLETTER_POPUP_CMS_QUERY, {
      cache: storefront.CacheNone(),
      variables: {
        handle: env.GLOBAL_NEWSLETTER_POPUP_CMS_SLUG || 'newsletter',
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const globalSocialMedias = storefront
    .query(GLOBAL_SOCIAL_MEDIAS_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        handle: env.GLOBAL_SOCIAL_MEDIAS_CMS_SLUG || 'social-medias',
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer,
    mobileMenu,
    globalBanner,
    globalNewsletterPopup,
    globalSocialMedias,
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();

  const data = useRouteLoaderData<RootLoader>('root');
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss}></link>
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <link rel="stylesheet" href={customFonts}></link>
        <link rel="stylesheet" href={reactMediumImageZoomCss}></link>
        <Meta />
        <Links />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({'csp_nonce': '${nonce}'}); 

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
            var n=d.querySelector('[nonce]');
            n&&(j.setAttribute('nonce',n.nonce||n.getAttribute('nonce')));
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N77SSMH7');`,
          }}
        ></script>
      </head>
      <body>
      <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-N77SSMH7"
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <PageLayout {...data}>{children}</PageLayout>
            <GoogleTagManager />
          </Analytics.Provider>
        ) : (
          children
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');

  if (!data) {
    return <Outlet />;
  }

  const location = useLocation();
  const isPasswordPage = location.pathname === '/password';

  return (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      {isPasswordPage ? (
        <Outlet />
      ) : (
        <PageLayout {...data}>
          <Outlet />
        </PageLayout>
      )}
    </Analytics.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const data = useRouteLoaderData<RootLoader>('root');
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  // For 404 errors, render NotFound inside PageLayout if we have root data
  if (errorStatus === 404 && data) {
    return (
      <Analytics.Provider
        cart={data.cart}
        shop={data.shop}
        consent={data.consent}
      >
        <PageLayout {...data}>
          <NotFound />
        </PageLayout>
      </Analytics.Provider>
    );
  }

  // For other errors or if root data is unavailable, show a simple error page
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-h1 text-primary mb-4">{errorStatus}</h1>
        <h2 className="text-h3 text-strong mb-4">Something went wrong</h2>
        {errorMessage && (
          <p className="text-body-regular text-secondary mb-8">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
