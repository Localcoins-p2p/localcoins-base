import React from 'react';
import appLoading from '@/public/assets/app-loading.svg';
import Image from 'next/image';

const AppLoading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#181818',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span className="animate-spin">
        <Image src={appLoading} alt="" width={320} height={320} />
      </span>
    </div>
  );
};

export default AppLoading;
