import { useEffect, useState } from 'react'
import type { Question, ResultQuestionType, ResultsType } from '../../types'
import ButtonQuestion from '../button/ButtonQuestion'
import { ConfigProvider, type RadioChangeEvent, type GetProp, Checkbox } from 'antd'
import { ModeEnum, QuestionType } from '../../types/enums'
import RadioComponent from '../quiz/RadioComponent'
import CheckBoxComponent from '../quiz/CheckBoxComponent'
import { getOption } from '../../utils/question.utils'
import ClassifyComponent from '../quiz/ClassifyComponent'
import MatchQuestinComponent from '../quiz/MatchQuestinComponent'
import { useItemQuestionContext } from '../../contexts/ItemQuestionContext'
import { motion, AnimatePresence } from "framer-motion";

type CountQuestionType = {
    id: number,
    isDone: boolean
}

type QuestionNormalProp = {
    question: Question,
    setResults: React.Dispatch<React.SetStateAction<ResultsType[]>>,
    setCountQuestionResult: React.Dispatch<React.SetStateAction<CountQuestionType[]>>,
    mode: string
}

const resultNormalInit: ResultQuestionType = {
    isCorrect: true,
    choice: "",
    anwser_correct: ""
}
function QuestionComponent({ question, setResults, setCountQuestionResult, mode }: QuestionNormalProp) {

    const { changBgItemQuestion } = useItemQuestionContext()
    const [isChoice, setIsChoice] = useState(false)
    const [valueNormal, setValueNormal] = useState("");
    const [option, setOptions] = useState<any>([])
    const [_valueMultiple, setValueMultiple] = useState<any[]>([])

    const [answersClassify, setAnswersClassify] = useState<Record<string | number, string>>({});
    const [_countMatch, setCountMatch] = useState(0)
    const [resultNormal, setResultNormal] = useState<ResultQuestionType>(resultNormalInit)
    const [resultQuestion, setResultQuestion] = useState<ResultQuestionType[]>([])
    const [isFaulty, setIsFaulty] = useState(false)
    const [faulties, setFaulties] = useState<ResultQuestionType[]>([])
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
            const qid = question.id ?? 0;
            if (pre.length === 0 || pre.findIndex(item => item.question_id === qid) === -1) {
                return [
                    ...pre,
                    {
                        question_id: qid,
                        question: question.question,
                        question_type: question.question_type
                    } as ResultsType
                ]
            }
            const newResult = pre.map(item => {
                if (item.question_id === qid) {
                    return {
                        ...item,
                        user_answer: (question.question_type === QuestionType.NORMAL) ? resultNormal : resultQuestion
                    }
                }
                return item
            })
            return newResult

        })

        if (mode === ModeEnum.TRAINING) {
            if (question.question_type === QuestionType.NORMAL) {
                setIsFaulty(!resultNormal.isCorrect)
            } else {
                const isFalses = resultQuestion.filter(item => !item.isCorrect)
                setFaulties(isFalses)
                setIsFaulty((isFalses.length > 0))
            }
        }

        if (isChoice) {
            setCountQuestionResult(pre => {
                const term = [...pre]
                const indexContaint = term.findIndex(item => item.id === question.id)
                if (indexContaint !== -1) {
                    term[indexContaint].isDone = true
                    return term
                }
                return [
                    ...pre,
                    {
                        id: question.id ?? 0,
                        isDone: true
                    }
                ]
            })
            changBgItemQuestion(question.question || 0, isChoice)
        } else {
            setCountQuestionResult(pre => pre.filter(item => item.id !== (question.id ?? 0)))
            changBgItemQuestion(question.question || 0, isChoice)
        }
    }, [resultQuestion, resultNormal])
    const getComponentType = (type: string) => {
        switch (type) {
            case QuestionType.NORMAL: {
                return (
                    <RadioComponent onChange={onChangeRadio} value={valueNormal} option={option} isFaulty={isFaulty} mode={mode} />
                )

            }
            case QuestionType.MULTIPLE: {
                return (
                    <CheckBoxComponent onChange={onChangeCheckBox} options={option} limit_choice={question?.limit_choice ?? 0} faulties={faulties} mode={mode} />
                )
            }
            case QuestionType.CLASSIFY: {
                return (
                    <ClassifyComponent classify_question={question?.classify_question ?? []} handleChange={handleChangeClassify} answers={answersClassify} faulties={faulties} mode={mode} />
                )
            }
            case QuestionType.DROP_MATCH: {
                return (

                    <MatchQuestinComponent match_question={question.match_question ?? []} handleScoreMatch={handleScoreMatch} reductCount={reductCount} faulties={faulties} />
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
        if (!classifyQuestion) return
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
        if (Object.values(answersClassify).length + 1 === classifyQuestion?.length) {
            setIsChoice(true)
        }
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
        setIsChoice(true)
    };

    const handleScoreMatch = (idTerm: number, idDefinition: number, count: boolean, isUpdate: boolean, isRemove: boolean, isChangeEmpty: boolean) => {
        if (count) {
            setCountMatch(pre => {
                const newCount = pre === LENGHT_MATCH_QUESTION ? LENGHT_MATCH_QUESTION : pre + 1;
                setIsChoice((pre + 1) === LENGHT_MATCH_QUESTION)
                return newCount;
            });
        }

        if (isChangeEmpty) {
            setResultQuestion((pre: ResultQuestionType[]) => {
                const rusultTerm = [...pre]
                const newResults = rusultTerm.map(item => {
                    if (item.choice === idDefinition) {
                        return {
                            ...item,
                            isCorrect: idDefinition === idTerm,
                            choice: idDefinition,
                            anwser_correct: idTerm
                        }
                    }
                    return item

                })
                return newResults
            })
        }
        if (isRemove) {
            setResultQuestion(pre => pre.filter(item => item.choice !== idDefinition));
            return
        }

        if (!isUpdate) {
            setResultQuestion((pre: ResultQuestionType[]) => {
                const indexContainResult = pre.findIndex(item => item.anwser_correct === idTerm)
                if (indexContainResult !== -1 && pre.length > 0) {
                    pre[indexContainResult].choice = idDefinition
                    pre[indexContainResult].isCorrect = idDefinition === idTerm
                    return pre
                }
                return [
                    ...pre,
                    {
                        isCorrect: idTerm === idDefinition,
                        choice: idDefinition,
                        anwser_correct: idTerm
                    }
                ];
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
            setIsChoice(false)
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
        if (values.length === question.limit_choice) {
            setIsChoice(true)
        } else {
            setIsChoice(false)
        }
    };


    const getCorrectAnwser = (type: string) => {
        if (type === QuestionType.NORMAL) {
            return question.correct_answer
        }
        if (type === QuestionType.DROP_MATCH) {
            let correct = ""
            question.match_question?.forEach(item => {
                correct += item.term + ": " + item.definition + "\n"
            })
            return correct
        }
        if (type === QuestionType.MULTIPLE) {
            let correct = ""
            question.multiple_question?.forEach(item => {
                if (item.is_correct) {
                    correct += item.option_text + "\n"
                }
            })
            return correct
        }
        if (type === QuestionType.CLASSIFY) {
            let correct = ""
            const grounded = Object.values(
                question.classify_question?.reduce((acc: { [key: string]: { classify: string, contents: string[] } }, item) => {
                    if (!acc[item.classify]) {
                        acc[item.classify] = {
                            classify: item.classify,
                            contents: [],
                        };
                    }
                    acc[item.classify].contents.push(item.content);
                    return acc;
                }, {} as { [key: string]: { classify: string, contents: string[] } }) ?? {}
            );
            grounded.map(item => {
                correct += "\n" + item.classify + ":"
                item.contents.map(content => {
                    correct += " " + content + ""
                })
            })
            return correct
        }
        return "Test"
    }
    // testData(question.question_type)
    // console.log(getCorrectAnwser(question.question_type))
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
            <div>
                <motion.div
                    className="flex gap-3 my-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <ButtonQuestion size="large" content={question?.question || 0} />
                    <motion.div
                        className="flex flex-col gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                    >
                        <p>{question?.content}</p>
                        {getComponentType(question.question_type)}
                    </motion.div>
                </motion.div>

                <AnimatePresence>
                    {isFaulty && (
                        <motion.div
                            key="answer"
                            className="text-emerald-500 m-[30px] font-bold whitespace-pre-line"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            Đáp án đúng:
                            <motion.div
                                className="ml-[30px]"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                {getCorrectAnwser(question.question_type)}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ConfigProvider>

    )
}

export default QuestionComponent