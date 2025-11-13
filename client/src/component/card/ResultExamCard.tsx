import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Progress, Tag, type TableProps } from 'antd';
import type { Exam_Result } from '../../types'
import { useNavigate } from 'react-router';

type Props = {
    resultsData: Exam_Result[];
}

// Hàm hỗ trợ: Chuyển đổi giây sang Phút:Giây
const formatTime = (totalSeconds: number) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        return '0 giây';
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 0) {
        return `${minutes} phút ${seconds} giây`;
    }
    return `${seconds} giây`;
};
const ResultExamCard = (props: Props) => {
    const navigate = useNavigate()
    const columns: TableProps<Exam_Result>['columns'] = [
        {
            title: 'Ngày làm bài',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string | undefined) => { // <-- Thêm type cho 'text'
                if (!text) {
                    return <Tag color="gray">Không rõ</Tag>;
                }
                return new Date(text).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
            },
            // Thêm logic sorter an toàn cho (string | undefined)
            sorter: (a, b) =>
                new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime(),
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
            key: 'score',
            render: (score: number) => ( // <-- Thêm type
                <strong className="text-blue-600 text-lg">
                    {score.toFixed(1)}
                </strong>
            ),
            sorter: (a, b) => a.score - b.score,
        },
        {
            title: 'Độ chính xác',
            dataIndex: 'accurary_percentage',
            key: 'accurary_percentage',
            render: (percent: number) => ( // <-- Thêm type
                <div style={{ width: 170 }}>
                    <Progress
                        percent={parseFloat(percent.toFixed(1))} // Đảm bảo là số
                        size="small"
                        status="active"
                        strokeColor={{
                            '0%': '#f87171', // Tailwind red-400
                            '100%': '#4ade80', // Tailwind green-400
                        }}
                    />
                </div>
            ),
            sorter: (a, b) => a.accurary_percentage - b.accurary_percentage,
        },
        {
            title: 'Thời gian nộp',
            dataIndex: 'submit_time',
            key: 'submit_time',
            render: (time: number) => ( // <-- Thêm type
                <span className="text-gray-700">{formatTime(time)}</span>
            ),
            sorter: (a, b) => a.submit_time - b.submit_time,
        },
        {
            title: 'Số câu',
            dataIndex: 'total_content',
            key: 'total_content',
            align: 'center',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={props.resultsData}
            rowKey={(record: Exam_Result) => record._id ?? ""}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 800 }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        navigate(`/exams/user-result/${record._id}`);
                    }
                };
            }}
        />
    );
};

export default ResultExamCard