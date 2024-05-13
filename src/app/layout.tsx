"use client";
import React, { useEffect, ReactElement, ReactNode } from "react";
import "./globals.css";
//import localFont from "@next/font/local";  // ! I received an error when I used this import statement in Nextjs14 won't be able to resolve the module
//import localFont from "next/font"; // * Instead, using this import in Nextjs14

/*
const avenir = localFont({
  src: "../../public/fonts/AvenirLTStd-Book.otf",
  variable: "--font-avenir",
});
*/
// ? ORIGINAL. I HAD TO DEACTIVATE THIS BECAUSE IT WAS CAUSING AN ERROR
// * className={`${avenir.variable } font-sans flex min-h-screen h-screen w-screen`}> 


import { Montserrat } from "next/font/google";
import { Providers } from "@/src/redux/provider";
import SideNav from "../components/SideNav";
import { store } from "@/src/redux/store";

import { loadUser } from "@/src/redux/actions/auth";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: 'World map preview',
  description: 'An interactive map of the world with a preview of the countries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Karla:wght@400;500&display=swap"
        />
      </head>
      <body className={montserrat.className}>
        <Providers>
          <div

            className={`font-sans flex min-h-screen h-screen w-screen`}>
            <SideNav />
            <main className="w-full bg-slate-900 text-slate-400">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
