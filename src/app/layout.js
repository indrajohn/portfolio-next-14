import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import MyContextComponents from "@/context/myContext";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Indra John",
  description: "Portfolio Indra John",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <MyContextComponents>{children}</MyContextComponents>
      </body>
    </html>
  );
}
