import React, { useState } from 'react';
import { Upload, message, Button, Space, Card, Alert, List, Typography, Table, Drawer, Modal } from 'antd'; // Thêm Modal
import { FileExcelOutlined, FileTextOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import type { ColumnsType } from 'antd/es/table';
import { QuestionType } from '../../types/enums';
import * as XLSX from 'xlsx';
import type { Question } from '../../types';
import { useAppDispatch } from '../../hooks/redux';
import axios from 'axios';
import { insertQuestion } from '../../slice/questionSlice';
type Props = {
  isOpen: boolean;
  onClose: () => void;
}

interface SheetData {
  name: string,
  rows: number,
  data: any[],
}

const TEMPLATE_URL = 'https://res.cloudinary.com/dqe8linji/raw/upload/v1760424380/ExcelDataQuesion_phqij1.xlsx'

const readExcelFile = (file: RcFile, onComplete: (data: SheetData[]) => void): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          message.error("File rỗng hoặc không đọc được dữ liệu.");
          return reject(new Error("File rỗng"));
        }

        if (typeof XLSX === 'undefined') {
          message.error("Lỗi: Thư viện XLSX chưa được tải. Vui lòng chạy npm install xlsx.");
          return reject(new Error("XLSX not loaded"));
        }

        const workbook = XLSX.read(data as ArrayBuffer, { type: 'array' });
        const results: SheetData[] = [];

        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          results.push({
            name: sheetName,
            rows: json.length,
            data: json
          });
        }

        onComplete(results)
        message.success(`Đã đọc và xử lý thành công file Excel. Tổng ${results.length} sheets.`)
        resolve()

      } catch (err) {
        console.error("Lỗi xử lý file Excel:", err);
        message.error('Lỗi khi xử lý nội dung file Excel. Vui lòng kiểm tra định dạng dữ liệu.');
        reject(err);
      }
    }

    reader.onerror = (error) => {
      message.error('Lỗi khi đọc file.')
      reject(error)
    }

    reader.readAsArrayBuffer(file)
  })
}

const handleDownloadTemplate = () => {
  window.open(TEMPLATE_URL, '_blank');
  message.info("Đang mở file mẫu để tải về...");
};

const generateColumns = (data: any[]): ColumnsType<any> => {
  if (data.length === 0) return []

  const keys = Object.keys(data[0])

  const renderCell = (text: any) => {
    const str = String(text || '')
    const maxlength = 30
    if (str.length > maxlength) {
      return str.substring(0, maxlength) + '...'
    }
    return str
  }

  return keys.map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
    render: renderCell
  }))
}

