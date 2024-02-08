'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link'
import React from 'react'

const SuccessPage = () => {
  const {isSignedIn} = useAuth();
  return (
    (isSignedIn && <div className='w-full h-screen flex items-center justify-center'>
        <div className='text-center flex flex-col gap-4'>
            <img src="/success.gif" alt="success icon" className='mx-auto' />
            <h2 className='text-3xl font-bold'>Payment Successful</h2>
            <p>Enjoy your session with Dr. Lainie</p>
            <Link href={'/chat'} className='w-full'>
            <Button variant="home" className='w-full'>Continue to Laine</Button>
            </Link>
        </div>
    </div>)
  )
}

export default SuccessPage