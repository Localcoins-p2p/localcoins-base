import React from 'react'
import { inputFont } from '../font/Font'

const LocaCoins = () => {
  return (
    <div className='mt-10 '>
    <h1 className={"text-[32px] text-[#FFFFFF]  font-bold mb-4 uppercase " + inputFont.className}>
      LocalCoins Disclaimer{' '}
    </h1>
    <div className='text-[#FFFFFF] '>
      <span className="text-[22px] font-[600]">Last Update : </span>
      <span className=" font-[400] text-[18px] "> Sept 17, 2024 </span>
    </div>
  </div>
  )
}

export default LocaCoins