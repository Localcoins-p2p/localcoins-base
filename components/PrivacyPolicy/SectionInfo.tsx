import React from 'react';
import { spacing } from 'react-select/dist/declarations/src/theme';
import { inputFont } from '../font/Font'

interface SectionInfoProps {
  title: string;
  disc?: any;
  email?: any;
  items?: { heading: string; description: string }[];
}

const SectionInfo: React.FC<SectionInfoProps> = ({
  title,
  items,
  disc,
  email,
}) => {
  return (
    <div className=" text-[#FFFFFF]">
      <h2 className={"text-[24px] font-bold mb-2 " + inputFont.className }>{title}</h2>
      <p className={"mb-6 text-[18px] font-[400] text-[#EBEBEB] "  }>
        {disc} {email && <div className="text-[#F3AA05]">{email}</div>}
      </p>
      {items && items.length > 0 && (
        <ul className="list-inside">
          {items.map((item, index) => (
            <li key={index} className="mb-2 list-inside ml-2">
              <div className="flex items-start">
                <span className="text-[#F3AA05] mr-2">•</span>
                <span>
                  <span className={"font-bold min-w-max mr-2" }>
                    {item.heading}
                  </span>
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
