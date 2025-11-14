
import type { Exam } from '../../types'

type ExamDetailType = {
    exam?: Exam
}
function ExamDetailCard({ exam }: ExamDetailType) {
    return (
        <div className='mt-[20px] w-[600px] text-[20px] shadow-2xl border-2 rounded-[10px] border-gray-100 p-[20px] '>
            <h3 className='font-bold text-[25px] mb-[20px]'>Exam Details</h3>
            <p className='mb-[10px]'><b>Description</b>: {exam?.description}</p>
            <p className='mb-[10px]'><b>Number of Questions</b>: {exam?.total_question}</p>
            <p className='mb-[10px]'><b>Duration</b>: {exam?.duration} mins</p>
        </div>
    )
}

export default ExamDetailCard