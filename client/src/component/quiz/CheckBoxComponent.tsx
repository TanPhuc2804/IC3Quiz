import { Checkbox, type GetProp, type RadioChangeEvent } from 'antd'
import React, { useState } from 'react'

type CheckBoxProp = {
    options: { label: string; value: string }[];
    onChange?: (checkedValues: any[]) => void;
    limit_choice: number
};
const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
};
function CheckBoxComponent({ onChange, options, limit_choice }: CheckBoxProp) {
    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (checkedValues: string[]) => {
        setSelected(checkedValues);
        if (onChange) {
            onChange(checkedValues);
        }
    };

    return (
        <Checkbox.Group value={selected} onChange={handleChange} style={{ display: "flex", flexDirection: "column", gap: "8px" }} >
            {options.map((opt) => (
                <Checkbox
                    key={opt.value}
                    value={opt.value}
                    disabled={selected.length >= limit_choice && !selected.includes(opt.value)}
                >
                    {opt.label}
                </Checkbox>
            ))}
        </Checkbox.Group>
    );
};


export default CheckBoxComponent