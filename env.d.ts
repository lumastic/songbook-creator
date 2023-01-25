declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    /**
     * secret for the session token.
     */
    SESSION_SECRET: string;
    /**
     * Allows bypass of auth0 for local development be sure to set your node_env to development and
     * this to the userId in the database.
     */
    SKIPAUTH_USERID: number;
  }
}
