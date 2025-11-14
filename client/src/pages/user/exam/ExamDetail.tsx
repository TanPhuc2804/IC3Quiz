import  { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useParams } from "react-router-dom";
import type { Exam_Result, Exam as ExamType } from '../../../types'
import ButtonDefauld from '../../../component/button/ButtonDefauld'
import ExamDetailCard from '../../../component/card/ExamDetailCard'
import { motion } from "framer-motion"
import axios from 'axios'
import ResultExamCard from '../../../component/card/ResultExamCard';
function ExamDetail() {
    const [exam, setExam] = useState<ExamType>()
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [result, setResult] = useState<Exam_Result[]>([])

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL
        axios.get(`${apiUrl}/users/result-detail/${exam?._id}`, { withCredentials: true })
            .then(res => res.data)
            .then(data => {
                setResult(data)
            })
    }, [exam?._id])
    useEffect(() => {
        const { exam } = location.state
        if (!exam) {

            console.log(params)
            const apiUrl = import.meta.env.VITE_API_URL
            const fetchExam = async () => {
                const response = await axios.get(`${apiUrl}/exams/${params.id}`)
                setExam(response.data)
            }
            fetchExam()
        }
        setExam(exam)
    }, [])

    const handlePracticeExam = (mode: string) => {
        navigate(`practice`, { state: { exam, mode: mode } })
    }

    return (
        <div className="mx-24 my-14">
            {/* Tiêu đề */}
            <motion.h2
                className="font-bold text-[30px]"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
            >
                {exam?.content}
            </motion.h2>

            {/* Mô tả */}
            <motion.p
                className="text-[20px] mb-[30px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                Prepare for certification with this practice exam
            </motion.p>

            <div className="flex flex-col justify-center items-center">
                {/* Nhóm nút */}
                <motion.div
                    className="flex items-center justify-center gap-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <ButtonDefauld
                        height="50px"
                        text="Training Mode"
                        text_size={20}
                        width="200px"
                        text_color="white"
                        border_color="white"
                        haveMotion={true}
                        onClick={() => { handlePracticeExam("training") }}
                    />
                    <ButtonDefauld
                        height="50px"
                        text="Test Mode"
                        text_size={20}
                        width="200px"
                        text_color="white"
                        border_color="white"
                        haveMotion={true}
                        onClick={() => { handlePracticeExam("test") }}
                    />
                </motion.div>

                {/* Thẻ chi tiết bài kiểm tra */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <ExamDetailCard exam={exam} />
                </motion.div>
                {
                    result.length > 0 &&
                    <div className='mt-[60px] w-[800px] text-[20px] shadow-2xl border-2 rounded-[10px] border-gray-100 p-[20px] '>
                        <h3 className='font-bold text-[25px] mb-[20px]'>Danh sách kết quả</h3>

                        <ResultExamCard resultsData={result} />
                    </div>
                }

            </div>
        </div>
    );
}

export default ExamDetail