const ModalFileQuestion = (props: Props) => {

  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [sheetData, setSheetData] = useState<SheetData[]>([]);

  const [selectedSheetName, setSelectedSheetName] = useState<string | null>(null);
  const [selectedSheetData, setSelectedSheetData] = useState<any[]>([]);

  const handleCreateQuestion = () => {
    const questions: Question[] = [];
    console.log(sheetData)
    sheetData.forEach(sheet => {
      sheet.data.forEach((row, index) => {
        if (index === 0) return;
        const questionType = QuestionType[sheet.name as keyof typeof QuestionType] || QuestionType.NORMAL
        const question = setQuestionByType(row, questionType);
        if (question) questions.push(question);
      })
    })
    const importUrl = import.meta.env.VITE_API_URL ;
    axios.post(`${importUrl}/questions`, { questions },{withCredentials: true})
      .then(response => {
        message.success(`Đã tạo thành công ${response.data.questions.length} câu hỏi.`);
        dispatch(insertQuestion(response.data.questions));
        props.onClose();
        setSheetData([]);
        setFileList([]);
      })
      .catch(error => {
        console.error("Lỗi khi tạo câu hỏi:", error);
        message.error('Có lỗi xảy ra khi tạo câu hỏi. Vui lòng thử lại.');
      });
  }

  const setQuestionByType = (row: any, questionType: string): Question | null => {
    const length = Object.keys(row).length;
    const question: Question = {
      question_type: questionType,
      content: row["Column1"] || '',
    };

    if (questionType === QuestionType.NORMAL) {
      const correctAnswer = row[`Column${length}`];
      const options = []
      for (let i = 2; i < length; i++) {
        options.push(row[`Column${i}`])
      }
      question.correct_answer = correctAnswer;
      question.option = options;
    }
    if (questionType === QuestionType.MULTIPLE) {
      const limitChoice = row[`Column2`];
      question.multiple_question = [];
      for (let i = 3; i <= length; i += 2) {
        const optionText = row[`Column${i}`];
        const isCorrect = row[`Column${i + 1}`] === 'true' || row[`Column${i + 1}`] === true;
        question.multiple_question.push({ option_text: optionText, is_correct: isCorrect })
      }
      question.limit_choice = limitChoice;
    }
    if (questionType === QuestionType.DROP_MATCH) {
      question.match_question = [];
      for (let i = 2; i <= length; i += 2) {
        const term = row[`Column${i}`];
        const definition = row[`Column${i + 1}`];
        question.match_question.push({ id: i, term, definition })
      }
    }
    if (questionType === QuestionType.CLASSIFY) {
      question.classify_question = [];
      for (let i = 2; i <= length; i += 2) {
        const content = row[`Column${i}`];
        const classify = row[`Column${i + 1}`];
        question.classify_question.push({ id: i, content, classify });
      }
    }
    return question;
  }


  const handleReadComplete = (data: SheetData[]) => {
    setSheetData(data);
    if (data.length === 0) {
      message.warning("File Excel không chứa bất kỳ sheet dữ liệu nào.");
    }
  };

  // xem chi tiết sheet
  const handleViewSheet = (sheet: SheetData) => {
    setSelectedSheetName(sheet.name);
    setSelectedSheetData(sheet.data);
  };

  // dong drawer
  const handleCloseDrawer = () => {
    setSelectedSheetName(null);
    setSelectedSheetData([]);
  };

  // upload file
  const handleOnChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);
    setFileList(newFileList);

    const { status } = info.file;
    if (status === 'done' || status === 'error') {
      setUploading(false);
    }
  };

  // handling before upload
  const handleBeforeUpload: UploadProps['beforeUpload'] = async (file) => {
    setUploading(true);
    setSheetData([]);

    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    if (!isExcel) {
      message.error('Bạn chỉ có thể tải lên file Excel (.xlsx, .xls)!');
      setUploading(false);
      return false;
    }

    try {
      await readExcelFile(file, handleReadComplete);
    } catch (error) {
      setUploading(false);
      return false;
    }

    setUploading(false);
    return false;
  };

  const propsFile: UploadProps = {
    name: 'file',
    fileList: fileList,
    onChange: handleOnChange,
    beforeUpload: handleBeforeUpload,
    accept: '.xlsx,.xls',
    maxCount: 1,
  };
  // customize column for table
  const columns = generateColumns(selectedSheetData);

  return (
    <Modal
      title="Thêm câu hỏi từ file"
      open={props.isOpen}
      onCancel={() => { props.onClose(); setSheetData([]); setFileList([]); }}
      width={600}
      okText="Tạo câu hỏi"
      onOk={handleCreateQuestion}
      className='flex'
    >
      <>
        <Card title="Upload files" className="w-full max-w-lg mx-auto shadow-lg rounded-lg">
          <Space direction="vertical" size="middle" className="w-full">
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownloadTemplate}
              type="dashed"
              className="w-full mb-2"
            >
              Tải về File Mẫu
            </Button>

            <Alert
              message="Chú ý "
              description="Vui lòng xem file excel mẫu trước khi tải lên để đảm bảo định dạng đúng. File Excel có thể chứa nhiều sheet, mỗi sheet sẽ được xử lý riêng biệt."
              type="warning"
              showIcon
              className="mb-4"
            />

            <Upload {...propsFile}>
              <Button
                icon={<FileExcelOutlined />}
                loading={uploading}
                className="w-full"
              >
                {uploading ? 'Đang xử lý...' : 'Chọn file Excel (.xlsx / .xls)'}
              </Button>
            </Upload>

            {/* === HIỂN THỊ DANH SÁCH SHEETS === */}
            {sheetData.length > 0 && (
              <Card size="small" title={`Kết quả đọc (${sheetData.length} Sheets)`} className="mt-4 shadow-sm">
                <List
                  size="small"
                  dataSource={sheetData}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Button
                          key="view"
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => handleViewSheet(item)}
                        >
                          Xem dữ liệu
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<FileTextOutlined style={{ color: '#1890ff', fontSize: '20px' }} />}
                        title={<Typography.Text strong>{item.name}</Typography.Text>}
                        description={`Dữ liệu đã đọc: ${item.rows} hàng (rows)`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}

          </Space>
        </Card>

        {/* === DRAWER HIỂN THỊ DỮ LIỆU BẢNG (TABLE) === */}
        <Drawer
          title={`Dữ liệu Sheet: ${selectedSheetName}`}
          placement="right"
          width="90%"
          onClose={handleCloseDrawer}
          open={!!selectedSheetName}
        >
          {selectedSheetName && (
            <div className="p-4">
              <Table
                columns={columns}
                dataSource={selectedSheetData.map((row, index) => ({ ...row, key: index }))}
                pagination={{ pageSize: 20 }}
                scroll={{ x: 'max-content', y: 'calc(100vh - 200px)' }}
                bordered
                size="small"
              />
            </div>
          )}
        </Drawer>
      </>
    </Modal>
  )
}
export default ModalFileQuestion
