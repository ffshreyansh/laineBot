import Footer from '@/components/footer'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'

const LandingLayout = ({ children }) => {

  return (
    <main className="h-full bg-white overflow-y-auto w-full">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        {children}
      </div>
      <Footer />
    </main>
  )
}

export default LandingLayout