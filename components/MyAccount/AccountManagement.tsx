'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const AccountManagement = ({ onTabChange }: { onTabChange: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const links = [
    { href: '', label: 'P2P Payment Methods' },
    { href: '', label: 'Sale Order' },
    { href: '', label: 'Purchase Order' },
    // { href: '#', label: 'Feedback (17)' },
    // { href: '#', label: 'Blocked Users' },
    // { href: '#', label: 'Follows' },
    // { href: '#', label: 'Restriction Removal Center' },
    // { href: '#', label: 'Notification Settings' },
  ];

  useEffect(() => {
    onTabChange(activeIndex);
  }, [activeIndex, onTabChange]);

  return (
    <div className=" flex gap-3 items-center">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`px-4 min-w-max py-2 ${
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
