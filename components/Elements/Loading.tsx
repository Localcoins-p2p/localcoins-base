import React from 'react';

interface LoadingProps {
  width: string;
  height: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ width, height, color }) => {
  return (
    <div
      className={`animate-spin rounded-full h-${height} w-${width} border-t-2 border-b-2 ${
        color ? `border-[${color}]` : 'border-[#333]'
      } border-2 border-r-transparent border-l-transparent`}
    ></div>
  );
};

export default Loading;
