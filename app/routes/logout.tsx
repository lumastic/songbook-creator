import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { redirect } from '@remix-run/node';

import { destroySession, getSession } from '~/services/session.server';
export let loader: LoaderFunction = () => redirect('/login');

const logoutURL = new URL(
  `https://${process.env.AUTH0_ISSUERBASEURL}/v2/logout`
);
export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  logoutURL.searchParams.set('client_id', `${process.env.AUTH0_CLIENTID}`);
  logoutURL.searchParams.set('returnTo', `${process.env.AUTH0_RETURN_TO_URL}`);
  return redirect(logoutURL.toString(), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};
