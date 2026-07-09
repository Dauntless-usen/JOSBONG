import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // TODO: replace with the production domain once it's confirmed.
  metadataBase: new URL("https://josbong.com"),
  title: "JosBong — Research, AI & Data Services",
  description:
    "JosBong provides research support, AI solutions, and data analysis services for businesses and academics.",
  openGraph: {
    title: "JosBong — Research, AI & Data Services",
    description:
      "JosBong provides research support, AI solutions, and data analysis services for businesses and academics.",
    images: [{ url: "/logo/dark.jpeg", width: 1280, height: 840 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
