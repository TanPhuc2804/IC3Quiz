import React, { useState } from 'react'
import type { ClassificationQuestion } from '../../types'
import { ConfigProvider, Radio, type RadioChangeEvent } from 'antd'

type ClassifyComponentType = {
    classify_question: ClassificationQuestion[],
    handleChange: (questionId: string | number, value: string) => void,
    answers: Record<string | number, string>,
}

function ClassifyComponent({ classify_question, handleChange, answers}: ClassifyComponentType) {
    const classifies = Array.from(new Set(classify_question.map(item => item.classify)))
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