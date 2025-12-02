import { useState } from 'react'
import Exam from '../../../component/layouts/sections/home/Exam'
import CategoryFilter from '../../../component/orther/FillterCategories'

function ExamPage() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
  const handleFilterChange = (selectedIds: number[]) => {
    setSelectedCategoryIds(selectedIds)
  }
  return (
    <div>
      <CategoryFilter onFilterChange={handleFilterChange} />
      <Exam selectedCategoryIds={selectedCategoryIds} />
    </div>
  )
}

export default ExamPage