import React, { useEffect, useState, useRef } from 'react'
import { questions as questionData } from '../../../data'
import type { Question, Exam as ExamType, ResultQuestionType, ResultsType } from '../../../types'
import { useLocation } from 'react-router'
import TestNavigation from '../../../component/layouts/sections/exam-test/TestNavigation'
import QuestionComponent from '../../../component/card/Question'
import QuestionContext, { useQuestionContext } from '../../../contexts/QuestionContext'

type QuestionFilter = {
    id: number,
    question: number
}


function PracticePage() {

    const [exam, setExam] = useState<ExamType>()
    const [questions, setQuestions] = useState<Question[]>([])
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [questionsFilter, setQuestionsFliter] = useState<QuestionFilter[]>([])
    const [results,setResults] = useState<ResultsType[]>([])
    const location = useLocation()
    useEffect(() => {
        const { exam } = location.state
        setExam(exam)
        setQuestions(questionData)
    }, [])
    useEffect(() => {
        const questionFilter = questions.map(({ id, question }) => ({ id, question }))
        setQuestionsFliter(questionFilter)
    }, [questions])

    const scrollToQuestion = (id: number) => {
        const element = questionRefs.current[id]
        if(!element)
            return
        element?.scrollIntoView({ behavior: "smooth", block: "center" })
        element.classList.add("border-2", "border-blue-500", "rounded-lg");

        setTimeout(() => {
            element.classList.remove("border-2", "border-blue-500", "rounded-lg");
        }, 1500);
    }

    console.log(results)

    return (
        <QuestionContext.Provider value={{ questionRefs, scrollToQuestion }}>
            <div className='bg-gray-200 px-3 pt-8 pb-20'>
                <div className='text-center text-[20px] font-bold p-[10px]'>
                    {exam?.content}
                </div>
                <div className='grid grid-cols-7 gap-4'>
                    <div className='col-span-6 border-[1px] rounded-[0.65rem] p-[1rem] border-[#e0e0e0] bg-white shadow-[0_4px_0_0_rgba(143,156,173,0.2)]'>
                        {
                            questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    ref={(el) => {
                                        questionRefs.current[question.id] = el;
                                    }}
                                >
                                    <QuestionComponent key={index} question={question} setResults={setResults}  />
                                    <hr className='border-t border-gray-300 opacity-50' />
                                </div>
                            ))
                        }

                    </div>
                    <div className='sticky top-5 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] p-4 max-w-[200px] max-h-[600px]'>
                        <TestNavigation questionsProp={questionsFilter} />
                    </div>
                </div>
            </div>
        </QuestionContext.Provider>
    )
}

export default PracticePage