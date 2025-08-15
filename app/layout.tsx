import type { Metadata } from "next";
import "./globals.css";
import { inter, ibmPlex, dmSerif } from "./fonts";

export const metadata = {
  title: "Meeting Design Lab - Transform Your Meeting Culture",
  description: "Diagnose meeting effectiveness and get personalized action plans",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
}

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