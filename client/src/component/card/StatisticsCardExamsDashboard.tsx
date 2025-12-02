import { Avatar, Card, Col, List, Progress, Typography } from 'antd'
import Title from 'antd/es/typography/Title'

type Props = {
    quizzesByLevel: Array<{
        title: string,
        count: number,
        color: 'success' | 'processing' | 'error',
        desc: string
    }>
}

function StatisticsCardExamsDashboard({ quizzesByLevel }: Props) {
    return (
        <Col xs={24} lg={8}>
            <Card
                title={<Title level={4} style={{ margin: 0 }}>📚 Bộ Đề Theo Level</Title>}
                bordered={false}
                className="shadow-md rounded-xl h-full"
            >
                <List
                    itemLayout="horizontal"
                    dataSource={quizzesByLevel}
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
    )
}

export default StatisticsCardExamsDashboard