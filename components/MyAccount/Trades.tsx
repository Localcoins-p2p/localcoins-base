import React from 'react'

const Trades = ({heading,timer,positive,negitive}:{heading:string,timer:string,positive?:string,negitive?:string}) => {
  return (
    <div className='sm:w-[282px] sm:h-[168px]  w-full rounded-[10px] flex-row flex sm:flex-col sm:justify-center items-center justify-between border-[#454545] sm:border'> 
        <div className='sm:text-[18px] text-[12px] font-[500] text-[#A6A6A6]'> {heading}</div>
        <div className='sm:text-[28px] text-[12px] font-[500] text-[#FFFFFF]'>{timer}</div>
        {positive&&negitive&& <div  ><span className='text-[14px] text-[#0ECB81]'>{positive}</span>/<span className='text-[14px] text-[#F6465D]'>{negitive}</span></div>}

    </div>
  )
}

export default Trades