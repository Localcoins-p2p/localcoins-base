import React from 'react';
import NewHeader from '../NewHeader/NewHeader';
import PrivacyTermOfUseNav from '../Elements/PrivacyTermOfUseNav';
import LocalTerm from './LocalTerm';
import SectionInfo from '../PrivacyPolicy/SectionInfo';
import PrivacyTermOfUseFooter from '../Elements/PrivacyTermOfUseFooter';

const TermOfUse = () => {
  const infoItems = [
    {
      heading: ' ',
      description:
        'You are at least 18 years old or the age of legal consent in your jurisdiction.',
    },
    {
      heading: '',
      description:
        'You have the legal capacity and authority to enter into a binding contract.',
    },
    {
      heading: '',
      description:
        'Your use of the platform is in compliance with all applicable laws and regulations. If you are using the platform on behalf of an entity, you warrant that you have the legal authority to bind that entity to these Terms and Conditions.',
    },
  ];
  const infoItems1 = [
    {
      heading: 'Compliance with Laws: ',
      description:
        ' You are responsible for ensuring that your use of the platform complies with all applicable local, national, and international laws, including those related to cryptocurrency trading, taxation, and anti-money laundering (AML) regulations.',
    },
    {
      heading: 'Payment Methods:',
      description:
        ' Users are solely responsible for the selection of payment methods for fiat currency transactions and must ensure that these methods are compliant with regulatory requirements.',
    },
    {
      heading: 'Risk Management: ',
      description:
        'You acknowledge the volatile nature of cryptocurrencies and understand that you are fully responsible for any losses incurred through the use of the platform.',
    },
  ];
  const infoItems2 = [
    {
      heading: ' ',
      description:
        'Using the platform for any unlawful or fraudulent purposes.',
    },
    {
      heading: '',
      description:
        ' Attempting to gain unauthorized access to the platform or other user accounts.',
    },
    {
      heading: '',
      description:
        'Using the platform to distribute or post spam, viruses, or other harmful software.',
    },
    {
      heading: '',
      description:
        'Misrepresenting your identity or falsely claiming affiliation with any person or entity.',
    },
    {
      heading: '',
      description:
        'Engaging in activities that violate any applicable AML, KYC, or financial regulations',
    },
  ];
  const infoItems3 = [
    {
      heading: ' ',
      description: 'Your use of or inability to use the platform.',
    },
    {
      heading: '',
      description: ' Errors in smart contracts or blockchain transactions.',
    },
    {
      heading: '',
      description:
        'Loss of funds due to unauthorized access or security breaches.',
    },
    {
      heading: '',
      description:
        'Misrepresenting your identity or falsely claiming affiliation with any person or entity.',
    },
    {
      heading: '',
      description:
        'Any actions of third-party payment providers or external services. LocalCoins provides the platform "as is" and makes no warranties, whether express or implied, regarding the platform’s availability, reliability, or performance.',
    },
  ];
  return (
    <>
    <div className="w-[85%] mx-auto ">
      <div className="lg:hidden">
        <NewHeader />
      </div>
      <div className="hidden lg:block">
        <PrivacyTermOfUseNav />
      </div>
      <LocalTerm />
      <p className="mb-6 text-[18px] font-[400] text-[#EBEBEB]">
        Welcome to LocalCoins, a decentralized peer-to-peer cryptocurrency
        platform. By accessing or using the LocalCoins platform, you agree to
        comply with and be bound by the following terms and conditions. Please
        read these terms carefully. If you do not agree with any part of these
        terms, you must refrain from using our platform.
      </p>
      <SectionInfo
        title="1. Acceptance of Terms"
        disc="By using LocalCoins, you agree to abide by these Terms and Conditions, as well as any additional terms and policies referenced herein, including our Privacy Policy and Disclaimer. We may modify these terms at any time, and such changes will be effective immediately upon posting. It is your responsibility to review the Terms and Conditions periodically."
      />
      <SectionInfo
        title="2. Platform Overview"
        disc="LocalCoins provides a decentralized platform for peer-to-peer cryptocurrency transactions. The platform acts as a decentralized escrow system for holding cryptocurrency, but it does not process or manage any fiat currency transactions. All fiat exchanges occur directly between users and are subject to the terms and conditions of external payment providers (banks, payment apps, etc.)."
      />
      <SectionInfo
        title="3. Eligibility"
        items={infoItems}
        disc="By using LocalCoins, you represent and warrant that:"
      />
      <SectionInfo
        title="4. User Accounts"
        disc="To use certain features of the platform, you may be required to create an account. You agree to provide accurate and complete information and to update it as necessary. You are responsible for maintaining the confidentiality of your account login credentials and for any activity that occurs under your account."
      />
      <SectionInfo
        title="5. Non-Custodial Nature of the Platform"
        disc="LocalCoins operates as a non-custodial platform, meaning that it does not hold or manage any user funds or fiat currency. Cryptocurrency transactions are facilitated through decentralized smart contracts, and fiat transactions occur outside of the platform between users. LocalCoins does not guarantee the success, completion, or accuracy of any transaction conducted outside of its decentralized network."
      />
      <SectionInfo title="6. User Responsibilities" items={infoItems1} />
      <SectionInfo
        title="7. Prohibited Activities"
        items={infoItems2}
        disc="You agree not to engage in any of the following prohibited activities:"
      />
      <SectionInfo
        title="8. Reporting Fraud and Disputes"
        disc="LocalCoins provides tools for reporting fraudulent activity, including wallet backtracking and transaction history reports. If you suspect any suspicious activity, you must promptly report it using the platform’s reporting functions. While LocalCoins does not mediate disputes between users, we cooperate with law enforcement agencies and may provide transaction data and wallet histories upon request."
      />
      <SectionInfo
        title="9. Fees"
        disc="LocalCoins may charge transaction fees for using certain services on the platform. Any applicable fees will be displayed on the platform prior to the completion of a transaction. All fees are non-refundable unless otherwise stated. LocalCoins reserves the right to change fee structures at any time."
      />
      <SectionInfo
        title="10. Intellectual Property"
        disc="All content, branding, trademarks, and other intellectual property on the LocalCoins platform are the exclusive property of LocalCoins or its licensors. You may not copy, reproduce, distribute, or create derivative works of any content on the platform without express written permission."
      />
      <SectionInfo
        title="11. Limitation of Liability"
        items={infoItems3}
        disc="LocalCoins, its developers, and affiliates will not be held liable for any direct, indirect, incidental, or consequential damages arising from:"
      />
      <SectionInfo
        title="12. Termination"
        disc="LocalCoins reserves the right to suspend or terminate your access to the platform at any time, with or without notice, for violating these Terms and Conditions or engaging in illegal activity. Upon termination, your right to use the platform will immediately cease."
      />
      <SectionInfo
        title="13. Governing Law"
        disc="These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes arising from your use of the platform shall be subject to the exclusive jurisdiction of the courts in the Philippines."
      />
      <SectionInfo
        title="14. Contact Information"
        disc="For any questions regarding these Terms and Conditions, you may contact us at:Email: "
        email=" localcoinsp2p@gmail.com"
      />
       <div className="mb-32"></div>
    </div>
    <PrivacyTermOfUseFooter />
    </>
  );
};

export default TermOfUse;
