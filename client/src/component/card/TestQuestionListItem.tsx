
import { motion } from "framer-motion"
import { useQuestionContext } from '../../contexts/QuestionContext'
import { useItemQuestionContext } from '../../contexts/ItemQuestionContext'
type QuestionFilter = {
    id: number,
    question: number
}

type TestQuestionListItemProp = {
    question: QuestionFilter
}

function TestQuestionListItem({ question }: TestQuestionListItemProp) {
    const { itemRef } = useItemQuestionContext()
    const { scrollToQuestion } = useQuestionContext()
    return (
        <motion.div
            onClick={() => scrollToQuestion(question.id)}
            id={`${question?.id}`}
            ref={(el) => { itemRef.current[question.question] = el }}
            className='text-[11px] font-bold border-[1px]  border-primary-black-pearl rounded-[3px] w-[28px] h-[25px] inline-flex justify-center items-center mr-1 mb-2 font-w  hover:bg-[#061b37] hover:text-white hover:cursor-pointer'
        //whileHover={{ backgroundColor: "#061b37", color: "#fff", cursor: "pointer" }}
        >
            {question?.question}
        </motion.div>
    )
}

export default TestQuestionListItem