import { Metadata } from "next";
import clsx from "clsx";

import { fontSans, fontSansThai } from "@/config/fonts";

import "@/styles/globals.css";
import { Providers } from "./providers";

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
          "min-h-screen font-sans antialiased",
          fontSans.className
        )}
      >
        <Providers>
          <div className="content-wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
