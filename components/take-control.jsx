import React from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'

const TakeControl = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-20% 0px',
    });

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 200, scale: 0.5 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
    

    return (
        <div className='w-full py-10' ref={ref}>
            <div className='mx-auto'>
                <h3 className='font-bold text-2xl lg:text-3xl mx-auto text-center mb-5'>Take Control of Your mental wellbeing Journey</h3>
            </div>

            <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 items-start justify-between w-full'>
                <motion.div className='flex flex-col items-center gap-3 p-4 w-full lg:w-1/4 h-fit lg:h-fit rounded-md'
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{  damping: 10, duration: 0.5 }}
                >
                    <div className='w-52 h-52'>
                        <img src="/anon.svg" alt="bot image" className='object-cover' />
                    </div>
                    <div className='text-center w-full'>
                        <span className='font-bold text-2xl'>Anonymous and Secure</span>
                        <p className='text-lg text-muted-foreground mt-2'>We prioritize your privacy. Lainie offers a secure and confidential platform, allowing you to express yourself freely without the fear of judgment. Your well-being is our top priority.</p>
                    </div>
                </motion.div>
                <motion.div className='flex flex-col items-center gap-3 p-4 w-full lg:w-1/4 bg-] h-fit lg:h-fit rounded-md'
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{  damping: 10, duration: 0.5, delay: 0.2 }}
                >
                    <div className='w-52 h-52'>
                        <img src="/tailored.svg" alt="bot image" className='object-cover' />
                    </div>
                    <div className='text-center w-full'>
                        <span className='font-bold text-2xl'>Tailored Conversations</span>
                        <p className='text-lg mt-2 text-muted-foreground'>Our AI is trained to understand and adapt to your unique communication style. This ensures that each conversation feels natural and personalized, creating a more effective and supportive experience.</p>
                    </div>
                </motion.div>
                <motion.div className='flex flex-col items-center gap-3 p-4 w-full lg:w-1/4 bg-] h-fit lg:h-fit rounded-md'
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ damping: 10, duration: 0.5, delay: 0.4 }}
                >
                    <div className='w-52 h-52'>
                        <img src="/freind.svg" alt="bot image" className='object-cover' />
                    </div>
                    <div className='text-center w-full'>
                        <span className='font-bold text-2xl'>Mindful Guidance</span>
                        <p className='text-lg mt-2 text-muted-foreground'>Lainie provides gentle nudges and helpful resources based on your conversations. It's not just about talking; it's about empowering you with tools and insights to enhance your mental well-being.</p>
                    </div>
                </motion.div>
                <motion.div className='flex flex-col items-center gap-3 p-4 w-full lg:w-1/4 bg-] h-fit lg:h-fit rounded-md'
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{  damping: 10, duration: 0.5, delay: 0.6 }}
                >
                    <div className='w-52 h-52'>
                        <img src="/learn.svg" alt="bot image" className='object-cover' />
                    </div>
                    <div className='text-center w-full '>
                        <span className='font-bold text-2xl'>Continuous Learning</span>
                        <p className='text-lg mt-2 text-muted-foreground'>Our AI is constantly learning and evolving. This commitment to improvement allows us to better understand your needs over time, making each interaction more valuable and insightful.</p>
                    </div>
                </motion.div>
            </div>

        </div>
    )
}

export default TakeControl