import React from 'react';
import { Select } from 'antd';
import type { Question, ResultQuestionType } from '../../types';

const FillBlankQuestionComponent: React.FC<{ question: Question, handleChange: (blankId: number, value: number) => void, faulties: ResultQuestionType[], mode: string }> = ({ question, handleChange}) => {
    const blankQuestion = question?.fill_blank_question;
    if (!blankQuestion) return null;

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl">

            {/* 🧩 Khu vực các câu cần điền */}
            <div className="flex flex-col space-y-4">
                <p className="inline-block">
                    <span className="font-semibold mr-1">{blankQuestion?.leadingText}</span>

                    {blankQuestion?.blanks.map((blank) => (
                        <React.Fragment key={blank.id}>
                            {/* Ant Design Select */}
                            <Select<number>
                                className="w-48 mx-2 "
                                placeholder="-- Chọn --"
                                onChange={(value: number) => handleChange(blank.id, value)}
                                options={blankQuestion.options.map(opt => ({
                                    label: opt.content,
                                    value: opt.id,
                                }))}
                            />
                            {/* Văn bản theo sau */}
                            <span className="font-semibold mx-1.5">{blank.trailingText}</span>
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </div>
    );
};
export default FillBlankQuestionComponent;