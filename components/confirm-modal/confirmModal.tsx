import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface confirmModalProps {
  title: string;
  description: string;
  icon: any;
  textClose: string;
  textConfirm: string;
  isOpen: boolean;
  //   onOpen: string;
  onOpenChange: () => void;
  //   onClose: () => void;
  //   onConfirm: () => void;
}

const ConfirmModal = ({
  title,
  description,
  icon,
  textClose,
  textConfirm,
  isOpen,
  //   onOpen,
  onOpenChange,
}: //   onClose,
//   onConfirm,
confirmModalProps) => {
  return (
    <>
      <Modal
        className="w-[360px]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-center items-center gap-3">
                <div>{icon}</div>
                <div>{title}</div>
              </ModalHeader>
              <ModalBody className="justify-center items-center pt-0">
                <span>{description}</span>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  className="text-[#FF644B] font-medium"
                  color="default"
                  variant="light"
                  onPress={onClose}
                >
                  {textClose}
                </Button>
                <Button
                  className="bg-[#FF644B] text-white font-medium"
                  onPress={onClose}
                >
                  {textConfirm}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
