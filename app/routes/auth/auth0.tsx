import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';

import { authenticator } from '~/utils/auth.server';

export let loader: LoaderFunction = () => redirect('/my-setlist');

export let action: ActionFunction = ({ request }) => {
  //if (process.env.NODE_ENV === 'development')
  //return process.env.developmentUserId;

  return authenticator.authenticate('auth0', request);
};
