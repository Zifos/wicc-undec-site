import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { Client as FaunaClient } from "faunadb";
import FaunaDBAdapter from "../../../adapters/fauna/index";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  adapter: FaunaDBAdapter.Adapter({
    faunaClient: new FaunaClient({ secret: process.env.FAUNADB_SECRET }),
  }),
});
