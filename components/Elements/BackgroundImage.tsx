import Image from 'next/image';
import React from 'react';

const BackgroundImage = () => {
  return (
    <div className="fixed left-0 top-0 -z-10 w-screen h-screen">
      <div className="relative w-full h-full pt-[4%]">
        <Image
          src="/rampz/rampz-bg.png"
          alt="Background Image"
          width={1545}
          height={888}
          className="w-full h-full object-cover mix-blend-multiply blur-[2px]"
        />
        {/* Optional: Add a background color for blending */}
        <div className="absolute inset-0 bg-milk-white mix-blend-multiply"></div>
      </div>
    </div>
  );
};

export default BackgroundImage;
