import { Button, Space, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import type { Exam, Question, User } from "../../../types";
import moment from 'moment';
import { calculateRemainingDays, formatMinutesToSecondsString } from "../../../services/caculateDate";
import { QuestionType } from "../../../types/enums";
import { QuestionType as QuestionTypeEnum } from "../../../types/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
export const getUserColumns = (
    onActivate: (idUser: User['_id']) => void

): ColumnsType<User> => {
    return [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => (a.email ?? '').localeCompare(b.email ?? ''),
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: (a, b) => (a.fullname ?? '').localeCompare(b.fullname ?? ''),
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            // Định kiểu cho tham số `role`
            render: (role: User['role']) => (
                <Tag color={role === 'admin' ? 'volcano' : 'green'} key={role}>
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: User['status']) => {
                let color: 'green' | 'blue' | 'volcano' | 'default'; // Khai báo các màu có thể dùng

                switch (status) {
                    case 'paid':
                        color = 'green';
                        break;
                    case 'active':
                        color = 'blue';
                        break;
                    case 'none':
                    default:
                        color = 'default';
                        break;
                }

                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Tên gói',
            dataIndex: ['package', 'package_id', 'name'],
            key: 'package_name',
            // Định kiểu cho tham số `text` (có thể là undefined)
            render: (text: string | undefined) => text || 'Chưa đăng ký',
        },
        {
            title: 'Thời gian còn lại',
            dataIndex: ['package', 'expire_date'],
            key: 'remaining_time',
            render: (expireDate: string | undefined) => calculateRemainingDays(expireDate),
            sorter: (a, b) => {
                const dateA = a.package?.expire_date ? moment.utc(a.package.expire_date).valueOf() : 0;
                const dateB = b.package?.expire_date ? moment.utc(b.package.expire_date).valueOf() : 0;

                return dateA - dateB;
            },
        },
        {
            title: "Active",
            render: (_, record) => <Button disabled={record.status === "active" || record.status === "none"} type="primary" onClick={() => { onActivate(record._id) }}>Activate</Button>
        }
    ];
};

export const getExamColumns = (): ColumnsType<Exam> => {
    return [
        {
            title: 'Tên bộ đề',
            dataIndex: 'content',
            key: 'content',
            sorter: (a, b) => a.content.localeCompare(b.content),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => {
                const maxLength = 80;
                return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
            },
        },
        {
            title: 'Câu hỏi',
            dataIndex: 'total_question',
            key: 'total_question',
            align: 'center',
            sorter: (a, b) => a.total_question - b.total_question,
            render: (total: number) => <Tag color="blue">{total}</Tag>,
            width: 100,
        },
        {
            title: 'Thời gian',
            dataIndex: 'duration',
            key: 'duration',
            align: 'center',
            sorter: (a, b) => a.duration - b.duration,
            render: (duration: number) => formatMinutesToSecondsString(duration),
            width: 120,
        },
        {
            title: 'Người làm',
            dataIndex: 'total_user',
            key: 'total_user',
            align: 'center',
            sorter: (a, b) => a.total_user - b.total_user,
            render: (total: number) => total.toLocaleString('vi-VN'),
            width: 120,
        },
        // {
        //     title: 'Hành động',
        //     key: 'action',
        //     render: (_, record) => (/* Buttons */)
        // },
    ];
};


export const getQuestionColumns = (
    onAction: (record: Question, actionType: 'edit' | 'delete') => void
): ColumnsType<Question> => {

    // Ánh xạ kiểu câu hỏi sang tên hiển thị và màu sắc
    const typeMapping: Record<QuestionType, { name: string, color: string }> = {
        [QuestionTypeEnum.NORMAL]: { name: 'Bình thường', color: 'blue' },
        [QuestionTypeEnum.MULTIPLE]: { name: 'Nhiều lựa chọn', color: 'green' },
        [QuestionTypeEnum.DROP_MATCH]: { name: 'Kéo thả/Ghép đôi', color: 'volcano' },
        [QuestionTypeEnum.CLASSIFY]: { name: 'Phân loại', color: 'geekblue' },
        [QuestionTypeEnum.FILL_BLANK]: { name: 'Điền vào chỗ trống', color: 'purple' },
    };

    return [
        {
            title: 'STT',
            key: 'stt',
            render: (_text, _record, index) => index + 1,
            width: 70,
            align: 'center',
        },
        {
            title: 'Nội dung câu hỏi',
            dataIndex: 'content',
            key: 'content',
            sorter: (a, b) => a.content.localeCompare(b.content),
            render: (text: string) => {
                const maxLength = 100;
                return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
            },
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            align: 'center',
            className: 'w-[100px]',
            filters: [
                { text: 'Level 1', value: 1 },
                { text: 'Level 2', value: 2 },
                { text: 'Level 3', value: 3 },
            ],
            onFilter: (value, record) => record.level === value,
            sorter: (a, b) => (a.level - b.level),
            render: (level: number) => (
                <Tag color="cyan" key={level} >
                    <div className="text-center text-[14px]">{level.toString().toUpperCase()}</div>
                </Tag>
            ),
        },
        {
            title: 'Loại câu hỏi',
            dataIndex: 'question_type',
            key: 'question_type',
            filters: Object.keys(QuestionType).map(key => {
                const type = QuestionType[key as keyof typeof QuestionType];
                return {
                    text: typeMapping[type].name,
                    value: type,
                };
            }),
            onFilter: (value, record) => record.question_type === value,

            render: (type: QuestionTypeEnum) => {
                const mapping = typeMapping[type];
                if (mapping) {
                    return (
                        <Tag color={mapping.color}>
                            <div className="text-center text-[14px]">{mapping.name}</div>
                        </Tag>
                    );
                }
                return <Tag color="default">{type?.toUpperCase() ?? ""}</Tag>;
            },
            width: 180,
            align: 'center',
        },
        {
            title: 'Bộ đề thuộc về',
            dataIndex: 'exam_id',
            key: 'exam_id',
            render: (examIds: Exam[]) => (
                <Space size={[0, 8]} wrap>
                    {examIds?.map(exam => (
                        <Tag key={exam._id} color="purple">
                            {exam.content}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_text, record: Question) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                        onClick={() => onAction(record, 'edit')}
                        style={{ padding: 0 }}
                    >
                    </Button>
                    <Button
                        type="link"
                        danger
                        icon={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={() => onAction(record, 'delete')}
                        style={{ padding: 0 }}
                    />
                </Space>
            ),
            width: 120,
            align: 'center',
        },
    ];
};