import { useEffect, useState } from 'react'
import ButtonSubmit from '../../../button/ButtonSubmit'
import TestQuestionListItem from '../../../card/TestQuestionListItem'
import { useNavigate, useParams } from 'react-router'
import type { Exam, Exam_Result, ResultsType } from '../../../../types'
import { QuestionType } from '../../../../types/enums'
import axios from 'axios'

type QuestionFilter = {
    id: number,
    question: number
}

type TestNavigationProp = {
    questionsProp: QuestionFilter[],
    isDone: boolean,
    onClick?: (index: number) => void,
    duration: number,
    results: ResultsType[],
    exam: Exam
}
const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const changeMinutesToSeconds = (minutes: number) => minutes * 60

function calculateResult(details: ResultsType[], exam: Exam, submit_time: number): Exam_Result {

    let score = 0;
    const total_content = details.length;
    console.log("calculateResult - details:", details, total_content)
    details.forEach((q) => {
        if (q.question_type === QuestionType.NORMAL) {
            ``
            // normal chỉ có 1 answer object
            if (q.user_answer && !Array.isArray(q.user_answer) && q.user_answer.isCorrect) {
                score += 1;
            }
        } else {
            // classify, multiple, drop_match => tất cả phải đúng
            if (Array.isArray(q.user_answer)) {
                const allCorrect = q.user_answer?.every((ans: any) => ans.isCorrect);
                if (allCorrect) {
                    score += 1;
                }
            }

        }
    });

    const accuracy_percentage = +(score / total_content * 100).toFixed(1);
    const error_percentage = +(100 - accuracy_percentage).toFixed(1);

    return {
        score: score ?? 0,
        accurary_percentage: isNaN(accuracy_percentage) ? 0 : accuracy_percentage,
        error_percentage: isNaN(error_percentage) ? 0 : error_percentage,
        total_content,
        user_id: 1,
        exam: exam,
        result_detail: details,
        submit_time
    };
}


function TestNavigation({ questionsProp, isDone, duration, results, exam }: TestNavigationProp) {
    const [timer, setTimer] = useState(0)
    const maxDuration = changeMinutesToSeconds(duration)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const timer = setInterval(() => {
            setTimer(pre => {
                const newSenconds = pre + 1
                //newSenconds === maxDuration
                if (newSenconds === maxDuration) {
                    alert("Het thời gian")
                    //handleSubmit()
                }
                return newSenconds
            })
        }, 1000)
        timer
        return () => clearInterval(timer)
    }, [])

    const handleSubmit = () => {
        const resultExam = calculateResult(results, exam, timer)

        const apiUrl = import.meta.env.VITE_API_URL
        axios.post(`${apiUrl}/users/save-result`, { ...resultExam, exam: resultExam.exam._id }, { withCredentials: true })
            .then(response => {
                console.log(response.data)
                navigate(`/exams/${id}/result`, { state: { results: resultExam } })
            })
            .catch(error => {
                console.log(error)
            });

    }

    return (
        <div className='text-[18px]'>
            <p>Thời gian làm bài: </p>
            <p className='font-bold text-[20px] mb-2'>{formatTime(timer)}</p>
            <ButtonSubmit disable={isDone} handleSubmit={handleSubmit} />
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