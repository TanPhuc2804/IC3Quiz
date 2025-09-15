import React, { useEffect, useState, useRef } from 'react'
import { questions as questionData } from '../../../data'
import type { Question, Exam as ExamType, ResultQuestionType, ResultsType } from '../../../types'
import { useLocation } from 'react-router'
import TestNavigation from '../../../component/layouts/sections/exam-test/TestNavigation'
import QuestionComponent from '../../../component/card/Question'
import QuestionContext from '../../../contexts/QuestionContext'
import ItemQuestionContext from '../../../contexts/ItemQuestionContext'
import { ModeEnum, QuestionType } from '../../../types/enums'

type QuestionFilter = {
    id: number,
    question: number
}

type CountQuestionType = {
    id: number,
    isDone: boolean
}

function PracticePage() {
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
    //set exam data
    useEffect(() => {
        const { exam, mode } = location.state
        setExam(exam)
        setMode(mode)
        setQuestions(questionData)
    }, [])

    //filter data
    useEffect(() => {
        const questionFilter = questions.map(({ id, question }) => ({ id, question }))
        setQuestionsFliter(questionFilter)
        setIsDone(mode === ModeEnum.TRAINING)
    }, [questions])
    console.log(results)
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

    console.table(results)

    return (
        <QuestionContext.Provider value={{ questionRefs, scrollToQuestion }}>
            <ItemQuestionContext.Provider value={{ itemRef: itemQuestionRefs, changBgItemQuestion }}>
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
                                        <QuestionComponent key={index} question={question} setResults={setResults} setCountQuestionResult={setCountQuestionResult} mode={mode} />
                                        <hr className='border-t border-gray-300 opacity-50' />
                                    </div>
                                ))
                            }

                        </div>
                        <div className='sticky top-5 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] p-4 max-w-[200px] max-h-[600px]'>
                            <TestNavigation duration={exam?.duration ?? 0} questionsProp={questionsFilter} isDone={isDone} />
                        </div>
                    </div>
                </div>
            </ItemQuestionContext.Provider>
        </QuestionContext.Provider>
    )
}

export default PracticePage