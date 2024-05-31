import { Metadata } from "next";
import clsx from "clsx";

import { fontSans, fontSansThai } from "@/config/fonts";

import "@/styles/globals.css";
import { Providers } from "./providers";
import { PortalNav } from "@/components/portal-navbar/portal-navbar";

export const metadata: Metadata = {
  title: "kmutnb portal",
  description:
    "kmutnb information service personalized portal management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Providers>
          <PortalNav />
          <div className="content-wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
