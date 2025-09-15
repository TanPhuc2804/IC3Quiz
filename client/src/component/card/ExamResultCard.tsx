import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type ExamResultCardType = {
    accurary_percentage: number,
    submit_time: number,
    total_content: number,
    total_correct: number
}

function ExamResultCard({ accurary_percentage, submit_time, total_content, total_correct }: ExamResultCardType) {
    console.log({ accurary_percentage, submit_time, total_content, total_correct })
    return (
        <div className='flex flex-col justify-around h-[250px] bg-[#f8f9fa] border-1 border-[#efefef] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] mt-[20px] py-[24px] px-[16px]'>
            <div>
                <span className='w-[25px]'> <FontAwesomeIcon icon={faCheck} /> </span>
                <span className=' mx-[8px] text-[17px] w-[100px] leading-2'>Kết quả làm bài:</span>
                <span className='font-bold'> {total_correct}/ {total_content}</span>
            </div>
            <div className='flex flex-row justify-around'>
                <span className='w-[25px]'> <FontAwesomeIcon icon={faBullseye} /> </span>
                <span className=' mx-[8px] text-[16px] h-fit w-fit'>Độ chính xác (đúng/ tổng):</span>
                <span className='font-bold'> {accurary_percentage}%</span>
            </div>
            <div className='flex flex-row justify-around'>
                <span className='w-[25px]'> <FontAwesomeIcon icon={faClock} /> </span>
                <span className=' mx-[8px] text-[16px]'>Thời gian hoàn thành:</span>
                <span className='font-bold'> {submit_time}</span>
            </div>
        </div>
    )
}

export default ExamResultCard