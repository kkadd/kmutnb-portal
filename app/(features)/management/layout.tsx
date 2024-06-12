import { Metadata } from "next";
import { Providers } from "./providers";
import clsx from "clsx";

import { fontSans, fontSansThai } from "@/config/fonts";

import "@/styles/globals.css";

import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider/SessionProvider";

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
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSansThai.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.className
        )}
      >
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
