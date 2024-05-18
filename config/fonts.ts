import { Noto_Sans as FontSans, Noto_Sans_Thai as FontSansThai } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontSansThai = FontSansThai({
  subsets: ["thai"],
  variable: "--font-sans-thai",
})