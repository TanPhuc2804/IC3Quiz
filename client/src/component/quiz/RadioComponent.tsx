import { ConfigProvider, Radio, type RadioChangeEvent } from 'antd'
import { ModeEnum } from '../../types/enums';

type RadioComponentProp = {
    onChange: (e: RadioChangeEvent) => void,
    value: string,
    option: any[],
    isFaulty: boolean,
    mode:string
}


function RadioComponent({ onChange, value, option, isFaulty,mode }: RadioComponentProp) {
    const getClassname = (valueOtp: string) => {
        
        if (value !== valueOtp || mode ===ModeEnum.TESTING) {
            return "";
        }
        if (value === valueOtp && isFaulty) {
            return "bg-red-500 text-white rounded px-2 w-fit faulty"
        }

        return "correct bg-green-500 text-white rounded px-2 w-fit"
    }
    return (
        <ConfigProvider
            theme={{
                components: {
                    Radio: {
                        /* here is your component tokens */
                        buttonSolidCheckedHoverBg: "#fb2c36",
                        buttonSolidCheckedActiveBg: "#fb2c36",
                        buttonSolidCheckedBg: "#fb2c36"
                    },
                },
            }}
        >
            <Radio.Group onChange={onChange} value={value} style={{ display: "flex", flexDirection: "column" }}>
                {option.map((opt) => (
                    <Radio
                        key={opt.value}
                        className={getClassname(opt.value)}
                        value={opt.value}
                    >
                        {opt.label}
                    </Radio>
                ))}
            </Radio.Group>
        </ConfigProvider>
    )
}

export default RadioComponent