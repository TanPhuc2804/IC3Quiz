import { Button, ConfigProvider } from 'antd'
import React from 'react'

function ButtonSubmit() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        defaultHoverBg:'#061b37',
                        defaultHoverColor:"white",
                        defaultHoverBorderColor:"white",
                        contentFontSizeLG:18,
                    },
                },
            }}
        >
            <div className='flex justify-center'>
                <Button className='my-4 w-[150px] font-bold' size='large'>Nộp bài</Button>
            </div>
        </ConfigProvider>

    )
}

export default ButtonSubmit