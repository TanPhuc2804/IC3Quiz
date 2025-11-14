
import type { Exam } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faClock, faUser } from '@fortawesome/free-regular-svg-icons'
import ButtonDefauld from '../button/ButtonDefauld'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router'
type ExamCardProp = {
  exam: Exam,
  index?:number
}

function ExamCard({ exam,index=0 }: ExamCardProp) {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate(`/exams/${exam._id}`,{state:{exam:exam}})
    window.scrollTo(0,0)
  }

  return (
    <motion.div
      className='h-[450px] flex flex-col items-baseline justify-center pt-[30px] pb-[20px] pl-[30px] pr-[20px] w-[300px] border-2 rounded-[10px] shadow-2xl border-primary-blue-bayoux'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut",delay:index*0.1 }}
      viewport={{ once: false, amount: 0.2 }} 
    >
      <motion.img
        className='h-[100px] w-[100px] mx-auto my-[10px]'
        src={exam.image_url}
        alt={'Hinh ' + exam.content}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      />
      <div className='font-bold text-[20px] min-h-[60px]'>{exam.content}</div>
      <div className='text-[15px] mt-[10px] min-h-[100px]'>{exam.description}</div>
      <div className="grid gap-2 w-[200px]">
        <div className="flex justify-between gap-3">
          <span><FontAwesomeIcon icon={faClock} /> Duration:</span>
          <span>{exam.duration}</span>
        </div>
        <div className="flex justify-between">
          <span><FontAwesomeIcon icon={faUser} /> Total User:</span>
          <span>{exam.total_user}</span>
        </div>
        <div className="flex justify-between">
          <span><FontAwesomeIcon icon={faCircleQuestion} /> Total Question:</span>
          <span>{exam.total_question}</span>
        </div>
      </div>
      <motion.div
        className='mx-auto my-[10px]'
        whileHover={{ scale: 1.1, rotate: 1 }} 
        transition={{ type: "spring", stiffness: 300 }}
      >
        <ButtonDefauld
          height='40px'
          text='Start Exam'
          text_size={20}
          width='150px'
          text_color='white'
          border_color='white'
          onClick={handleClick}
        />
      </motion.div>
    </motion.div>
  );
}

export default ExamCard