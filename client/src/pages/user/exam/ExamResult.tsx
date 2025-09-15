import React, { useEffect, useMemo, useState } from 'react'
import type { ResultsType, Exam_Result } from '../../../types'
import { results } from '../../../data'
import ButtonDefauld from '../../../component/button/ButtonDefauld'
import { Button } from 'antd'
import ExamResultCard from '../../../component/card/ExamResultCard'
import StatisticsResult from '../../../component/card/StatisticsResult'
import TableSatisticsResult from '../../../component/card/TableSatisticsResult'

function ExamResult() {
    const [examResult, setExamResult] = useState<Exam_Result>()
    const [questionsResult, setQuestionsResult] = useState<ResultsType[]>([])
    const total_correct = useMemo(() => {
        return questionsResult.reduce((count, item) => {
            if (Array.isArray(item.user_answer)) {
                const allCorrect = item.user_answer.every(ans => ans.isCorrect)
                return count + (allCorrect ? 1 : 0)
            }
            return count + (item.user_answer?.isCorrect ? 1 : 0)
        }, 0)
    }, [questionsResult])

    useEffect(() => {
        // fetch data 
        setExamResult(results)
        setQuestionsResult(results.result_detail)
    }, [])
    console.log(questionsResult)
    return (
        <div>
            <div className='bg-gray-200 px-3 pt-8 pb-20'>

                <div className='grid grid-cols-7 gap-4'>
                    <div className='col-span-5 border-[1px] rounded-[0.65rem] p-[1rem] border-[#e0e0e0] bg-white shadow-[0_4px_0_0_rgba(143,156,173,0.2)]'>
                        <h2 className=' text-[24.8px] font-bold p-[10px] leading-1 mb-5'>
                            Kết quả kiểm tra của: {examResult?.exam.content}
                        </h2>
                        <div>
                            <Button>Quay về trang đề thi</Button>
                        </div>

                        <div className='grid grid-cols-7 gap-4 mb-5 justify-between'>
                            <div className='col-span-2 mr-[50px] '>
                                <ExamResultCard accurary_percentage={examResult?.accurary_percentage ?? 0} submit_time={examResult?.submit_time ?? 0} total_correct={total_correct} total_content={examResult?.total_content ?? 0} />
                            </div>
                            <div className='col-span-5 '>
                                <div className='flex flex-row justify-around'>
                                    <StatisticsResult status={true} number={total_correct} content='Trả lời đúng' />
                                    <StatisticsResult status={false} number={examResult?.total_content??0 - total_correct} content='Trả lời sai' />
                                    {/* <StatisticsResult status={true} number={total_correct} content='Trả lời đ'/> */}
                                </div>

                            </div>
                        </div>
                        <div className=' mb-5'>
                            <p className='font-bold text-[17px] my-[20px]'>Phân tích chi tiết</p>
                            
                            <div>
                                <TableSatisticsResult questions={questionsResult}/>
                            </div>
                        </div >
                        <div className=' mb-5'>
                            Đáp án
                            <div>
                                Bảng danh sách câu hỏi
                            </div>
                        </div>
                    </div>
                    <div className='sticky top-5 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] p-4 w-[400px] max-h-[600px]'>
                        Phan tan phuc
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamResult