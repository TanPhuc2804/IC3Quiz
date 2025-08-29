import { Button, Typography } from "antd"
import ButtonDefauld from "../component/button/ButtonDefauld"
import AboutUs from "../component/layouts/sections/AboutUs"
import ContactUs from "../component/layouts/sections/ContactUs"
import { motion } from "motion/react"
import Exam from "../component/layouts/sections/Exam"
import ButtonViewMore from "../component/button/ButtonViewMore"
import { useNavigate } from "react-router"
function Home() {
  const navigate = useNavigate()
  const handleCLickViewMore = ()=>{
    navigate("/exams")

  }
  return (
    <div className="overflow-x-scroll">
      <div className="bg-primary-black-pearl h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="flex flex-col gap-6 p-[100px] text-primary-alabaster items-center"
        >
          <h1 className="font-bold text-[50px] text-center w-[600px]">Test yout Knowledge with IC3Quiz</h1>
          <p className="font-thin text-[20px] text-center  w-[400px]">Challenge youself with our interactive quizzes and enhance your skills across various topics</p>
          <ButtonDefauld text="Get Started" width={"190px"} height={"60px"} text_size={20} />
        </motion.div>
      </div>
      <Exam totalItem={4}/>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <ButtonViewMore onClick={handleCLickViewMore} />
      </motion.div>
      <AboutUs />
      <ContactUs />
    </div>
  )
}

export default Home