import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type StatisticsResultType ={
    status:boolean,
    number:number,
    content:string
}

function StatisticsResult({status,content,number}:StatisticsResultType) {

    const getIcon = (status:boolean)=>{
        if(status)
            return (<FontAwesomeIcon color='#3cb46e' fontSize={"23px"} icon={faCircleCheck} />)
        return (<FontAwesomeIcon  color='#e43a45' fontSize={"23px"}icon={faCircleXmark} />)
    }

  return (
    <div className='w-[272px] h-[165px] mt-[20px] flex flex-col mb-[16px] items-center justify-start py-[24px] px-[16px] shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] border-1 border-[#efefef] rounded-[10.5px] '>
        <div>{getIcon(status)}</div>
        <div className={`font-semibold ${status ? "text-[#3cb46e]" : "text-[#e43a45]"}` }>{content}</div>
        <div className='text-2xl font-bold'>{number}</div>
        <div>Câu hỏi</div>
    </div>
  )
} 

export default StatisticsResult