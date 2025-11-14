import React, { useEffect } from 'react'
import { getExamColumns } from './config/column_table';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import axios from 'axios';
import { getAllExams } from '../../slice/examSlice';
import { Button, Table } from 'antd';
import { showMessage } from '../../component/notification/Message';
import ModalExam from '../../component/modal/ModalExam';



const Exam = () => {
  const [visible, setVisible] = React.useState(false);
  const columns = getExamColumns();
  const exams = useAppSelector(state => state.exam.exams);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const allExams = () => {
      const importUrl = import.meta.env.VITE_API_URL
      axios.get(`${importUrl}/exams`)
        .then(response => {
          dispatch(getAllExams(response.data));
        })
        .catch(error => {
          showMessage(false, error.response?.data?.message || "Có lỗi xảy ra");
        });
    }
    allExams();
  }, [])

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>Thêm mới</Button>
      <Table
        columns={columns}
        dataSource={exams}
        rowKey="id"
      />
      <ModalExam visible={visible} onCancel={() => setVisible(false)} />
    </>

  )
}
export default Exam