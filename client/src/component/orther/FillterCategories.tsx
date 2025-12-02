import React, { useState } from 'react';
import { Select } from 'antd';
import { categories } from '../../data/categories';

const { Option } = Select;
interface CategoryFilterSelectProps {
    onFilterChange: (selectedIds: number[]) => void;
}

const CategoryFilterSelect: React.FC<CategoryFilterSelectProps> = ({
    onFilterChange
}) => {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    const handleSelectChange = (values: number[]) => {
        setSelectedCategoryIds(values);

        onFilterChange(values);
    };

    return (
        <div className="my-6 flex justify-end  mr-10 mt-12">
            <div className="p-4 bg-white shadow-xl rounded-xl border border-gray-100 w-2xs flex flex-col ">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 ">
                    Lọc theo Danh Mục
                </h3>

                <div className="w-full">
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-full"
                        placeholder="Chọn (các) danh mục để lọc"
                        value={selectedCategoryIds}
                        onChange={handleSelectChange}
                        dropdownClassName="shadow-lg border border-gray-200"
                    >
                        {categories.map((cat) => (
                            <Option key={cat.id} value={cat.id}>
                                {cat.content}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilterSelect;