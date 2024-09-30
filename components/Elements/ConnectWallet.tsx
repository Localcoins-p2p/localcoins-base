import React from 'react';
import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#000000',
    border: 0,
    borderRadius: 10,
    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s',
    overflow: 'visible',
    // paddingBottom: "40px"
  },
  overlay: { zIndex: 1000 },
};

interface IModalProps {
  title: string | React.ReactChild;
  isOpen: boolean;
  header?: any;
  children: any;
  onClose: (e?: React.MouseEvent) => void;
}

function ModalComponent({
  title,
  isOpen,
  header,
  children,
  onClose,
}: IModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      contentLabel={typeof title === 'string' ? title : ''}
      style={customStyles}
    >
      <div className="flex   justify-between pb-2 items-center">
        <div></div>
        <div className="text-[16px] font-[500] text-white">Connect Wallet</div>
        <div onClick={onClose}>
          <IoIosClose className="h-[24px] text-white w-[24px]" />
        </div>
      </div>

      {children}
    </Modal>
  );
}

export default ModalComponent;
