import React from 'react';
import { PT_Sans } from "next/font/google";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import "../helpers/globals.css";
import "/node_modules/video-react/dist/video-react.css";
import CookiesPanel from "../components/CookiesPanel";

export const metadata = {
  title: "Hands of Friends",
  description: "Generated by create next app",
};

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// const bloggerSans = BloggerSans({
//   subsets: ['latin'],
//   weight: ['400', '700']
// })

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body className={`${ptSans.className} overflow-x-hidden`}>
        <Header lng={lng} />
        <main className="mx-auto">{children}</main>
        <Footer lng={lng} />
        <CookiesPanel/>
      </body>
    </html>
  );
}
