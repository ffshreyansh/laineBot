'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
    const {isSignedIn} = useAuth();
  return (
    (isSignedIn && <div className='w-full h-screen flex items-center justify-center'>
        <div className='text-center flex flex-col gap-4'>
            <img src="/errr.gif" alt="success icon" className='mx-auto' />
            <h2 className='text-3xl font-bold'>Uh Oh! Error Occured</h2>
            <p>Please go back to homepage and continue again</p>
            <Link href={'/'} className='w-full'>
            <Button variant="home" className='w-full'>Return to Home</Button>
            </Link>
        </div>
    </div>)
  )
}

export default ErrorPage