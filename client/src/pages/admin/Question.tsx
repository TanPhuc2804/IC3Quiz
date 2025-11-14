
import { useEffect, useState } from 'react'
import { getQuestionColumns } from './config/column_table';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllQuestions, selectedQuestion } from '../../slice/questionSlice';
import axios from 'axios';
import { Button, Table } from 'antd';
import ModalQuestion from '../../component/modal/ModalQuestion';
import type { Question } from '../../types';
import ModalFileQuestion from '../../component/modal/ModalFileQuestion';

const QuestionComponent = () => {
  const handleAction = (record: any, actionType: 'edit' | 'delete') => {
    if (actionType === 'edit') {
      console.log('Edit action for record:', record);
    } else if (actionType === 'delete') {
      console.log('Delete action for record:', record);
    }
  };
  const column = getQuestionColumns(handleAction);
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector(state => state.question)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const selected = useAppSelector(state => state.question.selected);
  useEffect(() => {
    const importUrl = import.meta.env.VITE_API_URL
    axios.get(`${importUrl}/questions`)
      .then(res => {
        dispatch(getAllQuestions(res.data))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <Button type="primary" onClick={() => setIsOpenFile(true)} className='my-2.5'>Thêm câu hỏi từ file</Button>
      <Table
        columns={column}
        dataSource={questions}
        rowKey={"_id"}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 500 }}
        onRow={(record, _rowIndex) => {
          return {
            onClick: _event => {
              dispatch(selectedQuestion(record));
              setIsOpen(true);
            },
            style: { cursor: 'pointer' }
          };
        }}
      />

      <ModalFileQuestion isOpen={isOpenFile} onClose={() => setIsOpenFile(false)} />
      <ModalQuestion isOpen={isOpen} onClose={() => setIsOpen(false)} question={selected ?? {} as Question} />
    </>
  )
}
export default QuestionComponent