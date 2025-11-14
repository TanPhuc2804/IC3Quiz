import { Timeline, ConfigProvider } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

function TimeLineStory() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Timeline: {
                        /* here is your component tokens */
                        fontSize: 25,
                        itemPaddingBottom: 40,
                        dotBorderWidth: 2,
                        tailWidth: 2,
                        // lineHeight:1
                        lineWidth: -2
                    },
                },
            }}
        >
            <Timeline
                pending="Recording..."
                pendingDot={<LoadingOutlined style={{ fontSize: '18px' }} />}
                items={[
                    {
                        dot: (<div style={{ width: '20px', height: '20px', border: '3px solid #1890ff', borderRadius: '50%' }}></div>),
                        children: '23/08/2025 Analysis Requirements',
                    },
                    {
                        dot: (<div style={{ width: '20px', height: '20px', border: '3px solid #1890ff', borderRadius: '50%' }}></div>),
                        children: '25/08/2025 Analysis Database',
                    },
                    {
                        dot: (<div style={{ width: '20px', height: '20px', border: '3px solid #1890ff', borderRadius: '50%' }}></div>),
                        children: '27/08/2025 Building the FE',
                    }

                ]}
            />
        </ConfigProvider>
    )
}

export default TimeLineStory