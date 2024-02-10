import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';

const NavSetting = () => {
   
    return (
       <div className={`flex items-center justify-between py-4 bg-white fixed max-w-screen-xl w-full top-0 lg:top-5 z-50 rounded-none lg:rounded-lg pr-3 lg:pr-4 pl-3 lg:pl-8 left-1/2 right-1/2 -translate-x-1/2`}>
          <Link href={'/'} className={`font-bold text-3xl`}>
            <img src="/serene.png" alt="lainie logo" width={'30%'} />
          </Link>
          <div className='items-center justify-between gap-10 font-semibold hidden lg:flex cursor-pointer'>
            <Link href={'/'} className='text-black hover:text-[#f05aad] transition-all'>Home</Link>

           <Link href={"/chat"}>
              <Button variant='nav' size='xl'>{ 'Go to Chats'}</Button>
            </Link>
          </div>
         
    
        </div>
      )
}

export default NavSetting