import { Header } from '@/components/header'
import { SidebarDesktop } from '@/components/sidebar-desktop'
import Head from 'next/head'
import Script from 'next/script'

const ChatLayout = async ({ children })=> {
  return (
    <div className="relative flex h-screen overflow-hidden">
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
      <SidebarDesktop />
      <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        <Header/>
        {children}
      </div>
    </div>
  )
}

export default ChatLayout
