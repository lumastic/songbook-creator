import { Authenticator } from 'remix-auth';
import { Auth0Strategy, Auth0StrategyOptions } from 'remix-auth-auth0';
import { prisma } from '~/db/db.server';

import { sessionStorage } from '~/services/session.server';

const config: Auth0StrategyOptions = {
  callbackURL: `${process.env.AUTH0_BASEURL}/auth/auth0/callback`,
  clientID: `${process.env.AUTH0_CLIENTID}`,
  clientSecret: `${process.env.AUTH0_SECRET}`,
  domain: `${process.env.AUTH0_ISSUERBASEURL}`,
};

type SessionUser = {
  // user id for the current session
  id: number;
  // currently logged in user
  name: string;
};

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<SessionUser>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  config,
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    const email = profile.emails[0].value;
    const lookupUsr = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email: email,
        name: profile.displayName,
        oAuthId: profile.id,
        oAuthProvider: 'Auth0',
      },
    });

    return { id: lookupUsr.id, name: lookupUsr.name } as SessionUser;
  }
);

authenticator.use(auth0Strategy);

/**
 * Returns the currently authenticated user when the user is appropriately logged in
 * @param request loader args request
 * @returns
 */
export const currentAuthedUser = async (request: Request) => {
  if (process.env.NODE_ENV === 'development' && process.env.SKIPAUTH_USERID) {
    return await __DANGER__DEV__FAKEDAUTH__();
  }

  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
};

const __DANGER__DEV__FAKEDAUTH__ = async () => {
  console.warn(
    'currently running in local dev mode and skipping auth0 authorization.'
  );
  return (await prisma.user.findUniqueOrThrow({
    where: { id: process.env.SKIPAUTH_USERID },
  })) as SessionUser;
};

/**
 * use this in place of authenticator.authenticate
 * @param request
 * @returns
 */
export const processAuthentication = async (request: Request) => {
  if (process.env.NODE_ENV === 'development' && process.env.SKIPAUTH_USERID) {
    return await __DANGER__DEV__FAKEDAUTH__();
  }

  return authenticator.authenticate('auth0', request);
};
