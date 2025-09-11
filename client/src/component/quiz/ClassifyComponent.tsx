import React, { useState } from 'react'
import type { ClassificationQuestion, ResultQuestionType } from '../../types'
import { ConfigProvider, Radio, type RadioChangeEvent } from 'antd'
import { ModeEnum } from '../../types/enums'

type ClassifyComponentType = {
    classify_question: ClassificationQuestion[],
    handleChange: (questionId: string | number, value: string) => void,
    answers: Record<string | number, string>,
    faulties:ResultQuestionType[],
    mode:string
}

function ClassifyComponent({ classify_question, handleChange, answers,faulties,mode}: ClassifyComponentType) {
    const classifies = Array.from(new Set(classify_question.map(item => item.classify)))

    const findValue = (classify:string,id:number)=>{
        return faulties.findIndex(item=>(item.choice === classify && item.id_classify ===id))
    }

    const getClassname = (answerId:string,id:number)=>{
        if(mode ===ModeEnum.TEST) return ""
        return findValue(answerId,id)>=0?"faulty":"correct"
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Radio: {
                        /* here is your component tokens */
                        radioSize:20
                    },
                },
            }}
        >
            <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-300 w-full ">
                    <thead className='text-center bg-blue-800 text-white'>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Câu hỏi</th>
                            {classifies.map((classify, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2">
                                    {classify}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {classify_question.map(({ content, id }) => (
                            <tr key={id}>
                                <td className="border border-gray-300 px-4 py-2">{content}</td>
                                {classifies.map((classify, cIndex) => (
                                    <td className="border-2 border-gray-300 px-4 py-2 text-center" key={cIndex}>
                                        <Radio
                                            checked={answers[id] === classify}
                                            className={getClassname(answers[id],id)}
                                            onChange={() => handleChange(id, classify)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ConfigProvider>
    );
}

export default ClassifyComponent