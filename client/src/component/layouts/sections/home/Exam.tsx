import  { useEffect, useState } from 'react'
import type { Exam as ExamType } from "../../../../types/index"
import ExamCard from '../../../card/ExamCard'
import axios from 'axios'
type ExamProp ={
    totalItem?:number
}

function Exam({totalItem=0}:ExamProp) {
    const [exams, setExams] = useState<ExamType[]>([])
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL
        const fetchExams = async ()=>{
            const exams = await axios.get(`${apiUrl}/exams`)
             if(totalItem ==0){
            setExams(exams.data)
            return
        }
        setExams(exams.data.slice(0, 3))
        }
        fetchExams()
       
    }, [])

    return (
        <div className='mx-24 my-12 flex flex-col items-center gap-5'>
            <h3 className='font-bold text-[40px] text-primary-black-pearl mb-[30px]'>Available Exams</h3>
            <div className='grid gap-5 grid-cols-3 place-items-center '>
                {
                    exams.map((exam, index) => (
                        <ExamCard key={index} exam={exam} index={index}/>
                    ))
                }
            </div>
        </div>

    )
}

export default Exam