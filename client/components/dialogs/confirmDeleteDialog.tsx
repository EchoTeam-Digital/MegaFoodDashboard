import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDeleteDialog = (props: ConfirmDeleteDialogProps) => {
  const { onOpenChange } = useDisclosure();

  return (
    <Modal isOpen={props.open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onClick={()=>props.onClose()}>
            إلغاء
          </Button>
          <Button color="primary" onPress={props.onConfirm}>
            حفظ
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteDialog;
