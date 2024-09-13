import React from 'react'

const Trades = ({heading,timer,positive,negitive}:{heading:string,timer:string,positive?:string,negitive?:string}) => {
  return (
    <div className='w-[282px] h-[168px] rounded-[10px] flex flex-col justify-center items-center border-[#454545] border'> 
        <div className='text-[18px] font-[500] text-[#A6A6A6]'> {heading}</div>
        <div className='text-[28px] font-[500] text-[#FFFFFF]'>{timer}</div>
        {positive&&negitive&& <div  ><span className='text-[14px] text-[#0ECB81]'>{positive}</span>/<span className='text-[14px] text-[#F6465D]'>{negitive}</span></div>}

    </div>
  )
}

export default Trades