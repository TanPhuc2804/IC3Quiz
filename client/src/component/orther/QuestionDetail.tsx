import { useEffect, useState } from 'react';
import { Card, Typography, Tag, List, Space, Divider, Button, Alert, message, Select } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined, CloseCircleOutlined, SortAscendingOutlined, ClusterOutlined, PlusOutlined } from '@ant-design/icons';
import { QuestionType } from '../../types/enums';
import type { Exam, Question } from '../../types';
import { showMessage } from '../notification/Message';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/redux';
import { insertExam } from '../../slice/questionSlice';

const { Title, Text, Paragraph } = Typography;
interface AnswerProps {
    question: Question;
}
const getCorrectAnswerDisplay = (answer: string, title = "Đáp án chính xác:") => (
    <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-md shadow-inner text-sm">
        <CheckCircleOutlined className="text-green-600 mr-2" />
        <Text strong className="text-green-700">{title} </Text>
        <Text className="text-green-700">{answer}</Text>
    </div>
);
const typeMapping: Record<QuestionType, { name: string, color: string }> = {
    [QuestionType.NORMAL]: { name: 'Một lựa chọn', color: 'blue' },
    [QuestionType.MULTIPLE]: { name: 'Nhiều lựa chọn', color: 'green' },
    [QuestionType.DROP_MATCH]: { name: 'Ghép nối', color: 'volcano' },
    [QuestionType.CLASSIFY]: { name: 'Phân loại', color: 'geekblue' },
};

const RenderAnswerOptions: React.FC<AnswerProps> = ({ question }) => {
    const { question_type, option, multiple_question, match_question, classify_question, correct_answer, limit_choice } = question;

    // --- Handle Classify Question ---
    if (question_type === QuestionType.CLASSIFY && classify_question && classify_question.length > 0) {

        const classifications = classify_question.reduce((acc, item) => {
            if (!acc[item.classify]) acc[item.classify] = [];
            acc[item.classify].push(item.content);
            return acc;
        }, {} as Record<string, string[]>);

        const correctDisplay = Object.entries(classifications)
            .map(([category, items]) => `${category}: ${items.join(', ')}`)
            .join(' | ');

        return (
            <div className="space-y-4">
                <Title level={5} className="mt-0 text-gray-600 flex items-center">
                    <ClusterOutlined className="mr-2 text-indigo-500" />
                    Cấu trúc Phân loại:
                </Title>
                {Object.entries(classifications).map(([category, items]) => (
                    <Card key={category} size="small" className="shadow-sm border-indigo-200">
                        <Title level={5} className="!mt-0 !mb-2 text-indigo-700 border-b pb-1">
                            Loại: {category}
                        </Title>
                        <Space size={[0, 8]} wrap>
                            {items.map(item => <Tag key={item} color="geekblue">{item}</Tag>)}
                        </Space>
                    </Card>
                ))}
                {getCorrectAnswerDisplay(correctDisplay)}
            </div>
        );
    }

    // --- Handle Drop Match Question ---
    if (question_type === QuestionType.DROP_MATCH && match_question && match_question.length > 0) {
        return (
            <div className="space-y-4">
                <Title level={5} className="mt-0 text-gray-600 flex items-center">
                    <SortAscendingOutlined className="mr-2 text-indigo-500" />
                    Các cặp ghép nối đúng:
                </Title>
                <div
                    className="grid gap-4 text-center p-2 bg-gray-100 rounded-t-lg"
                    style={{ gridTemplateColumns: '1fr 2fr' }} // Sử dụng tỷ lệ 1:2
                >
                    <Text strong className="text-indigo-600">Thuật ngữ/Nguồn (Term/Source)</Text>
                    <Text strong className="text-indigo-600">Định nghĩa/Đích (Definition/Target)</Text>
                </div>
                <List
                    bordered
                    dataSource={match_question}
                    renderItem={(item) => (
                        <List.Item
                            className="hover:bg-yellow-50 transition !px-4"
                            style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }} // Sử dụng tỷ lệ 1:2
                        >
                            {/* Cột Term */}
                            <Text className="font-medium text-left">{item.term}</Text>
                            {/* Cột Definition: Đã thêm style và chuyển sang div để đảm bảo xuống dòng */}
                            <div
                                className="text-sm text-gray-600 text-left"
                                // Các thuộc tính CSS quan trọng để buộc ngắt dòng khi tràn
                                style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                            >
                                {item.definition}
                            </div>
                        </List.Item>
                    )}
                />

                {getCorrectAnswerDisplay(
                    "Các cặp đã được liệt kê ở trên theo thứ tự đúng."
                )}
            </div>
        );
    }

    // --- Handle Multiple Question ---
    if (question_type === QuestionType.MULTIPLE && multiple_question && multiple_question.length > 0) {
        const correctOptions = multiple_question.filter(q => q.is_correct).map(q => q.option_text);

        return (
            <List
                header={<Title level={5} className="mt-0 text-gray-600">{limit_choice ? `Yêu cầu chọn ${limit_choice} tùy chọn:` : 'Các lựa chọn đáp án:'}</Title>}
                bordered
                dataSource={multiple_question}
                renderItem={(item) => {
                    const isCorrect = item.is_correct;

                    return (
                        <List.Item
                            className={`hover:bg-gray-50 transition ${isCorrect ? 'bg-green-50 border-l-4 border-green-400' : ''}`}
                        >
                            <Space>
                                {isCorrect ?
                                    <CheckCircleOutlined className="text-green-600" /> :
                                    <CloseCircleOutlined className="text-red-500" />
                                }
                                <Text className={isCorrect ? 'font-semibold text-green-700' : ''}>
                                    {item.option_text}
                                </Text>
                            </Space>
                        </List.Item>
                    );
                }}
            >
                {getCorrectAnswerDisplay(correctOptions.join('; '), "Các đáp án đúng:")}
            </List>
        );
    }

    // --- Handle Normal Question ---
    if (question_type === QuestionType.NORMAL && option && option.length > 0) {
        return (
            <List
                header={<Title level={5} className="mt-0 text-gray-600">Các lựa chọn đáp án:</Title>}
                bordered
                dataSource={option}
                renderItem={(item: string) => {
                    const optionKey = item.charAt(0);
                    const isCorrect = optionKey === correct_answer;

                    return (
                        <List.Item
                            className={`hover:bg-gray-50 transition ${isCorrect ? 'bg-green-50 border-l-4 border-green-400' : ''}`}
                        >
                            <Space>
                                {isCorrect ?
                                    <CheckCircleOutlined className="text-green-600" /> :
                                    <InfoCircleOutlined className="text-gray-400" />
                                }
                                <Text className={isCorrect ? 'font-semibold text-green-700' : ''}>
                                    {item}
                                </Text>
                            </Space>
                        </List.Item>
                    );
                }}
            >
                {getCorrectAnswerDisplay(correct_answer || 'N/A')}
            </List>
        );
    }
    return (
        <Alert
            message="Thiếu cấu trúc đáp án"
            description={
                <Paragraph className="mt-2 text-sm">
                    Dạng câu hỏi <Text code>{question_type}</Text> này không có cấu trúc đáp án (option, multiple_question,...) được định nghĩa.
                    Đáp án chính xác thô: <Text code>{correct_answer || 'Không có'}</Text>
                </Paragraph>
            }
            type="warning"
            showIcon
        />
    );
};


