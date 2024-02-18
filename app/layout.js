import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import ModalProvider from "@/components/modal-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from "next/head";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lainie | Mental health coach",
  description: "Lainie.co is your trusted online destination for personalized mental health support and guidance. Our empathetic AI chatbot provides a judgment-free space for open conversations, tailored to your unique needs. Start your journey to emotional well-being with Lainie.co today.",
  keywords: "Mental health support, Online therapy alternative, AI chatbot counseling, Personalized mental wellnes, Judgment-free conversations, Emotional support chatbot, Virtual therapy companion, Empathetic mental health guidance, Online mental wellness platform, AI counseling service"
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
          />

          <Script id="ga-script" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
        `}
          </Script>
        </Head>
        <body className={inter.className}>
          <ModalProvider />
          <Toaster />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>

      </html>
    </ClerkProvider>
  );
}
