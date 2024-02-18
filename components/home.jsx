import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '@clerk/nextjs';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-20% 0px',
  });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 200, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const fadeInUpVariants2 = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };
  const {isSignedIn} = useAuth();
  return (
    <div
      className='w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between h-screen' ref={ref}>
      <motion.div
        className='flex flex-col text-center lg:text-left items-start w-full lg:w-1/2 h-fit lg:h-fit justify-center gap-4 lg:gap-10 px-3 lg:px-8'
       
      >
        <motion.h1 className='font-bold text-4xl lg:text-6xl mx-auto lg:mx-0'
         variants={fadeInUpVariants2}
         initial="hidden"
         animate={inView ? "visible" : "hidden"}
         transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.2 }}

        >Welcome to Lainie.</motion.h1>
        <motion.p className="text-lg lg:text-xl text-muted-foreground  mx-auto lg:mx-0"
         variants={fadeInUpVariants2}
         initial="hidden"
         animate={inView ? "visible" : "hidden"}
         transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.2, delay: 0.2 }}

        >Your 24/7
          mental health support coach / friend.</motion.p>
        <motion.a href={isSignedIn ? '/chat' : '/sign-up'} className='w-full lg:w-1/2'
         variants={fadeInUpVariants2}
         initial="hidden"
         animate={inView ? "visible" : "hidden"}
         transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.2, delay: 0.4 }}
        >
          <button className='w-1/2 h-10 bg-[#f364b8] font-semibold text-white rounded-lg shadow-md hover:scale-105 transition'>Get Started</button>
        </motion.a>
      </motion.div>
      <motion.div
        className='w-full lg:w-1/2 flex flex-col justify-center h-fit lg:h-fit'
        variants={fadeInUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ damping: 10, duration: 0.8 }}
      >
        <img src="/anxiet.svg" className='mx-auto w-3/4 md:w-1/2 lg:w-3/4 lg:ml-auto lg:mr-0 my-auto' alt="" />
      </motion.div>
    </div>
  )
}

export default Home