// === 4. COMPONENT CHÍNH (QuestionDetail) ===

const QuestionDetail: React.FC<{ question: Question }> = ({ question }) => {
    const [selectedNewExamIds, setSelectedNewExamIds] = useState<string[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const mapping = typeMapping[question.question_type] || { name: 'Không xác định', color: 'default' };
    const dispatch = useAppDispatch();

    useEffect(() => {
        const importUrl = import.meta.env.VITE_API_URL
        axios.get(`${importUrl}/exams`)
            .then(response => {
                setExams(response.data);
            })
            .catch(error => {
                showMessage(false, error.response?.data?.message || "Có lỗi xảy ra");
            });
    }, []);

    const onUpdateExams = (newExamList: Exam[]) => {
        const id = newExamList.map(exam => exam._id);
        const importUrl = import.meta.env.VITE_API_URL
        axios.post(`${importUrl}/questions/addExam`, {
            examIds: id,
            questionId: question._id
        }, { withCredentials: true })
            .then(response => {
                dispatch(insertExam({ questionId: question._id || "", exams: response.data.question.exam_id }));
                message.success("Cập nhật bộ đề thành công.");

            })
            .catch(error => {
                showMessage(false, error.response?.data?.message || "Có lỗi xảy ra");
            });
    }

    const unassignedExams = exams.filter(
        exam =>
            question.exam_id &&
            Array.isArray(question.exam_id) &&
            !question.exam_id.some(assigned => assigned._id === exam._id)
    );

    const handleAddExams = () => {
        if (selectedNewExamIds.length === 0) {
            message.warning("Vui lòng chọn ít nhất một bộ đề để thêm.");
            return;
        }

        const examsToAdd = exams.filter(exam => selectedNewExamIds.includes(exam._id ?? ""));

        const newExamList = (question.exam_id ?? []).concat(examsToAdd);

        onUpdateExams(newExamList);

        // Reset trạng thái
        setSelectedNewExamIds([]);
        setIsAdding(false);
        message.success(`Đã thêm ${examsToAdd.length} bộ đề vào câu hỏi.`);
    };


    // Xử lý sự kiện xóa bộ đề (từ danh sách Tag)
    const handleRemoveExam = (examIdToRemove: string) => {
        const newExamList = (question.exam_id ?? []).filter(exam => exam._id !== examIdToRemove);
        console.log("New Exam List after removal:", examIdToRemove);
        onUpdateExams(newExamList);
        const importUrl = import.meta.env.VITE_API_URL
        axios.post(`${importUrl}/questions/removeExam`, {
            examId: examIdToRemove, questionId: question._id
        }, { withCredentials: true })
            .then(response => {
                dispatch(insertExam({ questionId: question._id || "", exams: response.data.question.exam_id }));
                message.success("Cập nhật bộ đề thành công.");
            })
            .catch(error => {
                showMessage(false, error.response?.data?.message || "Có lỗi xảy ra");
            });
    };

    // Tạo options cho Antd Select
    const selectOptions = unassignedExams.map(exam => ({
        label: exam.content,
        value: exam._id,
    }));

    return (
        <Card className="w-full max-w-5xl mx-auto shadow-xl transition hover:shadow-2xl rounded-lg border-t-4 border-blue-500">
            <Space direction="vertical" size="large" className="w-full">

                {/* --- HEADER: Thông tin cơ bản --- */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                    <Title level={3} className="!mb-0 text-gray-800">
                        Chi tiết Câu hỏi ID: {question.id}
                    </Title>
                    <Tag color={mapping.color} className="text-lg font-semibold px-4 py-1">
                        Loại: {mapping.name}
                    </Tag>
                </div>
                {/* --- NỘI DUNG CÂU HỎI --- */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <Title level={4} className="!mt-0 text-indigo-700">
                        <InfoCircleOutlined className="mr-2 text-indigo-500" />
                        Nội dung:
                    </Title>
                    <Paragraph className="text-lg leading-relaxed text-gray-700 font-medium">
                        {question.content}
                    </Paragraph>
                </div>

                {/* --- CHI TIẾT ĐÁP ÁN (Render logic động) --- */}
                <Divider orientation="left" className="!text-gray-500 !font-semibold">
                    Cấu trúc Đáp án
                </Divider>
                <RenderAnswerOptions question={question} />

                {/* --- THÔNG TIN BỘ ĐỀ LIÊN QUAN --- */}
                <Divider orientation="left" className="!text-gray-500 !font-semibold">
                    Bộ đề liên quan
                </Divider>
                <div className="flex items-start gap-4">
                    {/* --- DANH SÁCH CÁC BỘ ĐỀ --- */}
                    <Space size={[8, 8]} wrap className="flex-1">
                        {question.exam_id && question.exam_id.length > 0 ? (
                            question.exam_id.map(exam => (
                                <Tag
                                    key={exam._id}
                                    color="purple"
                                    closable
                                    onClose={(e) => {
                                        e.preventDefault();
                                        handleRemoveExam(exam._id);
                                    }}
                                    className="text-base py-1 px-3 shadow-md"
                                >
                                    {exam.content}
                                </Tag>
                            ))
                        ) : (
                            <Text type="secondary" className="italic">Câu hỏi chưa được gán vào bộ đề nào.</Text>
                        )}
                    </Space>

                    {/* === NÚT KÍCH HOẠT CHỌN THÊM === */}
                    <Button
                        type={isAdding ? 'default' : 'dashed'}
                        icon={<PlusOutlined />}
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex-shrink-0"
                    >
                        {isAdding ? 'Hủy' : 'Thêm Bộ đề'}
                    </Button>
                </div>


                {/* === CHỌN VÀ GÁN BỘ ĐỀ MỚI === */}
                {isAdding && (
                    <Card size="small" className="mt-2 border-dashed border-2">
                        <Space direction="vertical" className="w-full" size="small">
                            <Text strong>Chọn bộ đề muốn thêm:</Text>
                            <Select
                                mode="multiple"
                                placeholder="Chọn từ danh sách..."
                                value={selectedNewExamIds}
                                onChange={(value: string[]) => setSelectedNewExamIds(value)}
                                options={selectOptions}
                                style={{ width: '100%' }}
                                disabled={unassignedExams.length === 0}
                            />
                            <Button
                                type="primary"
                                onClick={handleAddExams}
                                disabled={selectedNewExamIds.length === 0}
                                className="mt-2"
                            >
                                <PlusOutlined /> Gán {selectedNewExamIds.length} Bộ đề
                            </Button>
                            {unassignedExams.length === 0 && (
                                <Alert type="info" message="Không còn bộ đề nào để thêm." showIcon />
                            )}
                        </Space>
                    </Card>
                )}

            </Space>
        </Card>
    );
};

export default QuestionDetail;