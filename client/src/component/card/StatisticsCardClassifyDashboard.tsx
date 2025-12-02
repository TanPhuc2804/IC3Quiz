import { Card, Col, Divider, Progress, Tag, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

type Props = {
    questionTypes?: Array<{
        type: string,
        count: number,
        color: string
    }>,
    totalQuestions?: number
}

function StatisticsCardClassifyDashboard({ questionTypes,totalQuestions }: Props) {
    return (
        <Col xs={24} lg={16}>
            <Card
                title={<Title level={4} style={{ margin: 0 }}>📊 Phân Bổ Loại Câu Hỏi</Title>}
                bordered={false}
                className="shadow-md rounded-xl h-full"
            >
                <div className="flex flex-col gap-6 pt-2">
                    {questionTypes?.map((item, index) => {
                        const percent = Math.round((item.count / (totalQuestions || 1)) * 100);
                        return (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <Typography.Text strong>{item.type}</Typography.Text>
                                    <Typography.Text type="secondary">{item.count} câu ({percent}%)</Typography.Text>
                                </div>
                                <Progress
                                    percent={percent}
                                    strokeColor={item.color}
                                    trailColor="#f3f4f6"
                                    strokeWidth={12}
                                    showInfo={false}
                                />
                            </div>
                        );
                    })}
                </div>

                <Divider />
                <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Typography.Text type="secondary">Loại phổ biến nhất:</Typography.Text>
                    <Tag color="blue" className="text-lg px-3 py-1 font-bold">Trắc nghiệm</Tag>
                </div>
            </Card>
        </Col>
    )
}

export default StatisticsCardClassifyDashboard