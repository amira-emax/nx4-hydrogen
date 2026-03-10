import {createHydrogenContext} from '@shopify/hydrogen';
import {createAdminApiClient, type AdminApiClient} from '@shopify/admin-api-client';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {getLocaleFromRequest} from '~/lib/i18n';

// Define the additional context object
const additionalContext = {
  // Additional context for custom properties, CMS clients, 3P SDKs, etc.
  // These will be available as both context.propertyName and context.get(propertyContext)
  // Example of complex objects that could be added:
  // cms: await createCMSClient(env),
  // reviews: await createReviewsClient(env),
} as const;

// Automatically augment HydrogenAdditionalContext with the additional context type
type AdditionalContextType = typeof additionalContext;

declare global {
  interface HydrogenAdditionalContext extends AdditionalContextType {
    adminApiClient: AdminApiClient | null;
  }
}

/**
 * Creates Hydrogen context for React Router 7.9.x
 * Returns HydrogenRouterContextProvider with hybrid access patterns
 * */
export async function createHydrogenRouterContext(
  request: Request,
  env: Env & {
    SHOPIFY_ADMIN_API_ACCESS_TOKEN?: string;
    SHOPIFY_ADMIN_API_VERSION?: string;
  },
  executionContext: ExecutionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  // Initialize the Admin API client if credentials are available
  const adminApiClient =
    env.SHOPIFY_ADMIN_API_ACCESS_TOKEN && env.PUBLIC_STORE_DOMAIN
      ? createAdminApiClient({
          storeDomain: env.PUBLIC_STORE_DOMAIN,
          apiVersion: env.SHOPIFY_ADMIN_API_VERSION || '2025-10',
          accessToken: env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        })
      : null;

  // Define the additional context object including adminApiClient
  const additionalContext = {
    adminApiClient,
    // Add any additional CMS clients, 3P SDKs, etc. here
  } as const;

  // Automatically augment HydrogenAdditionalContext with the additional context type
  // Note: For proper TypeScript augmentation, you may need to define this globally in a .d.ts file

  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      i18n: getLocaleFromRequest(request),
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
      },
    },
    additionalContext,
  );

  return hydrogenContext;
}

