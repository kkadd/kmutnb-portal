import NextAuth, { DefaultSession } from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User extends DefaultSession["user"] {
    userInfo?: any;
    management_role?: any;
    account_type?: any;
    displayname?: any;
  }
}

declare module "next-auth/jwt" {
  // Returned by the `jwt` callback and `getToken`, when using JWT sessions
  interface JWT {
    userInfo?: any;
    management_role?: any;
    account_type?: any;
    displayname?: any;
  }
}
