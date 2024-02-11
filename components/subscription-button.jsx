"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import ManageSub from "./manageBtn";

export const SubscriptionButton = ({
  isPro = false
}) => {
  const [loading, setLoading] = useState(false);


  const onSubscribeMonthly = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripemon");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onSubscribeYearly = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripeann");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-10 px-3 lg:px-0 lg:h-screen">
    <div className={`w-full lg:w-1/2 text-center space-y-5`}>
      <h2 className="text-3xl font-bold mt-20 lg:mt-0">{isPro ? 'Manage your subscription' : 'Get Lainie Pro'}</h2>
      {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio laudantium ipsam aspernatur ipsum numquam itaque reprehenderit incidunt vitae, esse earum?</p> */}

      {isPro ? (
        <div className="flex flex-col lg:flex-row items-center gap-4 justify-center w-full">
          <Card className='w-full lg:w-1/2'>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Manage your Subscription</CardTitle>
              {/* <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, ea.</CardDescription> */}
            </CardHeader>
            <CardFooter>
              {/* <SubscriptionButton isPro={isPro} /> */}
              <ManageSub isPro={isPro}/>
            </CardFooter>
          </Card>
        </div>
      ) : (<div className="flex flex-col lg:flex-row items-center gap-4 justify-center w-full">

        <Card className='w-full lg:w-1/2'>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Lainie Pro - Monthly</CardTitle>
            <CardDescription className='text-md border rounded-lg flex flex-col gap-3 py-4'>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>Unlimited Messages</p>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>Unlimited Chat History</p>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>24/7 Available</p>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>Billed Monthly</p>
             
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">$10.99</span>
            <span className=" text-muted-foreground">/month</span>
          </CardContent>
          <CardFooter>
            <Button onClick={onSubscribeMonthly} disabled={loading}  className='w-full' variant='nav'>Subscribe</Button>
          </CardFooter>
        </Card>
        <Card className='w-full lg:w-1/2'>
          <CardHeader>
            <CardTitle className='text-xl font-bold flex item gap-2 justify-center'>Lainie Pro - Yearly
              <Badge className={'bg-[#f364b8]'}>20% Off</Badge>
            </CardTitle>
            <CardDescription className='text-md border rounded-lg flex flex-col gap-3 py-4'>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>Unlimited Messages</p>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>Unlimited Chat History</p>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>24/7 Available</p>
              <p className="flex items-center gap-1 justify-center"><span><img src="/tick.svg" alt="" className="w-5 h-5" /></span>Billed Monthly</p>
             
            </CardDescription>
           </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">$105.50</span>
            <span className=" text-muted-foreground">/year</span>
          </CardContent>
          <CardFooter>
            <Button className='w-full' variant='nav' disabled={loading} onClick={onSubscribeYearly}>Subscribe</Button>
          </CardFooter>
        </Card>


      </div>)}
    </div>
  </div>
  )
};