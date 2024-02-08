'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-20% 0px',
  });

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      message
    };

    await fetch('https://formspree.io/f/xoqgeplp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setEmail('');
    setMessage('');
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 200, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className='w-full h-fit bg-[#ffe2f3] rounded-md flex flex-col items-center justify-center mb-20 p-20 px-3  lg:p-10 lg:pb-0'  id='contact' ref={ref}>
      <motion.div
        className='w-full'
        variants={fadeInUpVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{damping: 10, duration: 0.6 }}      
      >
        <h2 className='text-2xl lg:text-3xl font-bold text-center px-3 lg:px-0'>Let's discuss your personal goals</h2>
        <div className='flex flex-col lg:flex-row items-center justify-between p-3 lg:p-10 w-full lg:w-full gap-2'>
          <form onSubmit={handleSubmit} className='flex flex-col lg:flex-col w-full lg:w-2/3 mx-auto items-center gap-5 lg:gap-4'>
            <input 
              type="email" 
              name='email' 
              value={email} 
              onChange={handleEmailChange} 
              className='w-full lg:w-3/4 h-14 rounded-md px-4 outline-none' 
              placeholder='Enter your email address' 
            />
            <textarea 
              name="message" 
              value={message} 
              onChange={handleMessageChange} 
              className='w-full lg:w-3/4 rounded-md p-4 outline-none h-28' 
              placeholder='Enter your message here'
            ></textarea>
            <button type='submit' className='w-full lg:w-1/2 h-14 rounded-md font-semibold text-white bg-[#f364b8]'>Contact Me</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
