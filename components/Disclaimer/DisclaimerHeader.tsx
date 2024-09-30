import Image from 'next/image'
import React from 'react'
import { inputFont } from '../font/Font'

const DisclaimerHeader = () => {
  return (
    <div className="font-sans bg-[#F3AA05] text-black flex justify-between items-center p-2 rounded-t-lg">
    <div className={"font-sans font-bold text-[28px] tracking-widest " + inputFont.className}>DISCLAIMER</div>
    <Image src={"/assets/common/crosss.svg"} height={32} width={32} alt='dff'/>
  </div>
  
  )
}

export default DisclaimerHeader