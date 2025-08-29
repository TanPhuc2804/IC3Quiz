import React, { useState } from 'react'
import { motion } from "motion/react"
import { Link } from 'react-router'

type NavItemProps = {
    label: React.ReactNode;
    link:string
};

function NavItem({ label,link }: NavItemProps) {
    const [isHover, setIsHover] = useState(false)
    return (
        <>
            <motion.div
                className='relative'
                onHoverStart={() => { setIsHover(true) }}
                onHoverEnd={() => { setIsHover(false) }}
            >
                <Link to={link} className='text-primary-alabaster'>{label}</Link>
                <motion.div
                    className='absolute rounded-2xl
                     bg-primary-blue-ribbon left-0 bottom-[-1px] h-[3px] w-full'
                    initial={{scaleX:0}}
                    animate={isHover ?{ scaleX:1,transformOrigin:" left" }: {scaleX:0,transformOrigin:"right"}}
                    transition={{duration:0.4,ease:"easeInOut"}}
                >

                </motion.div>
            </motion.div>

        </>
    );
}

export default NavItem