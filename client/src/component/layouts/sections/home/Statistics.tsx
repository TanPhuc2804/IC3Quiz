import React from 'react'

type StatisticsProp ={
    data:string,
    content:string
}
function Statistics({data,content}:StatisticsProp) {
  return (
    <div>
        <p className='font-bold text-[40px]'>{data}</p>
        <p className='text-[25px] max-w-[200px]'>{content}</p>
    </div>
  )
}

export default Statistics