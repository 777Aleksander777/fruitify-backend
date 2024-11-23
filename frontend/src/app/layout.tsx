import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getGlobalData, getGlobalMetadata } from "../data/loader";
import { error } from "console";
import { Header } from "../components/ui/header/header"; 
import { Footer } from "../components/ui/footer/footer";
import { Providers } from "./providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const loveloBlack = localFont({
  src: "./fonts/Lovelo-Black.woff",
  variable: "--font-lovelo-black",
  weight: "100 900",
});

const metadata: Metadata = {
  title: "Fruitify",
  description: "Generated by create next app",
  viewport: 'width=device-width, initial-scale=1.0'
};

export async function generateMetadata(): Promise<Metadata> {
  const strapiMetadata = await getGlobalMetadata();
  if(!strapiMetadata) return metadata;

  return {
    title: strapiMetadata.data.title,
    description: strapiMetadata.data.description,
  };
}

export async function generateData() {

  const globalData = await getGlobalData();
  if(!globalData) { console.error("Cannot get global data"); return null};

  return globalData.data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const data = await generateData();

  // console.dir(data, { depth: null });

  const { naglowek, stopka } = data;

  return (
    <html lang="en" className="ligth">
      <body
        className={` ${loveloBlack.variable} antialiased`}
      >
        <Providers>
          <Header data={naglowek[0]}/>
          {children}
          <Footer data={stopka[0]}/>
        </Providers>
      </body>
    </html>
  );
}
