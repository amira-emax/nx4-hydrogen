// Virtual entry point for the app
import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/hydrogen/oxygen';
import {createHydrogenRouterContext} from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const hydrogenContext = await createHydrogenRouterContext(
        request,
        env,
        executionContext,
      );

      // Password protection middleware - runs before route handling
      if (env.STORE_PASSWORD) {
        const url = new URL(request.url);
        const pathname = url.pathname;

        // List of paths that don't require password protection
        const publicPaths = ['/password'];
        const isPublicPath = publicPaths.some((publicPath) =>
          pathname.includes(publicPath),
        );

        // Check if the user has access from a cookie
        if (!isPublicPath) {
          const cookieHeader = request.headers.get('Cookie');
          const cookies = cookieHeader
            ? cookieHeader.split(';').reduce(
                (acc, cookie) => {
                  const [name, value] = cookie.trim().split('=');
                  if (name) acc[name] = value || '';
                  return acc;
                },
                {} as Record<string, string>,
              )
            : {};

          // If the user doesn't have the access cookie, redirect to password page
          if (cookies['storeAccess'] !== 'granted') {
            return new Response(null, {
              status: 302,
              headers: {
                Location: '/password',
              },
            });
          }
        }
      }

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        // eslint-disable-next-line import/no-unresolved
        build: await import('virtual:react-router/server-build'),
        mode: process.env.NODE_ENV,
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
