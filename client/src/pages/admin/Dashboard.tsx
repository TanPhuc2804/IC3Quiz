
import Card from 'antd/es/card/Card';
import Col from 'antd/es/grid/col';
import Row from 'antd/es/grid/row';
import Progress from 'antd/es/progress/progress';
import Statistic from 'antd/es/statistic/Statistic';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react'
import { Avatar, List, Typography } from 'antd';
import StatisticsCardDashboard from '../../component/card/StatisticsCardDashboard';
import StatisticsCardClassifyDashboard from '../../component/card/StatisticsCardClassifyDashboard';
import axios from 'axios';

type Props = {}
export interface IQuestionTypeStat {
    type: string;
    count: number;
    color: string;
}
export interface IQuizLevelStat {
    title: string;
    count: number;
    color: 'success' | 'processing' | 'error' | string;
    desc: string;
}


export interface IDashboardState {
    totalQuestions: number;
    totalQuizzes: number;
    totalUsers: number;
    activeNow: number;
    questionTypes: IQuestionTypeStat[];
    quizzesByLevel: IQuizLevelStat[];
}
const initialState: IDashboardState = {
    totalQuestions: 0,
    totalQuizzes: 0,
    totalUsers: 0,
    activeNow: 0,
    questionTypes: [
        { type: 'Trắc nghiệm', count: 0, color: '#3b82f6' },
        { type: 'Đúng/Sai', count: 0, color: '#10b981' },
        { type: 'Điền từ', count: 0, color: '#f59e0b' },
        { type: 'Tự luận', count: 0, color: '#ef4444' },
    ],
    quizzesByLevel: [
        { title: 'Level 1: Cơ Bản', count: 0, color: 'success', desc: 'Dành cho người mới bắt đầu' },
        { title: 'Level 2: Trung Bình', count: 0, color: 'processing', desc: 'Kiến thức tổng hợp' },
        { title: 'Level 3: Nâng Cao', count: 0, color: 'error', desc: 'Chuyên sâu & Khó' },
    ]
}

function Dashboard({ }: Props) {

    const [data, setData] = React.useState<IDashboardState>(initialState)

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.get(`${apiUrl}/dashboard/stats`, { withCredentials: true })
            .then(res => res.data)
            .then(data => {
                setData(data);
            })
            .catch(err => {
                console.error("Error fetching dashboard stats: ", err);
            });
    }, [])
    return (
        <div className="min-h-screen p-6 font-sans">
            {/* === SECTION 1: KEY METRICS === */}
            <Row gutter={[16, 16]} className="mb-6">
                {/* Card 1 */}
                <StatisticsCardDashboard
                    content="Tổng Câu Hỏi"
                    value={data.totalQuestions}
                    icon="📝"
                    growth="⬆️ +12% tăng trưởng"
                    color="text-green-500"
                />

                {/* Card 2 */}
                <StatisticsCardDashboard
                    content="Tổng Bộ Đề"
                    value={data.totalQuizzes}
                    icon="📚"
                    growth="Đang hoạt động"
                    color="text-gray-400"
                />

                {/* Card 3 */}
                <StatisticsCardDashboard
                    content="Tổng Người Dùng"
                    value={data.totalUsers}
                    icon="👥"
                    growth="+50 user mới hôm nay"
                    color="text-blue-500"
                />


                {/* Card 4 */}
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-md hover:shadow-lg transition-all rounded-xl cursor-pointer h-full">
                        <Statistic
                            title={<span className="text-gray-500 font-semibold">Phân Loại</span>}
                            value={data.questionTypes.length}
                            suffix="Loại"
                            valueStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                        />
                        <div className="mt-2 text-2xl">🧩</div>
                        <div className="mt-2 text-xs text-gray-400">Đa dạng cấu trúc</div>
                    </Card>
                </Col>
            </Row>

            {/* === SECTION 2: CHI TIẾT === */}
            <Row gutter={[24, 24]}>

                {/* CỘT TRÁI: Thống kê loại câu hỏi */}
                <StatisticsCardClassifyDashboard
                    questionTypes={data.questionTypes}
                    totalQuestions={data.totalQuestions}
                />

                {/* CỘT PHẢI: Thống kê bộ đề theo Level */}
                <Col xs={24} lg={8}>
                    <Card
                        title={<Title level={4} style={{ margin: 0 }}>📚 Bộ Đề Theo Level</Title>}
                        bordered={false}
                        className="shadow-md rounded-xl h-full"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={data.quizzesByLevel}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{
                                                    backgroundColor: item.color === 'success' ? '#f6ffed' : item.color === 'processing' ? '#e6f7ff' : '#fff1f0',
                                                    color: item.color === 'success' ? '#52c41a' : item.color === 'processing' ? '#1890ff' : '#ff4d4f',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {item.title.includes('1') ? '1' : item.title.includes('2') ? '2' : '3'}
                                            </Avatar>
                                        }
                                        title={<Typography.Text strong>{item.title}</Typography.Text>}
                                        description={<Typography.Text type="secondary" style={{ fontSize: '12px' }}>{item.desc}</Typography.Text>}
                                    />
                                    <div className="text-right">
                                        <Typography.Text strong style={{ fontSize: '18px' }}>{item.count}</Typography.Text>
                                        <div className="text-xs text-gray-400">đề</div>
                                    </div>
                                </List.Item>
                            )}
                        />

                        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                            <Typography.Text type="secondary" className="block mb-2">Độ khó trung bình</Typography.Text>
                            <Progress type="circle" percent={75} size={80} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard