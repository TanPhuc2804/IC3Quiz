import React, { useEffect, useState } from 'react'
import type { Exam as ExamType } from "../../../types/index"
import { exams as examsData } from '../../../data'
import ExamCard from '../../card/ExamCard'
import ButtonViewMore from '../../button/ButtonViewMore'
import { motion } from "framer-motion"

type ExamProp ={
    totalItem?:number
}

function Exam({totalItem=0}:ExamProp) {
    const [exams, setExams] = useState<ExamType[]>([])
    useEffect(() => {
        if(totalItem ==0){
            setExams(examsData)
            return
        }
        setExams(examsData.slice(0, 4))
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