import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { Ellipsis } from "lucide-react";
import React from "react";

type Props = {
  userId: number;
};

export default function TableActions({ userId }: Props) {
  const viewUserModal = useDisclosure();
  const editUserModal = useDisclosure();
  const deleteUserModal = useDisclosure();

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <Ellipsis className="min-w-4 h-4 text-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            if (key === "viewUser") {
              viewUserModal.onOpen();
            }

            if (key === "editUser") {
              editUserModal.onOpen();
            }

            if (key === "deleteUser") {
              deleteUserModal.onOpen();
            }
          }}
        >
          <DropdownItem key="viewUser">View</DropdownItem>

          <DropdownItem key="editUser">Edit</DropdownItem>

          <DropdownItem key="deleteUser">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        id="viewUserModal"
        isOpen={viewUserModal.isOpen}
        onOpenChange={viewUserModal.onOpenChange}
      >
        <ModalContent>{(onClose) => <></>}</ModalContent>
      </Modal>

      <Modal
        size="xl"
        id="editUserModal"
        isOpen={editUserModal.isOpen}
        onOpenChange={editUserModal.onOpenChange}
        hideCloseButton
      >
        <ModalContent>{(onClose) => <></>}</ModalContent>
      </Modal>

      <Modal
        size="xl"
        id="deleteUserModal"
        isOpen={deleteUserModal.isOpen}
        onOpenChange={deleteUserModal.onOpenChange}
        hideCloseButton
      >
        <ModalContent>{(onClose) => <></>}</ModalContent>
      </Modal>
    </div>
  );
}
