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
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        } else if (
          credentials.username == "admin" &&
          credentials.password == "admin"
        ) {
          return {
            userInfo: {
              username: "admin",
              email: "admin",
              account_type: "personel",
              displayname: "admin",
            },
            management_role: "admin",
          };
        } else if (
          credentials.username == "staff" &&
          credentials.password == "staff"
        ) {
          return {
            userInfo: {
              username: "staff",
              email: "staff",
              account_type: "personel",
              displayname: "staff",
            },
            management_role: "staff",
          };
        } else if (
          credentials.username == "personel" &&
          credentials.password == "personel"
        ) {
          return {
            userInfo: {
              username: "personel",
              email: "personel",
              account_type: "personel",
              displayname: "personel",
            },
            management_role: "none",
          };
        } else if (
          credentials.username == "student" &&
          credentials.password == "student"
        ) {
          return {
            userInfo: {
              username: "student",
              email: "student",
              account_type: "student",
              displayname: "student",
            },
            management_role: "none",
          };
        } else if (
          credentials.username == "templecturer" &&
          credentials.password == "templecturer"
        ) {
          return {
            userInfo: {
              username: "templecturer",
              email: "templecturer",
              account_type: "templecturer",
              displayname: "templecturer",
            },
            management_role: "none",
          };
        } else if (
          credentials.username == "retirement" &&
          credentials.password == "retirement"
        ) {
          return {
            userInfo: {
              username: "retirement",
              email: "retirement",
              account_type: "retirement",
              displayname: "retirement",
            },
            management_role: "none",
          };
        } else if (
          credentials.username == "exchange_student" &&
          credentials.password == "exchange_student"
        ) {
          return {
            userInfo: {
              username: "exchange_student",
              email: "exchange_student",
              account_type: "exchange_student",
              displayname: "exchange_student",
            },
            management_role: "none",
          };
        } else if (
          credentials.username == "alumni" &&
          credentials.password == "alumni"
        ) {
          return {
            userInfo: {
              username: "alumni",
              email: "alumni",
              account_type: "alumni",
              displayname: "alumni",
            },
            management_role: "none",
          };
        } else {
          try {
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

              if (!process.env.NEXTAUTH_URL) {
                console.log("Please add NEXTAUTH_URL env");
                throw new Error("Configuration");
              }
              let permisssion: any = await fetch(
                process.env.NEXTAUTH_URL +
                  "/api/management/getUser?username=" +
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
              throw new Error("CredentialsSignin", user.api_status_code);
            }
          } catch (error) {
            // Catch errors in try but also f.e. connection fails
            throw error;
          }
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
    error: "/auth/error",
  },
};
