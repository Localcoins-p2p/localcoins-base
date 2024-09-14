'use client'
import Link from 'next/link';
import { useState } from 'react';

const AccountManagement = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const links = [
    { href: '#', label: 'P2P Payment Methods' },
    { href: '#', label: 'Feedback (17)' },
    { href: '#', label: 'Blocked Users' },
    { href: '#', label: 'Follows' },
    { href: '#', label: 'Restriction Removal Center' },
    { href: '#', label: 'Notification Settings' },
  ];

  return (
    <div className=" flex justify-between items-center">
    {links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={`px-4 py-2 ${
          activeIndex === index
            ? 'rounded-[5px] bg-[#F3AA05] text-black'
            : 'text-white'
        }`}
        onClick={() => setActiveIndex(index)}
      >
        {link.label}
      </Link>
    ))}
  </div>
  );
};

export default AccountManagement;
