import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import MyContextComponents from "@/context/myContext";

import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Indra John",
  description: "Portfolio Indra John",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Script src="https://www.googletagmanager.com/gtag/js?id=G-9PM69CL8XL" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-9PM69CL8XL');
        `}
      </Script>
      <body className={roboto.className}>
        <MyContextComponents>{children}</MyContextComponents>
	<Analytics />
      </body>
    </html>
  );
}
