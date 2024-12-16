import Image from 'next/image';
import React from 'react';
import appLoading from '@/public/assets/app-loading.svg';

interface LoadingProps {
  width: string;
  height: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ width, height, color }) => {
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
        zIndex: 999,
      }}
    >
      <span className="animate-spin">
        <Image src={appLoading} alt="" width={320} height={320} />
      </span>
    </div>
  );
};

export default Loading;
