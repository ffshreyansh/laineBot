import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscriptions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import axios from "axios";
import NavSetting from "@/components/nav-setting";
import { auth, currentUser, useAuth } from "@clerk/nextjs";
import Head from "next/head";
import Script from "next/script";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const {userId} = auth()
 
  return (
   (userId && <>
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
      <NavSetting/>
      <SubscriptionButton isPro={isPro}/>
    </>)
  );
}

export default SettingsPage;

