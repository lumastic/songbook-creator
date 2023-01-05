import { Authenticator } from 'remix-auth';
import { Auth0Strategy, Auth0StrategyOptions } from 'remix-auth-auth0';

import { sessionStorage } from '~/services/session.server';

const config: Auth0StrategyOptions = {
  callbackURL: `${process.env.AUTH0_BASEURL}/auth/auth0/callback`,
  clientID: `${process.env.AUTH0_CLIENTID}`,
  clientSecret: `${process.env.AUTH0_SECRET}`,
  domain: `${process.env.AUTH0_ISSUERBASEURL}`,
};

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<string>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  config,
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    console.dir({ profile });
    // Get the user data from your DB or API using the tokens and profile
    return 'User.findOrCreate({ email: profile?.emails?[0].value })';
  }
);

authenticator.use(auth0Strategy);
