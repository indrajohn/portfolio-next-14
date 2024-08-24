import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import MyContextComponents from "@/context/myContext";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title:
    "Portfolio Indra John | Full Stack Developer | API Development | Node.js | React.js",
  description:
    "I have over 5 years+ of development experience, including working as a fullstack developer. I can build and consume APIs, set up databases, and love Node.js, WordPress, React.js.",
  "google-adsense-account": "ca-pub-9104407523380318",
  author: "Indra John",
  keywords:
    "portfolio, Indra John, full stack developer, API development, Node.js, React.js, web developer, projects, resume, WordPress",
  robots: "index, follow",
  charset: "UTF-8",
  language: "en",
  og: {
    title:
      "Portfolio Indra John | Full Stack Developer | API Development | Node.js | React.js",
    description:
      "I have over 5 years+ of development experience, including working as a fullstack developer. I can build and consume APIs, set up databases, and love Node.js, WordPress, React.js.",
    type: "website",
    url: "https://www.indrajohn.com.au",
    image: "https://www.indrajohn.com.au/img/og-image.png",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9104407523380318"
        crossorigin="anonymous"
      />
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
