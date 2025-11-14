import { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import type { Question, Exam as ExamType, ResultsType, ErrorResponse } from '../../../types'
import { useLocation } from 'react-router'
import TestNavigation from '../../../component/layouts/sections/exam-test/TestNavigation'
import QuestionComponent from '../../../component/card/Question'
import QuestionContext from '../../../contexts/QuestionContext'
import ItemQuestionContext from '../../../contexts/ItemQuestionContext'
import { ModeEnum } from '../../../types/enums'
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import Loading from '../../../component/loading/Loading';
import ModalNotification from '../../../component/modal/ModalNotification';

type QuestionFilter = {
    id: number,
    question: number
}

type CountQuestionType = {
    id: number,
    isDone: boolean
}

function PracticePage() {
    // loading
    const [loading, setLoading] = useState<boolean>(true);

    // handle error 
    const [responseErr, setResponseErr] = useState<ErrorResponse | null>(null)

    //state management
    const [exam, setExam] = useState<ExamType>()
    const [mode, setMode] = useState<string>("")
    const [questions, setQuestions] = useState<Question[]>([])
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const itemQuestionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [questionsFilter, setQuestionsFliter] = useState<QuestionFilter[]>([])
    const [countQuestionResult, setCountQuestionResult] = useState<CountQuestionType[]>([])
    const [results, setResults] = useState<ResultsType[]>([])
    const [isDone, setIsDone] = useState(false)
    const location = useLocation()
    const params = useParams()
    //set exam data
    useEffect(() => {
        const { exam, mode } = location.state
        const fetchData = async () => {
            try {
                setLoading(true)
                const apiUrl = import.meta.env.VITE_API_URL;
                const questionRes = await axios.get(`${apiUrl}/questions/${params.id}`, { withCredentials: true });
                const questionData = questionRes.data;
                console.log(questionRes);
                if (!questionData || questionData.length === 0) {
                    setQuestions([]);
                } else {
                    setExam(exam);
                    setMode(mode);
                    setQuestions(questionData);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setResponseErr({
                        ...(error?.response?.data ?? {}),
                        statusCode: error?.status ?? 500
                    });
                }
                console.error("Error fetching questions:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData()
    }, [])

    useEffect(() => {
        const questionFilter = questions
            .filter((q): q is Question & { id: number; question: number } => typeof q.id === "number" && typeof q.question === "number")
            .map(({ id, question }) => ({ id, question }));
        setQuestionsFliter(questionFilter)
        setIsDone(mode === ModeEnum.TRAINING)
    }, [questions, mode])
    useEffect(() => {
        if (mode === ModeEnum.TRAINING)
            return
        if (countQuestionResult.length === questions.length) {
            setIsDone(true)
        } else {
            setIsDone(false)
        }
    }, [results])

    const scrollToQuestion = (id: number) => {
        const element = questionRefs.current[id]
        if (!element)
            return
        element?.scrollIntoView({ behavior: "smooth", block: "center" })
        element.classList.add("border-2", "border-blue-500", "rounded-lg");

        setTimeout(() => {
            element.classList.remove("border-2", "border-blue-500", "rounded-lg");
        }, 1500);
    }

    const changBgItemQuestion = (id: number, isChange: boolean) => {
        const element = itemQuestionRefs.current[id]
        if (!element) return
        if (isChange) {
            element.classList.add("bg-emerald-500", "text-white", "border-blue");
        } else {
            element.classList.remove("bg-emerald-500", "text-white", "border-blue");

        }

    }
    console.log(questions)
    if (loading)
        return (
            <motion.div
                className="flex items-center justify-center my-11 h-[250px]"
                initial={{ opacity: 0, scale: 0.95 }}     // bắt đầu mờ và nhỏ
                animate={{ opacity: 1, scale: 1 }}        // dần hiện lên
                exit={{ opacity: 0, scale: 0.95 }}        // khi biến mất (nếu dùng AnimatePresence)
                transition={{ duration: 0.4, ease: "easeInOut" }} // thời gian, hiệu ứng
            >
                <Loading />
            </motion.div>
        );

    return (
        <QuestionContext.Provider value={{ questionRefs, scrollToQuestion }}>
            <ItemQuestionContext.Provider
                value={{ itemRef: itemQuestionRefs, changBgItemQuestion }}
            >
                <AnimatePresence mode="wait">
                    {questions.length > 0 && (
                        <motion.div
                            key="exam-content"
                            className="bg-gray-200 px-3 pt-8 pb-20"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                                duration: 0.9, // kéo dài animation
                                delay: 0.25,   // chờ 0.25s rồi mới hiện
                                ease: [0.22, 1, 0.36, 1] // cubic bezier mềm mại
                            }}
                        >
                            <div className="text-center text-[20px] font-bold p-[10px]">
                                {exam?.content}
                            </div>

                            <div className="grid grid-cols-7 gap-4">
                                {/* Cột câu hỏi */}
                                <motion.div
                                    className="col-span-6 border-[1px] rounded-[0.65rem] p-[1rem] border-[#e0e0e0] bg-white shadow-[0_4px_0_0_rgba(143,156,173,0.2)]"
                                    initial={{ opacity: 0, x: -25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.6, // bắt đầu muộn hơn phần trên
                                        ease: [0.25, 0.8, 0.25, 1]
                                    }}
                                >
                                    {questions.map((question, index) => (
                                        <div
                                            key={question.id}
                                            ref={(el) => {
                                                const id = typeof question.id === "number" ? question.id : index;
                                                questionRefs.current[id] = el;
                                            }}
                                        >
                                            <QuestionComponent
                                                key={index}
                                                question={question}
                                                setResults={setResults}
                                                setCountQuestionResult={setCountQuestionResult}
                                                mode={mode}
                                            />
                                            <hr className="border-t border-gray-300 opacity-50" />
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Cột navigation */}
                                <motion.div
                                    className="sticky top-5 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] p-4 max-w-[200px] max-h-[600px]"
                                    initial={{ opacity: 0, x: 25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.8,
                                        ease: [0.25, 0.8, 0.25, 1]
                                    }}
                                >
                                    {exam && (
                                        <TestNavigation
                                            exam={exam}
                                            results={results}
                                            duration={exam.duration}
                                            questionsProp={questionsFilter}
                                            isDone={isDone}
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ItemQuestionContext.Provider>
            <ModalNotification
                isModalOpen={responseErr ? true : false}
                handleOk={() => { 
                    if(responseErr?.statusCode === 401){
                        window.location.href = '/login';
                    } else {
                        window.location.href = '/';
                    }
                }}
                handleCancel={() => {
                    setResponseErr(null);
                    window.location.href = '/';
                 }}
                error={responseErr} 
                okText={responseErr?.statusCode === 401 ? "Đăng nhập" : "Quay lại trang chủ"}
                cancelText="Hủy"
                />
        </QuestionContext.Provider>
    );
}

export default PracticePage