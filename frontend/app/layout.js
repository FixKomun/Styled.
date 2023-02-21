"use client";

import "./globals.css";
import { Inter } from "@next/font/google";
const anybody = Inter({ subsets: ["latin"] });
import { Provider, createClient } from "urql";
import { StateContext } from "@/lib/context";
//Components
import Nav from "@/components/Nav";
//Auth0
import { UserProvider } from "@auth0/nextjs-auth0/client";
//Toaster
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
  const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <html lang="en" className={anybody.className}>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />

            <body>
              <>
                <Toaster />
                <Nav />
                {children}
              </>
            </body>
          </html>
        </Provider>
      </StateContext>
    </UserProvider>
  );
}
