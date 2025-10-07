import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion";
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
        <motion.div
            className="flex flex-col justify-around h-[250px] bg-[#f8f9fa] border border-[#efefef] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] mt-[20px] py-[24px] px-[16px]"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex items-center">
                <span className="w-[25px]">
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className="mx-[8px] text-[17px] leading-2">Kết quả làm bài:</span>
                <span className="font-bold">{total_correct} / {total_content}</span>
            </div>

            <motion.div
                className="flex flex-row items-center justify-around"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <span className="w-[25px]">
                    <FontAwesomeIcon icon={faBullseye} />
                </span>
                <span className="mx-[8px] text-[16px] h-fit w-fit">Độ chính xác (đúng / tổng):</span>
                <span className="font-bold">{accurary_percentage}%</span>
            </motion.div>

            <motion.div
                className="flex flex-row items-center justify-around"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
            >
                <span className="w-[25px]">
                    <FontAwesomeIcon icon={faClock} />
                </span>
                <span className="mx-[8px] text-[16px]">Thời gian hoàn thành:</span>
                <span className="font-bold">{submit_time}</span>
            </motion.div>
        </motion.div>
    )
}

export default ExamResultCard