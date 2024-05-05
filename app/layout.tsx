import { Metadata } from "next";
import { Providers } from "./providers";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

import "@/styles/globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
