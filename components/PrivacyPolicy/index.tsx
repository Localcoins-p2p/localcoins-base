import React from 'react';
import PrivacyTermOfUseNav from '../Elements/PrivacyTermOfUseNav';
import LocalPrivacy from './LocalPrivacy';
import SectionInfo from './SectionInfo';
import Introduction from './Introduction';
import PrivacyTermOfUseFooter from '../Elements/PrivacyTermOfUseFooter';
import NewHeader from '../NewHeader/NewHeader';

const PrivacyPolicy = () => {
  const infoItems = [
    {
      heading: 'Blockchain Data:',
      description:
        'As a decentralized exchange, all cryptocurrency transactions made through LocalCoins are processed on the blockchain. Blockchain data is public, immutable, and cannot be altered. This data may include wallet addresses and transaction details.',
    },
    {
      heading: 'Usage Data:',
      description:
        'We may collect non-identifiable data related to the usage of the platform, including IP addresses, device types, browser information, and access times. This is primarily used to improve platform performance and ensure security.',
    },
  ];
  const infoItems1 = [
    {
      heading: 'Platform Security:',
      description: ' To detect and prevent fraudulent activities and abuse',
    },
    {
      heading: 'Compliance with Legal Obligations:',
      description:
        ' LocalCoins will cooperate with regulatory authorities where necessary. While the platform itself does not handle KYC (Know Your Customer), users are responsible for complying with local regulations and reporting fraudulent activity where required.',
    },
  ];
  const infoItems2 = [
    {
      heading: '',
      description:
        'Track and back trace blockchain wallet addresses to identify suspicious behavior.',
    },
    {
      heading: '',
      description:
        ' Submit reports to relevant regulatory authorities if illegal activity is suspected.',
    },
  ];
  const infoItems3 = [
    {
      heading: 'Encryption: ',
      description:
        'All data communicated between the user and LocalCoins is encrypted to ensure maximum privacy.',
    },
    {
      heading: 'Security Audits:',
      description:
        ' Regular audits are conducted on the platform s smart contracts and infrastructure to maintain the highest level of security',
    },
  ];
  const infoItems4 = [
    {
      heading: ' ',
      description: 'Keeping private keys and wallet information secure.',
    },
    {
      heading: '',
      description:
        ' Ensuring that any third-party service (like wallet providers) complies with the necessary security and privacy measures.',
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

        <LocalPrivacy />
        <Introduction />

        <SectionInfo
          title="1. INFORMATION WE COLLECT"
          items={infoItems}
          disc="   LocalCoins is a decentralized platform that does not process or store fiat transactions, nor do we require users to create accounts tied to their personal information. However, there may be limited instances where data is collected:"
        />

        <SectionInfo
          title="2. How We Use the Information"
          items={infoItems1}
          disc="  We do not sell or share personal data with third parties. The data we collect may be used for the following purposes:"
        />

        <SectionInfo
          title="3. Reporting and Fraud Detection"
          items={infoItems2}
          disc="Although LocalCoins does not directly collect KYC data, we offer users a reporting mechanism for fraudulent activity. If a user flags a transaction, we may:"
        />

        <SectionInfo
          title="4. Data Protection"
          items={infoItems3}
          disc="We implement the following measures to protect your data:"
        />

        <SectionInfo
          title="5. User Responsibilities"
          items={infoItems4}
          disc="As LocalCoins is a decentralized platform, users maintain responsibility for safeguarding their own data and cryptocurrency wallets. This includes:"
        />

        <SectionInfo
          title="6. Legal Compliance"
          disc="LocalCoins operates in accordance with applicable laws and regulations. While the platform does not store or process fiat transactions, users are responsible for complying with local tax, anti-money laundering (AML), and anti-fraud regulations in their respective jurisdictions. We may assist law enforcement by providing transaction history or wallet backtracking data upon request."
        />

        <SectionInfo
          title="7. Third-Party Links and Services"
          disc="LocalCoins may contain links to third-party websites or services (e.g., wallet providers or fiat on-ramp services). These third-party services have their own privacy policies, and we are not responsible for their content, privacy practices, or security measures."
        />

        <SectionInfo
          title="8. Changes to this Privacy Policy"
          disc="LocalCoins reserves the right to modify this Privacy Policy at any time. Any changes will be reflected in this document, and users will be notified of substantial updates."
        />

        <SectionInfo
          title="9. Contact Us"
          disc="If you have any questions or concerns about this Privacy Policy, please contact us at "
          email="localcoinsp2p@gmail.com."
        />
        <div className="mb-32"></div>
      </div>
      <PrivacyTermOfUseFooter />
    </>
  );
};

export default PrivacyPolicy;
