import React from 'react';
import LocaCoins from './LocaCoins';
import SectionInfo from '../PrivacyPolicy/SectionInfo';
import Button from './Button';
import './scrollbar.css';
const DisclaimerMain = () => {
  const infoItems = [
    {
      heading: ' ',
      description:
        'Market fluctuations that could result in the loss of cryptocurrency value.',
    },
    {
      heading: '',
      description:
        ' Technical risks such as wallet security, private key management, and blockchain network congestion.',
    },
    {
      heading: '',
      description:
        'Irreversible nature of cryptocurrency transactions. By using LocalCoins, you acknowledge and accept that you assume full responsibility for any risks associated with cryptocurrency trading, including the potential loss of funds. LocalCoins does not guarantee the value, stability, or legality of any cryptocurrency listed or traded on the platform.',
    },
  ];
  const infoItems2 = [
    {
      heading: ' ',
      description:
        'Be cautious when entering into agreements with other users.',
    },
    {
      heading: '',
      description:
        ' Report any suspicious or fraudulent activities encountered on the platform through the available reporting tools. LocalCoins provides reporting functions and works with authorities by submitting transaction history and blockchain data when required. However, LocalCoins is not liable for any fraudulent transactions or loss of funds resulting from user interactions on the platform.',
    },
  ];
  const infoItems3 = [
    {
      heading: ' ',
      description:
        'Protecting their cryptocurrency wallets, private keys, and related information.',
    },
    {
      heading: '',
      description:
        ' Understanding and complying with local regulations, including AML, KYC, and tax obligations.',
    },
    {
      heading: '',
      description:
        ' Conducting transactions with due diligence, ensuring they trust the other party involved in P2P trades.',
    },
  ];
  return (
    <div className="w-[85%] mx-auto  ">
      <LocaCoins />
      <div className="mt-5"></div>
      <SectionInfo
        title="1. General Information"
        disc="LocalCoins is a decentralized peer-to-peer (P2P) cryptocurrency platform. By using the platform, you acknowledge that you understand and agree to this disclaimer. The platform operates in a non-custodial manner, meaning that LocalCoins does not hold or manage any user funds or fiat currency. All transactions on LocalCoins are carried out between users directly, with cryptocurrency held in decentralized escrow through smart contracts."
      />
      <SectionInfo
        title="2. No Financial or Legal Advice"
        disc="The content and services provided by LocalCoins are intended for informational and operational purposes only. They should not be construed as financial, legal, or tax advice. LocalCoins does not provide any guarantees, representations, or warranties regarding the legality, accuracy, or reliability of any transaction conducted on the platform. Users are responsible for their own due diligence and should consult with a qualified professional for any legal, financial, or tax matters."
      />
      <SectionInfo
        title="3. No Custody or Management of Fiat"
        disc="LocalCoins does not process or manage any fiat (traditional currency) transactions. All fiat transactions between buyers and sellers occur outside of the LocalCoins platform and are subject to the rules and regulations of the respective payment systems (e.g., banks, payment processors). As such, LocalCoins is not responsible for any issues arising from the transfer of fiat currency."
      />
      <SectionInfo
        title="4. Cryptocurrency Risks"
        items={infoItems}
        disc="Cryptocurrency transactions are inherently volatile and involve significant risk. Users are fully responsible for the decisions they make on the platform, including, but not limited to:"
      />
      <SectionInfo
        title="5. Compliance with Laws"
        disc="LocalCoins complies with the relevant regulations in the Philippines, including the Data Privacy Act of 2012 and applicable Anti-Money Laundering (AML) laws. However, users are responsible for ensuring that their activities on the platform comply with all applicable local laws and regulations, including tax obligations and reporting. Users are encouraged to consult their legal advisors to understand their responsibilities when using the platform."
      />
      <SectionInfo
        title="6. Fraud and Security Risks"
        items={infoItems2}
        disc="LocalCoins implements security measures to ensure the safety of user transactions and data. However, no platform is completely immune to fraud, scams, or cyber-attacks. Users are encouraged to:"
      />
      <SectionInfo
        title="7. Limitation of Liability"
        disc={
          <div>
            {' '}
            <div className="mb-2">
              {' '}
              LocalCoins, its developers, and affiliates shall not be liable for
              any direct, indirect, incidental, or consequential damages arising
              from the use of the platform, including, but not limited to, loss
              of cryptocurrency, errors in smart contracts, or any other
              technical failures.
            </div>
            <div>
              LocalCoins provides its platform &quot;as is&quot; and &quot;as
              available&quot; without any warranties of any kind, either express
              or implied, including, but not limited to, warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement.
            </div>{' '}
          </div>
        }
      />
      <SectionInfo
        title="8. User Responsibilities"
        items={infoItems3}
        disc="Users are responsible for:"
      />
      <SectionInfo
        title="9. Changes to the Disclaimer"
        disc="LocalCoins reserves the right to modify this disclaimer at any time. Any changes will be posted on the platform and will be effective immediately upon posting. Users are encouraged to review this disclaimer periodically."
      />
      <SectionInfo
        title="10. Contact Information"
        disc="If you have any questions regarding this disclaimer, please contact us at: "
        email={
          <span className="text-white">
            Email:
            <span className="text-[#F3AA05]">localcoinsp2p@gmail.com</span>{' '}
          </span>
        }
      />
      <Button />
    </div>
  );
};

export default DisclaimerMain;
