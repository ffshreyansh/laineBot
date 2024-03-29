import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutComponent = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-20% 0px',
  });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 200, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };




  return (
    <motion.div
      className='w-full py-8 lg:py-20 flex flex-col lg:flex-row-reverse items-center justify-start lg:justify-between gap-8 lg:gap-0 h-fit'
      ref={ref}
      id='about'
    >
      <motion.div
        className='flex flex-col text-center lg:text-left items-start w-full lg:w-1/2 h-fit justify-center gap-4 lg:gap-10 px-3 lg:px-8'
        variants={fadeInUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ damping: 10, duration: 0.8 }} 
      >
        <h1 className='font-bold text-2xl lg:text-4xl mx-auto lg:mx-0'>About Dr. Lainie Bot</h1>
        <p className="text-sm lg:text-xl text-muted-foreground">The journey to mental well-being is unique for each individual. That's why we've crafted an AI chatbot that goes beyond just conversation – it's a companion dedicated to supporting you on your quest for serenity.
          <br /> <br /> <strong>Her mission is simple:</strong> to provide a safe and empathetic space where you can openly express your thoughts and feelings. Lainie is more than just a chatbot; it's a virtual confidant, always ready to lend an understanding ear and offer guidance in times of need.
        </p>
      </motion.div>
      <motion.div
        id='about'
        className='w-full lg:w-1/2 flex flex-col justify-center h-fit'
        variants={fadeInUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ damping: 10, duration: 0.8 }}
      >
        <img src="/lif.svg" className='mx-auto w-2/3 lg:ml-0 lg:mr-auto my-auto' alt="" />
      </motion.div>
    </motion.div>
  )
}

export default AboutComponent
