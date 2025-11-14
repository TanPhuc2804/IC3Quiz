import { Button, ConfigProvider } from 'antd'


function ButtonSubmit({disable,handleSubmit}:any) {

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
                <Button className='my-4 w-[150px] font-bold' size='large' disabled={!disable} onClick={handleSubmit}>Nộp bài</Button>
            </div>
        </ConfigProvider>

    )
}

export default ButtonSubmit