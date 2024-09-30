import React from 'react';
import DisclaimerHeader from './DisclaimerHeader';
import DisclaimerMain from './DisclaimerMain';


const Disclaimer = () => {
  
  return (
    <div className=' grid grid-rows-[calc(100%px)_100px] h-[calc(100vh-0px)] overflow-hidden '>
      <DisclaimerHeader />
      <div className='overflow-y-auto overflow-x-l'>
     <DisclaimerMain/>
     </div>
    
    </div>
  );
};

export default Disclaimer;
