import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, Divider, Select, Space, Typography, Tag, message, Row, Col, Statistic, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/redux';
import { insertExam } from '../../slice/examSlice';

const { Text } = Typography;
const { TextArea } = Input;
const QuestionTypeOptions = {
    NORMAL: "normal",
    MULTIPLE: "multiple",
    CLASSIFY: "classify",
    DROP_MATCH: "drop_match",
} as const;

type QuestionType = typeof QuestionTypeOptions[keyof typeof QuestionTypeOptions];

interface RequiredQuestion {
    question_type: QuestionType;
    limit: number;
}

interface ExamFormData {
    "total_question": number;
    require_questions: RequiredQuestion[];
    description: string;
    content: string;
    image_url: string;
    duration: number;
}

const questionTypeMapping: Record<QuestionType, string> = {
    'normal': 'Bình thường',
    'multiple': 'Nhiều lựa chọn',
    'classify': 'Phân loại',
    'drop_match': 'Kéo thả/Ghép đôi',
};



interface Props {
    onSubmit?: (data: ExamFormData) => void;
    onClose?: () => void;
}
const ExamConfigurationForm: React.FC<Props> = (props) => {
    const [form] = Form.useForm<ExamFormData>();
    const [requiredCount, setRequiredCount] = React.useState(0);
    const [usedQuestionTypes, setUsedQuestionTypes] = React.useState<Set<QuestionType>>(new Set());

    const dispatch = useAppDispatch();

    const updateRequiredCount = (questions: RequiredQuestion[] | undefined) => {
        const count = (questions || []).reduce((sum, item) => {
            const limit = item && typeof item.limit === 'number' ? item.limit : 0;
            return sum + limit;
        }, 0);

        setRequiredCount(count);

        const currentTypes = new Set<QuestionType>();
        (questions || []).forEach(item => {
            if (item?.question_type) {
                currentTypes.add(item.question_type);
            }
        });
        setUsedQuestionTypes(currentTypes);
    };

    useEffect(() => {
        const initialQuestions = form.getFieldValue('require_questions');
        updateRequiredCount(initialQuestions);
    }, []);

    const allTypesUsed = usedQuestionTypes.size >= Object.keys(QuestionTypeOptions).length;

    const onFinish = (values: ExamFormData) => {
        const totalConfig = values["total_question"];

        if (requiredCount !== totalConfig) {
            message.error(`Lỗi: Tổng số câu hỏi yêu cầu (${requiredCount}) phải bằng Tổng số câu hỏi (${totalConfig}).`);
            return;
        }

        const importUrl = import.meta.env.VITE_API_URL;
        axios.post(`${importUrl}/questions/create-exam`, values, { withCredentials: true })
            .then(response => {
                message.success(`Đã lưu cấu hình "${values.content}" thành công!`);
                dispatch(insertExam(response.data.exam));
                form.resetFields();
                props.onClose && props.onClose();
                
            })
            .catch(error => {
                console.error('Error saving exam configuration:', error);
                message.error(error.response?.data?.error || 'Có lỗi xảy ra khi lưu cấu hình bộ đề.');
            });
    };

    return (
        <div className="p-4 max-h-[70vh] overflow-x-auto">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={(_, allValues) => {
                    updateRequiredCount(allValues.require_questions);
                }}
                scrollToFirstError
            >
                <Divider orientation="left">Thông tin chung</Divider>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="content"
                            label="Tên Bộ Đề"
                            style={{ width: 400 }}

                            rules={[{ required: true, message: 'Vui lòng nhập tên bộ đề!' }]}
                        >
                            <Input placeholder="Ví dụ: Đề thi Ngẫu nhiên - Kỹ năng CNTT" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            style={{ width: 400 }}
                            name="image_url"
                            label="URL Ảnh Minh Họa"
                        >
                            <Input placeholder="https://..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            style={{ width: 400 }}
                            name="description"
                            label="Mô Tả"
                        >
                            <TextArea rows={3} placeholder="Mô tả chi tiết về nội dung và mục đích của bộ đề." />
                        </Form.Item>
                    </Col >
                    <Col span={12}>
                        <Form.Item
                            style={{ width: 400 }}
                            name="level"
                            label="Level Bộ Đề"
                            required
                        >
                            <Radio.Group defaultValue="1">
                                <Radio value={1}>Level 1</Radio>
                                <Radio value={2}>Level 2</Radio>
                                <Radio value={3}>Level 3</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            name="duration"
                            label="Thời Gian Làm Bài (Phút)"
                            rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                        >
                            <InputNumber min={5} addonAfter="Phút" className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="total_question"
                            label="Tổng Số Câu Hỏi"
                            rules={[{ required: true, message: 'Vui lòng nhập tổng số câu!' }]}
                        >
                            <InputNumber min={1} className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Card size="small" style={{ marginTop: '29px', backgroundColor: '#eff6ff', borderColor: '#91d5ff' }}>
                            <Statistic
                                title="Tổng Số Câu Hỏi Yêu Cầu (Tối thiểu)"
                                value={requiredCount}
                                suffix={`/ ${form.getFieldValue('total_question') || 0}`}
                                valueStyle={{ color: requiredCount > form.getFieldValue('total_question') ? '#cf1322' : '#3f8600' }}
                            />
                            <Text type="secondary" className="text-xs">
                                Tổng yêu cầu phải bằng Tổng số câu hỏi (Theo Config) để đảm bảo tính nhất quán.
                            </Text>
                        </Card>
                    </Col>
                </Row>


                <Divider orientation="left">Cấu Hình Phân Bổ Câu Hỏi (require_questions)</Divider>

                <Form.List name="require_questions">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => {
                                const currentQuestionType = form.getFieldValue(['require_questions', name, 'question_type']) as QuestionType | undefined;

                                return (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8, gap: '16px' }} align="baseline" className="bg-white p-3 rounded-lg border border-gray-200 w-full">

                                        <QuestionCircleOutlined style={{ fontSize: '18px', color: '#1890ff' }} />

                                        {/* Chọn Loại câu hỏi (Điều chỉnh width) */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'question_type']}
                                            fieldKey={[(fieldKey ?? key), 'question_type']}
                                            rules={[{ required: true, message: 'Chọn loại câu hỏi!' }]}
                                            style={{ flex: 1 }} // Sửa lỗi: Dùng flex: 1 để tự co giãn
                                        >
                                            <Select
                                                placeholder="Loại câu hỏi"
                                                disabled={!!currentQuestionType}
                                                dropdownRender={menu => (
                                                    <div className="p-2">
                                                        {menu}
                                                    </div>
                                                )}
                                            >
                                                {Object.entries(questionTypeMapping).map(([value, label]) => (
                                                    <Select.Option
                                                        key={value}
                                                        value={value as QuestionType}
                                                        disabled={usedQuestionTypes.has(value as QuestionType) && value !== currentQuestionType}
                                                    >
                                                        <Tag color={value === 'normal' ? 'blue' : value === 'multiple' ? 'green' : value === 'classify' ? 'geekblue' : 'volcano'}>
                                                            {label}
                                                        </Tag>
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        {/* Nhập Giới hạn (Limit) (Điều chỉnh width) */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'limit']}
                                            fieldKey={[(fieldKey ?? key), 'limit']}
                                            rules={[{ required: true, message: 'Nhập số lượng!' }]}
                                            style={{ width: 120 }} // Đặt width cố định cho ô số lượng
                                        >
                                            <InputNumber min={1} placeholder="Số lượng tối thiểu" addonAfter="Câu" className="w-full" />
                                        </Form.Item>

                                        {/* Nút Xóa */}
                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ color: '#ff4d4f', fontSize: '18px' }} />
                                    </Space>
                                );
                            })}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add({ question_type: undefined, limit: 1 })} // Cung cấp giá trị mặc định cho limit
                                    block
                                    icon={<PlusOutlined />}
                                    // === LOGIC DISABLE QUAN TRỌNG ===
                                    disabled={allTypesUsed}
                                >
                                    Thêm Yêu Cầu Loại Câu Hỏi ({usedQuestionTypes.size}/{Object.keys(QuestionTypeOptions).length})
                                </Button>
                                {allTypesUsed && (
                                    <Text type="warning" className="mt-2 block">
                                        Đã thêm đủ tất cả các loại câu hỏi có sẵn.
                                    </Text>
                                )}
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="mt-4">
                        Lưu Cấu Hình Bộ Đề
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ExamConfigurationForm;