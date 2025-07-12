import type { Metadata } from "next";
import "./globals.css";
import { inter, ibmPlex, dmSerif } from "./fonts";

export const metadata: Metadata = {
  title: "Meeting Design Lab | Transform Your Team's Energy",
  description: "Discover how much your meetings really cost and get actionable insights to transform team productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${ibmPlex.variable} ${dmSerif.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}