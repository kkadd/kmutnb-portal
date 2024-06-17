import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "ICIT Account",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch(
          "https://api.account.kmutnb.ac.th/api/account-api/user-authen",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
              scopes:
                "personel,student,templecturer,retirement,exchange_student,alumni",
            }),
          }
        );
        let user = await res.json();

        if (user.api_status_code == 202) {
          console.log(user.userInfo.username);
          let permisssion: any = await fetch(
            "http://localhost:3000/api/management/getUser?username=" +
              user.userInfo.username
          );
          permisssion = await permisssion.json();
          if (permisssion.username) {
            user = {
              ...user,
              management_role: permisssion.role,
            };
            return user;
          } else {
            user = {
              ...user,
              management_role: "none",
            };
            return user;
          }
        } else {
          throw new Error("Invalid username or password", user.api_status_code);
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV == "development",
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });
      if (user && "userInfo" in user) {
        const userInfo =
          typeof user.userInfo === "string"
            ? JSON.parse(user.userInfo)
            : user.userInfo;
        token.name = userInfo.username;
        token.email = userInfo.email;
        token.account_type =
          userInfo.account_type == "students"
            ? "student"
            : userInfo.account_type;
        token.management_role = user.management_role;
        token.displayname = userInfo.displayname;
        return token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      session.user.account_type = token?.account_type;
      session.user.management_role = token?.management_role;
      session.user.displayname = token?.displayname;

      return session;
    },
  },
  pages: {
    error: "/auth/error"
  }
};
