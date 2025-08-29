import React from 'react'
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

type ButtonViewMoreType = {
  onClick?:()=>void
}
function ButtonViewMore({onClick}:ButtonViewMoreType) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center gap-2 px-5 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-full overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
        View More
      </span>
      <motion.span
        className="relative z-10"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
      </motion.span>
    </motion.button>
  );
}

export default ButtonViewMore