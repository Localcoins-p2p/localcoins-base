'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const AccountManagement = ({ onTabChange }: { onTabChange: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const links = [
    { href: 'p2p-payment-methods', id: "p2p-payment-methods", label: 'P2P Payment Methods' },
    { href: 'sale-order', id: 'sale-order', label: 'Sale Order' },
    { href: 'purchase-order', id: 'purchase-order', label: 'Purchase Order' },
    // Add more links here as needed
  ];


  useEffect(() => {
    if (page) {
      const activeLinkIndex = links.findIndex(link => link.href === page);
      onTabChange(activeLinkIndex);
    }
  }, [page, links, onTabChange]);

  return (
    <div className="flex gap-3 items-center">
      {links.map((link, index) => (
        <div
          key={index}
          id={link.id}
          className={`px-4 min-w-max py-2 cursor-pointer ${
            link.href === page
              ? 'rounded-[5px] bg-[#F3AA05] text-black'
              : 'text-white'
          }`}
          onClick={() => router.push("/my-account?page=" + link.href)}
        >
          {link.label}
        </div>
      ))}
    </div>
  );
};

export default AccountManagement;
