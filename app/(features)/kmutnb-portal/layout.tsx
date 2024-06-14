import { Metadata } from "next";
import clsx from "clsx";

import { fontSans, fontSansThai } from "@/config/fonts";

import "@/styles/globals.css";
import { Providers } from "./providers";
import { PortalNav } from "@/components/portal-navbar/portal-navbar";

import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider/SessionProvider";
import { authOptions } from "@/app/(api)/api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "kmutnb portal",
  description:
    "kmutnb information service personalized portal management system",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSansThai.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased no-scrollbar",
          fontSans.className
        )}
      >
        <SessionProvider session={session}>
          <Providers>
            <PortalNav />
            <div className="content-wrapper">{children}</div>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
