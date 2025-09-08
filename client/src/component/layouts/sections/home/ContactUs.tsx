import { ConfigProvider, Input } from 'antd'
import React from 'react'
import ButtonDefauld from '../../../button/ButtonDefauld'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
function ContactUs() {
    const formVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,

            },
        },
    };

    // Variants cho từng input
    const variants = {
        hidden: { y: 50, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
        },

    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        /* here is your component tokens */
                        inputFontSize: 25
                    },
                },
            }}
        >
            <div className='mt-[10px] mx-[96px] my-[30px]'>
                <motion.h3
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className='font-bold text-[50px] text-primary-black-pearl mb-[30px]'
                >
                    Contact Us
                </motion.h3>

                <div className='flex gap-7 items-center'>
                    {/* Form */}
                    <motion.div
                        className="flex-1 flex flex-col gap-2.5 text-white"
                        variants={formVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <motion.div variants={variants}>
                            <Input prefix={<FontAwesomeIcon icon={faUser} size="sm" />} placeholder="Name" />
                        </motion.div>
                        <motion.div variants={variants}>
                            <Input prefix={<FontAwesomeIcon icon={faEnvelope} size="sm" />} placeholder="Email" />
                        </motion.div>
                        <motion.div variants={variants}>
                            <Input.TextArea placeholder="Message" />
                        </motion.div>
                        <motion.div
                            variants={variants}
                            whileHover={{scale:1.1,rotate:1}}
                            transition={{duration:0.3}}
                        >
                            <ButtonDefauld
                                border_color='white'
                                text="Submit"
                                text_size={20}
                                height={"50px"}
                                width={"100%"}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="flex-1 overflow-hidden rounded-2xl"

                    >
                        <img
                            src="/contact-us-illustrations.svg"
                            className="h-[300px] w-full object-contain"
                        />
                    </motion.div>

                </div>
            </div>
        </ConfigProvider>
    )
}

export default ContactUs