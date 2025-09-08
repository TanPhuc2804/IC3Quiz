import { Radio, type RadioChangeEvent } from 'antd'
import React from 'react'

type RadioComponentProp = {
    onChange: (e: RadioChangeEvent) => void,
    value: string,
    option: any[]
}

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
};

function RadioComponent({onChange,value,option}:RadioComponentProp) {
    return (
        <Radio.Group
            onChange={onChange}
            value={value}
            style={style}
            options={option}
        />
    )
}

export default RadioComponent