'use client'
import AboutComponent from "@/components/about";
import Contact from "@/components/contact";
import ContentLaine from "@/components/content";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Home from "@/components/home";
import Navbar from "@/components/navbar";
import TakeControl from "@/components/take-control";
import { auth } from "@clerk/nextjs";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

export default function LandingPage() {

  return (
    <div>
      <Head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXTLZKPN6X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-XXTLZKPN6X');
        `}
        </Script>
      </Head>
      <div className="px-3 lg:px-0">
        <Navbar />
        <Home />
        <AboutComponent />
        <ContentLaine />
        <TakeControl />
        <FAQ />
        <Contact />
      </div>

    </div>
  );
}
