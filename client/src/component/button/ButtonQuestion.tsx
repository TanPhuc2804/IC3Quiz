import { Button, ConfigProvider } from 'antd'
import React from 'react'

type ButtonQuestionProp= {
  content:string|number,
  size: "large" | "middle" | "small"
}

function ButtonQuestion({content,size}:ButtonQuestionProp) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "#e8f2ff",
            defaultHoverBg: '#e8f2ff',
            defaultHoverColor: "#35509a",
            defaultHoverBorderColor: "#d9d9d9",
            defaultColor:"#35509a",
            fontWeight:650
          },
        },
      }}
    >
      <div>
        <Button shape='circle' size={size}>{content}</Button>
      </div>
    </ConfigProvider>
  )
}

export default ButtonQuestion