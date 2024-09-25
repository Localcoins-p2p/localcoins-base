import React from 'react';
import { spacing } from 'react-select/dist/declarations/src/theme';

interface SectionInfoProps {
  title: string;
  disc?:string
  email?:string
  items?: { heading: string; description: string }[];
}

const SectionInfo: React.FC<SectionInfoProps> = ({ title, items,disc , email}) => {
  return (
    <div className=" text-[#FFFFFF]">
      <h2 className="text-[24px] font-bold mb-4">{title}</h2>
      <p className="mb-6 text-[18px] font-[400] text-[#EBEBEB]">
     {disc} {email&& <span className='text-[#F3AA05]'>{ email}</span>}
      </p>
      {items && items.length > 0 && (
      <ul className='list-inside'>
        {items.map((item, index) => (
          <li key={index} className="mb-4 list-inside ml-2">
            <div className="flex items-start">
              <span className="text-[#F3AA05] mr-2">•</span>
              <span >
                <span className="font-bold min-w-max mr-2">{item.heading}</span>
                <span>{item.description}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default SectionInfo;
