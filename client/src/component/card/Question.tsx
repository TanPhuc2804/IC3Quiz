import React, { useEffect, useState } from 'react'
import type { Question, ResultQuestionType, ResultsType } from '../../types'
import ButtonQuestion from '../button/ButtonQuestion'
import { ConfigProvider, type RadioChangeEvent, type GetProp, Checkbox } from 'antd'
import { QuestionType } from '../../types/enums'
import RadioComponent from '../quiz/RadioComponent'
import CheckBoxComponent from '../quiz/CheckBoxComponent'
import { getOption } from '../../utils/question.utils'
import ClassifyComponent from '../quiz/ClassifyComponent'
import MatchQuestinComponent from '../quiz/MatchQuestinComponent'
type QuestionNormalProp = {
    question: Question,
    setResults: React.Dispatch<React.SetStateAction<ResultsType[]>>
}

const resultNormalInit: ResultQuestionType = {
    isCorrect: false,
    choice: "",
    anwser_correct: ""
}
function QuestionComponent({ question, setResults }: QuestionNormalProp) {
    const [valueNormal, setValueNormal] = useState("");
    const [option, setOptions] = useState<any>([])

    const [valueMultiple, setValueMultiple] = useState<any[]>([])

    const [answersClassify, setAnswersClassify] = useState<Record<string | number, string>>({});
    const [countMatch, setCountMatch] = useState(0)
    const [resultNormal, setResultNormal] = useState<ResultQuestionType>(resultNormalInit)
    const [resultQuestion, setResultQuestion] = useState<ResultQuestionType[]>([])
    const LENGHT_MATCH_QUESTION = question.match_question?.length ?? 0
    useEffect(() => {
        switch (question.question_type) {
            case QuestionType.NORMAL: {
                let { option } = question ?? {}
                const optionRadio = option?.map((item, index) => {
                    const optionChoose = getOption(index)
                    return {
                        value: optionChoose,
                        label: (<p className='text-[15px]'>{item}</p>)
                    }
                })
                setOptions(optionRadio)
                break
            }
            case QuestionType.MULTIPLE: {
                let { multiple_question } = question
                const optionQuestion = multiple_question?.map((item, index) => {
                    return {
                        value: getOption(index),
                        label: item.option_text
                    }
                })
                setOptions(optionQuestion)
                break;
            }
            case QuestionType.DROP_MATCH: {
                break;
            }
            case QuestionType.CLASSIFY: {
                break;
            }
        }
    }, [question])
    useEffect(() => {
        setResults(pre => {
            if (pre.length === 0 || pre.findIndex(item => item.question_id === question.id) === -1) {
                return [
                    ...pre,
                    {
                        question_id: question.id,
                        question_type: question.question_type

                    }
                ]
            }
            const resultsTerm = [...pre]
            const newResult = resultsTerm.map(item => {
                if (item.question_id === question.id) {
                    return {
                        ...item,
                        user_answer: (question.question_type === QuestionType.NORMAL) ? resultNormal : resultQuestion
                    }
                }
                return item
            })
            return newResult

        })
    }, [resultQuestion, resultNormal])

    const getComponentType = (type: string) => {
        switch (type) {
            case QuestionType.NORMAL: {
                return (
                    <RadioComponent onChange={onChangeRadio} value={valueNormal} option={option} />
                )

            }
            case QuestionType.MULTIPLE: {
                return (
                    <CheckBoxComponent onChange={onChangeCheckBox} options={option} limit_choice={question?.limit_choice ?? 0} />
                )
            }
            case QuestionType.CLASSIFY: {
                return (
                    <ClassifyComponent classify_question={question?.classify_question ?? []} handleChange={handleChangeClassify} answers={answersClassify} />
                )
            }
            case QuestionType.DROP_MATCH: {
                return (

                    <MatchQuestinComponent match_question={question.match_question ?? []} handleScoreMatch={handleScoreMatch} reductCount={reductCount} />
                )
            }
            default: {
                return (
                    <p>
                        Khong co j het
                    </p>
                )
            }
        }
    }

    // Cham phan loai
    const handleChangeClassify = (questionId: string | number, value: string) => {
        const classifyQuestion = question.classify_question
        const classify = classifyQuestion?.filter(item => item.id === questionId)[0]
        setResultQuestion(pre => {

            if (pre.length === 0) {
                return [{
                    choice: value ?? "",
                    id_classify: +questionId,
                    isCorrect: classify?.classify === value,
                    anwser_correct: classify?.classify
                }];
            }
            const term = [...pre];
            let found = false;

            const result = term.map(item => {
                if (item.id_classify === questionId) {
                    found = true;
                    return {
                        ...item,
                        isCorrect: classify?.classify === value,
                        anwser_correct: classify?.classify,
                        choice: value ?? "",
                    };
                }
                return item;
            });

            if (!found) {
                result.push({
                    id_classify: +questionId,
                    choice: value ?? "",
                    isCorrect: classify?.classify === value,
                    anwser_correct: classify?.classify,
                });
            }
            return result;
        })

        setAnswersClassify((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    // Cham chon dap an
    const onChangeRadio = (e: RadioChangeEvent) => {
        const value = e.target.value
        const isCorrect = value === question.correct_answer
        setResultNormal(pre => ({
            ...pre,
            isCorrect: isCorrect,
            anwser_correct: question.correct_answer,
            choice: value
        }))
        setValueNormal(value);

    };

    const handleScoreMatch = (idTerm: number, idDefinition: number, count: boolean, isUpdate: boolean) => {
        if (count) {
            setCountMatch(pre => {
                const newCount = pre === LENGHT_MATCH_QUESTION ? LENGHT_MATCH_QUESTION : pre + 1;
                return newCount;
            });
        }
        // if (countMatch === LENGHT_MATCH_QUESTION) {
        //     // chua t hanh cong
        // }
        if (!isUpdate) {
            setResultQuestion((pre: ResultQuestionType[]) => {
                if (idDefinition === idTerm) {
                    return [
                        ...pre,
                        {
                            isCorrect: true,
                            choice: idDefinition,
                            anwser_correct: idTerm
                        }
                    ];
                } else {
                    return [
                        ...pre,
                        {
                            isCorrect: false,
                            choice: idDefinition,
                            anwser_correct: idTerm
                        }
                    ];
                }
            });
        } else {
            setResultQuestion((pre: ResultQuestionType[]) => {
                const rusultTerm = [...pre]
                const newResults = rusultTerm.map(item => {
                    if (item.anwser_correct === idTerm) {
                        return {
                            ...item,
                            isCorrect: idDefinition === idTerm,
                            choice: idDefinition
                        }
                    }
                    return item
                })
                return newResults
            })
        }

    }
    const reductCount = () => {
        setCountMatch(pre => {
            let count = pre
            if (count === 0) {
                return 0
            }
            return count - 1
        })
    }

    // Cham chon nhieu dap an
    const onChangeCheckBox: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        const values = checkedValues
        const multileQuestion = question.multiple_question
        const resultQuestion: ResultQuestionType[] = (multileQuestion ?? [])
            .flatMap(item => {
                const character = item.option_text.slice(0, 1)
                return values
                    .filter(value => value === character)
                    .map(value => ({
                        isCorrect: item.is_correct,
                        choice: value,
                    }));
            });
        setResultQuestion(resultQuestion)
        setValueMultiple(values)
    };

    const testData = (type: string) => {
        if (type === QuestionType.CLASSIFY) {
            console.log("Classify " + " Question: " + question.id, answersClassify)
            return
        }
        if (type === QuestionType.MULTIPLE) {
            console.log("Multiple" + " Question: " + question.id, valueMultiple)
            return
        }
        if (type === QuestionType.DROP_MATCH) {
            console.log("Mach Question ")
            return
        }
        if (type === QuestionType.NORMAL) {
            console.log("Normal" + " Question: " + question.id, valueNormal)
            return
        }
    }
    // testData(question.question_type)


    return (
        <ConfigProvider
            theme={{
                components: {
                    Radio: {
                        /* here is your component tokens */

                    },
                },
            }}
        >
            <div className='flex gap-3 my-8'>
                <ButtonQuestion content={question?.question} />
                <div className='flex flex-col gap-3'>
                    <p>{question?.content}</p>
                    {getComponentType(question.question_type)}
                </div>
            </div>
        </ConfigProvider>

    )
}

export default QuestionComponent