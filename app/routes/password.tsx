import {
  useLoaderData,
  useActionData,
  type MetaFunction,
  redirect,
} from 'react-router';
import type {Route} from './+types/password';
import PasswordForm from '~/components/PasswordForm';

export const meta: MetaFunction = () => {
  return [{title: 'Enter Store'}];
};

export async function action({context, request}: Route.ActionArgs) {
  // Get the store password from environment variables
  const storePassword = context.env.STORE_PASSWORD;

  // Get form data from the request
  const formData = await request.formData();
  const password = formData.get('password');

  // Validate the password
  if (password === storePassword) {
    // Create a cookie with the access token
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      'storeAccess=granted; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax',
    );

    return new Response(null, {
      status: 302,
      headers: {
        ...Object.fromEntries(headers),
        Location: '/',
      },
    });
  }

  // If password is incorrect, return error
  return {error: 'Incorrect password. Please try again.'};
}

export async function loader({context, request}: Route.LoaderArgs) {
  // only check if env has password value
  if (!context.env.STORE_PASSWORD) {
    return redirect('/');
  }

  // Check if the user already has access from a cookie
  const cookieHeader = request.headers.get('Cookie');
  const cookies =
    cookieHeader?.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    ) || {};

  // If the user has the access cookie, redirect to home
  if (cookies['storeAccess'] === 'granted') {
    return redirect('/');
  }
}

export default function PasswordPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex flex-col items-center justify-center h-dvh px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="mb-6">Enter store using password</h1>
        </div>
        <PasswordForm error={actionData?.error} />
      </div>
    </div>
  );
}
