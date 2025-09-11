import React, { useEffect, useState } from 'react'
import ButtonSubmit from '../../../button/ButtonSubmit'
import TestQuestionListItem from '../../../card/TestQuestionListItem'


type QuestionFilter = {
    id: number,
    question: number
}

type TestNavigationProp = {
    questionsProp: QuestionFilter[],
    isDone:boolean,
    onClick?: (index: number) => void,
    duration:number
}
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const changeMinutesToSeconds = (minutes:number)=>minutes*60

function TestNavigation({ questionsProp,isDone,duration }: TestNavigationProp) {
    const [timer, setTimer] = useState(0)
    const maxDuration = changeMinutesToSeconds(0.25)
    useEffect(() => {
        const timer = setInterval(() => {
            setTimer(pre => {
                const newSenconds = pre+1
                if(newSenconds === maxDuration){
                    alert("Het thời gian")
                }
                return newSenconds
            })
        }, 1000)
        timer
        return () => clearInterval(timer)
    }, [])

    return (
        <div className='text-[18px]'>
            <p>Thời gian làm bài: </p>
            <p className='font-bold text-[20px] mb-2'>{formatTime(timer)}</p>
            <ButtonSubmit disable={isDone} />
            <p className='text-sm font-bold italic text-yellow-400 mb-4'><b>Chú ý:</b> bạn có thể Click vào số thứ tự trong bài để đánh dấu review</p>
            <p className='font-bold text-[18px] mb-4'>Câu hỏi:</p>
            {
                questionsProp.map((question, index) => (
                    <TestQuestionListItem key={index} question={question} />
                ))
            }
        </div>
    )
}

export default TestNavigation