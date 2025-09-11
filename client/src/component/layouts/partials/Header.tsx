import NavItem from './NavItem'
import { motion } from "motion/react"
function Header() {
  return (
    <div className='bg-primary-black-pearl flex justify-between items-center py-2 px-24 '>
      <motion.img
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        src='/logo-ic3-quiz-removebg-white.png'
        className='h-[100px] w-[120px]'
      />
      <motion.div
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className='flex gap-7.5 text-[16px]'
      >
        <NavItem label="Trang chủ" link='/' />
        <NavItem label="Bài kiểm tra IC3" link='/exams' />
        <NavItem label="Về chúng tôi" link='/about-us' />
        <NavItem label="Đăng nhập/ Đăng ký" link='/login' />

      </motion.div>

    </div>
  )
}

export default Header