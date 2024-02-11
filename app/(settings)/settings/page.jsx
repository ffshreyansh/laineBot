import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscriptions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import axios from "axios";
import NavSetting from "@/components/nav-setting";
import { auth, currentUser, useAuth } from "@clerk/nextjs";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const {userId} = auth()
 
  return (
   (userId && <>
      <NavSetting/>
      <SubscriptionButton isPro={isPro}/>
    </>)
  );
}

export default SettingsPage;

