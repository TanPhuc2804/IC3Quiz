import { Card, Col, Statistic } from 'antd'

type Props = {
    content:string,
    value:number,
    icon:string,
    growth?:string,
    color?:string
}

function StatisticsCardDashboard({ content, value, icon, growth, color }: Props) {
    return (
        <Col xs={24} sm={12} lg={6}>
            <Card  className="shadow-md hover:shadow-lg transition-all rounded-xl cursor-pointer h-full">
                <Statistic
                    title={<span className="text-gray-500 font-semibold">{content}</span>}
                    value={value}
                    valueStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                />
                <div className="mt-2 text-2xl">{icon}</div>
                <div className={`mt-2 text-xs font-bold ${color ? color : 'text-gray-400'}`}>
                    {growth}
                </div>
            </Card>
        </Col>
    )
}

export default StatisticsCardDashboard