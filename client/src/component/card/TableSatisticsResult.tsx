import{ useMemo } from 'react'
import type { TableResult, ResultsType,  QuestionTableType } from '../../types'
import { Table, Tag, type TableProps } from 'antd';
import { QuestionType as TypeEnum } from '../../types/enums';
import { motion } from "framer-motion";

type QuestionType = "normal" | "classify" | "multiple" | "drop_match" |"fill_blank";

type TableSatisticsResultType = {
    questions: ResultsType[]
}


function TableSatisticsResult({ questions }: TableSatisticsResultType) {

    function transformData(data: ResultsType[]): TableResult[] {
        const grouded: Record<QuestionType, ResultsType[]> = {
            normal: [],
            multiple: [],
            classify: [],
            drop_match: [],
            fill_blank: []
        }   
        console.log(data)

        data?.forEach(value => {
            grouded[value.question_type as QuestionType].push(value)
        })

        const result: TableResult[] = Object.entries(grouded).map(([qType, questions]) => {
            let correct_total = 0
            let incorrect_total = 0
            let overlook_total = 0
            let questionTable: QuestionTableType[] = []
            questions.forEach((q) => {
                if (!q.user_answer) {
                    overlook_total++
                    return
                }
                if (Array.isArray(q.user_answer)) {

                    const allCorrect = q.user_answer.every(item => item.isCorrect)
                    if (allCorrect) {
                        correct_total++
                        questionTable.push({ question: q.question, id: q.question_id, is_correct: true })

                        return
                    }
                    questionTable.push({ question: q.question, id: q.question_id, is_correct: false })

                    incorrect_total++
                    return
                }
                if (q.user_answer.isCorrect) correct_total++
                incorrect_total++
                questionTable.push({ question: q.question, id: q.question_id, is_correct: q.user_answer.isCorrect })

            })
            const total = correct_total + incorrect_total + overlook_total
            const accurary_percentage = total > 0 ? Math.round((correct_total / total) * 100) : 0
            return {
                question_type: qType as QuestionType,
                correct_total,
                incorrect_total,
                overlook_total,
                accurary_percentage,
                questions: questionTable
            }
        })
        return result
    }

    const getTitleQuestioTyipe = (type: string) => {
        if (type === TypeEnum.NORMAL) return "Trắc nghiệm"
        if (type === TypeEnum.MULTIPLE) return "Chọn nhiều đáp án"
        if (type === TypeEnum.CLASSIFY) return "Phân loại"
        if (type === TypeEnum.DROP_MATCH) return "Kéo thả đáp án"
        if (type === TypeEnum.FILL_BLANK) return "Điền vào chỗ trống"

    }

    const itemsTable = useMemo(() => transformData(questions), [questions])
    const columns: TableProps<TableResult>['columns'] = [
        {
            title: (<p className='font-bold'> Phân loại câu hỏi</p>),
            dataIndex: "question_type",
            render: (value) => (<p>{getTitleQuestioTyipe(value)}</p>)
        },
        {
            title: (<p className='text-center font-bold'> Số câu đúng</p>),
            dataIndex: "correct_total",
            render: (value) => (<p className='text-center'>{value}</p>)
        },
        {
            title: (<p className='text-center font-bold'> Số câu sai</p>),
            dataIndex: "incorrect_total",
            render: (value) => (<p className='text-center'>{value}</p>)

        },
        {
            title: (<p className='text-center font-bold'> Số câu bỏ qua</p>),
            dataIndex: "overlook_total",
            render: (value) => (<p className='text-center'>{value}</p>)

        },
        {
            title: (<p className='text-center font-bold'> Tỉ lệ đúng (%)</p>),
            dataIndex: "accurary_percentage",
            render: (value) => (<p className='text-center'>{value}</p>)

        }
        ,
        {
            title: (<p className='font-bold'> Danh sách câu hỏi</p>),
            dataIndex: "questions",
            render: (questions: QuestionTableType[]) => (
                <div>
                    {questions.map(item => (
                        <Tag
                            key={item.id}
                            color={item.is_correct ? "green" : "red"}
                        >
                            {item.question}
                        </Tag>
                    ))}
                </div>
            )

        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Table dataSource={itemsTable} columns={columns} />
        </motion.div>
    )
}

export default TableSatisticsResult