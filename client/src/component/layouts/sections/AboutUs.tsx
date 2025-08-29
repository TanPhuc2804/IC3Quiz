import React from 'react'
import AvatarUser from '../../avatar/Avatar'
import TimeLineStory from '../../timeline/TimeLine'
import Statistics from './Statistics'
import { motion } from "framer-motion"
function AboutUs() {
  return (
    <div className="mt-[50px] mx-[96px]">
      <div>
        <div className="flex justify-between items-center gap-16">
          <motion.h3
            initial={{ x: "-100vw", rotate: -90, opacity: 0 }}
            animate={{ x: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-primary-black-pearl w-[300px] h-[200px] text-[80px] mr-[30px] font-bold title-about-us"
          >
            About IC3Quiz
          </motion.h3>

          <motion.img
            initial={{ x: "100vw", rotate: 90, opacity: 0 }}
            animate={{ x: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1, boxShadow: "#061b37 0px 10px 18px", rotate: 2, transition: { duration: 0.5, ease: "easeOut" } }}
            viewport={{ once: false, amount: 0.2 }}
            style={{ transformOrigin: "center" }}
            src="/image-about-us.png"
            className="w-[700px] h-[450px] rounded-2xl"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between my-[50px] gap-40">
        <div className="flex-1">
          <div className="mb-[30px]">
            <motion.h3
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.05 }}
              className="font-bold text-[40px] text-primary-black-pearl mb-[30px]"
            >
              Mission
            </motion.h3>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
              className="text-[25px] text-primary-black-pearl"
            >
              Our mission is to provide an engaging and effective platform for
              interactive quizzes to help users develop their knowledge and skills
              across a wide range of subjects.
            </motion.p>
          </div>

          <div>
            <motion.h3
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
              className="font-bold text-[40px] text-primary-black-pearl mb-[30px]"
            >
              Team
            </motion.h3>
            <div className="mt-[20px] flex gap-8">
              {[1, 2, 3].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.2 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.5, ease: "easeOut" } }}

                  className="flex flex-col items-center"
                >
                  <AvatarUser />
                  <p className="font-bold text-[20px]">Phan Tan Phuc</p>
                  <p className="text-[20px]">Fullstack Developer</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="font-bold text-[40px] text-primary-black-pearl mb-[30px]">
              Our Story
            </h3>
            <TimeLineStory />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="font-bold text-[40px] text-primary-black-pearl mb-[30px]">
              Statistics
            </h3>
            <div className="flex gap-10 items-baseline">
              <Statistics data="10k+" content="Users Served" />
              <Statistics data="5k+" content="Questions In Database" />
              <Statistics data="92%" content="Success Rate" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs