import React from 'react'
import MainHeading from '../Elements/MainHeading'
import NewHeader from '../NewHeader/NewHeader'
import P2PTable from '../Elements/P2PTable'
import Footer from '../Footer/Footer'

const P2PTrading = () => {
  return (
    <div className="w-[85%] mx-auto ">
      <NewHeader />
   
      <div className="my-20">
        <MainHeading
          title="P2P"
          para=" Securely Buy and Sell Digital Assets with Flexible Payment Options"
          t1="P2P Help Center"
          t2="Orders"
        />
      </div>
      <P2PTable/>
      <Footer/>
      </div>
  )
}

export default P2PTrading