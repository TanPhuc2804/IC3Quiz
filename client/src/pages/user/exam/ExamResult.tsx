import { useEffect, useMemo, useState } from 'react'
import type { ResultsType, Exam_Result, ResultQuestionType } from '../../../types'
import { Button } from 'antd'
import ExamResultCard from '../../../component/card/ExamResultCard'
import StatisticsResult from '../../../component/card/StatisticsResult'
import TableSatisticsResult from '../../../component/card/TableSatisticsResult'
import ButtonQuestion from '../../../component/button/ButtonQuestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router'
import { useParams } from "react-router-dom";
import axios from 'axios'

function shortenByWords(str: string | number, maxWords = 4): string {
    const words = str.toString().split(" ");
    if (words.length <= maxWords) return str.toString();
    return words.slice(0, maxWords).join(" ") + " ...";
}
function ExamResult() {
    const params = useParams()
    const [examResult, setExamResult] = useState<Exam_Result>()
    const [questionsResult, setQuestionsResult] = useState<ResultsType[]>([])
    const location = useLocation()
    const total_correct = useMemo(() => {
        return questionsResult?.reduce((count, item) => {
            if (Array.isArray(item.user_answer)) {
                const allCorrect = item.user_answer.every(ans => ans.isCorrect)
                return count + (allCorrect ? 1 : 0)
            }
            return count + (item.user_answer?.isCorrect ? 1 : 0)
        }, 0)
    }, [questionsResult])

    const total_omit = useMemo(() => {
        return questionsResult.filter(item => (!item.user_answer || (Array.isArray(item.user_answer) && item.user_answer.length === 0))).length
    }, [questionsResult])

    useEffect(() => {
        // fetch data 
        if (location.state) {
            const { results } = location.state
            setExamResult(results)
            setQuestionsResult(results.result_detail)
            return
        }
        //fetch data
        const fetchData = async () => {
            const apiUrl = import.meta.env.VITE_API_URL
            const response = await axios.get(`${apiUrl}/users/result/${params.id}`, { withCredentials: true })
            setExamResult(response.data)
            setQuestionsResult(response.data.result_detail)
        }
        fetchData()

    }, [])
    const getAnwser = (userAnwser: ResultQuestionType | ResultQuestionType[]) => {
        if (Array.isArray(userAnwser)) {
            return userAnwser.map((answer, index) => (
                <div key={index}>
                    <b className='text-primary-blue-ribbon'>  {shortenByWords(answer.anwser_correct ?? (index + 1))}:{" "}</b>
                    {answer.isCorrect ? (
                        <i>

                            {answer.choice} <FontAwesomeIcon color='green' icon={faCheck} />
                        </i>
                    ) : (
                        <i>
                            <del>{answer.choice}</del> <FontAwesomeIcon color='red' icon={faCircleXmark} />
                        </i>
                    )}
                </div>
            ));
        }

        return <div>
            <b className='text-primary-blue-ribbon'>  {userAnwser.anwser_correct}:{" "}</b>
            {userAnwser.isCorrect ? (
                <i>
                    {userAnwser.choice} <FontAwesomeIcon color='green' icon={faCheck} />
                </i>
            ) : (
                <i>
                    <del>{userAnwser.choice}</del> <FontAwesomeIcon color='red' icon={faCircleXmark} />
                </i>
            )}
        </div>
    }

    return (
        <div>
            <div className='bg-gray-200 px-3 pt-8 pb-20'>

                <div className='grid grid-cols-7 gap-4'>
                    <div className='col-span-5 border-[1px] rounded-[0.65rem] p-[1rem] border-[#e0e0e0] bg-white shadow-[0_4px_0_0_rgba(143,156,173,0.2)]'>
                        <h2 className=' text-[24.8px] font-bold p-[10px] leading-1 mb-5'>
                            Kết quả kiểm tra của: {examResult?.exam?.content}
                        </h2>
                        <div>
                            <Button>Quay về trang đề thi</Button>
                        </div>

                        <div className='grid grid-cols-7 gap-4 mb-5 justify-between'>
                            <div className='col-span-2 mr-[50px] '>
                                <ExamResultCard accurary_percentage={examResult?.accurary_percentage ?? 0} submit_time={examResult?.submit_time ?? 0} total_correct={total_correct} total_content={examResult?.total_content ?? 0} />
                            </div>
                            <div className='col-span-5 '>
                                <div className='flex flex-row justify-around gap-1.5'>
                                    <StatisticsResult status={true} number={total_correct} content='Trả lời đúng' />
                                    <StatisticsResult status={false} number={(examResult?.total_content ?? 0) - total_omit - total_correct} content='Trả lời sai' />
                                    <StatisticsResult status={true} minus={true} number={total_omit} content='Không trả lời' />
                                </div>

                            </div>
                        </div>
                        <div className=' mb-5'>
                            <p className='font-bold text-[17px] my-[20px]'>Phân tích chi tiết</p>

                            <div>
                                <TableSatisticsResult questions={questionsResult} />
                            </div>
                        </div >
                        <div className=' mb-5'>
                            <p className='font-bold text-[17px] my-[20px]'>Đáp án</p>
                            <div className='grid grid-cols-2 gap-3.5'>
                                {questionsResult?.map(item => (
                                    <div className='flex gap-3.5'>
                                        <ButtonQuestion size='middle' content={item.question} key={item.question_id} />
                                        <div>
                                            {getAnwser(item.user_answer ?? [])}
                                        </div>
                                    </div>
                                ))}
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