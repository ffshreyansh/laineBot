import {auth, currentUser} from '@clerk/nextjs';
import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';

const settingsUrl = absoluteUrl('/success');
const cancelUrl = absoluteUrl('/error-occured')

export async function GET(){
    try {
        const {userId} =  auth();
        const user = await currentUser();

        if(!userId || !user){
            return new NextResponse('Unathorized Access', {status: 401});
        }

        const userSubscription =  await prismadb.userSubscription.findUnique({
            where:{userId}
        });

        if(userSubscription && userSubscription.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            });

            return new NextResponse(JSON.stringify({url: stripeSession.url}));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: cancelUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: 'Lainie Pro - Monthly',
                            description: 'Unlimited AI Generation'
                        },
                        unit_amount: 1099,
                        recurring: {
                            interval: 'month'
                        },
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId,
            }
        });

        return new NextResponse(JSON.stringify({url: stripeSession.url}))


    } catch (error) {
        console.log('Stripe Error', error);
        return new NextResponse('Internal error', {status: 500});
    }
}