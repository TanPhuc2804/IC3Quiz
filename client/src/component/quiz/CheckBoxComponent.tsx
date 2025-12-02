import { Checkbox} from 'antd'
import  { useState } from 'react'
import type { ResultQuestionType } from '../../types';
import { ModeEnum } from '../../types/enums';

type CheckBoxProp = {
    options: { label: string; value: string }[];
    onChange?: (checkedValues: any[]) => void;
    limit_choice: number,
    faulties: ResultQuestionType[],
    mode:string
};

function CheckBoxComponent({ onChange, options, limit_choice, faulties,mode }: CheckBoxProp) {
    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (checkedValues: string[]) => {
        setSelected(checkedValues);
        if (onChange) {
            onChange(checkedValues);
        }
    };

    const findValue = (value: string) => {
        if (faulties.length === 0) {
            return -2
        }
        return faulties.findIndex(item => item.choice === value)
    }

    const style = (value: string) => {
        if(!selected.includes(value) || mode === ModeEnum.TESTING){
            return ""
        }

        if (findValue(value) > -1) {
            return "bg-red-500 w-fit faulty"
        }
        if (findValue(value) <=-1) {
            return "bg-green-500 w-fit correct"
        }

    }

    return (
        <Checkbox.Group value={selected} onChange={handleChange} style={{ display: "flex", flexDirection: "column", gap: "8px" }} >
            {options.map((opt) => (
                <Checkbox
                    key={opt.value}
                    value={opt.value}
                    disabled={selected.length >= limit_choice && !selected.includes(opt.value)}
                    className={style(opt.value)}
                >
                    {opt.label}
                </Checkbox>
            ))}
        </Checkbox.Group>
    );
};


export default CheckBoxComponent