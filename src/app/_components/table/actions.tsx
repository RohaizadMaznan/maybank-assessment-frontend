import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import {
  Code,
  Copy,
  EllipsisVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import React from "react";
import CreateUserForm from "../form/createUser";
import users from "@/constants/users.json";
import toast from "react-hot-toast";
import ChangePasswordForm from "../form/changePassword";
import { copyToClipboard } from "@/lib/utils";

type Props = {
  userId: number;
};

export default function TableActions({ userId }: Props) {
  const viewUserModal = useDisclosure();
  const editUserModal = useDisclosure();
  const changePasswordModal = useDisclosure();
  const deleteUserModal = useDisclosure();

  const getUser = users.find((user) => user.id === userId);

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light">
            <EllipsisVertical className="min-w-4 h-4" />
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

            if (key === "changePassword") {
              changePasswordModal.onOpen();
            }

            if (key === "deleteUser") {
              deleteUserModal.onOpen();
            }
          }}
        >
          <DropdownItem
            key="viewUser"
            startContent={<Eye className="min-h-4 w-4" />}
          >
            View
          </DropdownItem>

          <DropdownItem
            key="editUser"
            startContent={<Pencil className="min-h-4 w-4" />}
          >
            Edit
          </DropdownItem>

          <DropdownItem
            key="changePassword"
            startContent={<Code className="min-h-4 w-4" />}
          >
            Change password
          </DropdownItem>

          <DropdownItem
            key="deleteUser"
            startContent={<Trash2 className="min-h-4 w-4" />}
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        size="lg"
        id="viewUserModal"
        isOpen={viewUserModal.isOpen}
        onOpenChange={viewUserModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User Informations
              </ModalHeader>
              <ModalBody>
                <Table
                  hideHeader
                  aria-label="Example table with dynamic content"
                >
                  <TableHeader className="hidden">
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>DETAILS</TableColumn>
                  </TableHeader>
                  <TableBody loadingContent={<Spinner />}>
                    <TableRow key="1">
                      <TableCell className="w-[100px]">Username</TableCell>
                      <TableCell>{getUser?.username ?? "-"}</TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>Email</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-auto flex items-center justify-between space-x-3">
                            <p className="truncate max-w-[200px] text-sm">
                              {getUser?.email ?? "-"}
                            </p>
                            <Tooltip content="Copy" placement="bottom">
                              <Button
                                isIconOnly
                                size="sm"
                                onClick={async (e) =>
                                  copyToClipboard(e, getUser?.email)
                                }
                              >
                                <Copy className="min-w-3 h-3" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>Phone No.</TableCell>
                      <TableCell>{getUser?.phone}</TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>Skillsets</TableCell>
                      <TableCell>
                        <p className="capitalize">
                          {getUser?.skillsets.join(", ")}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell>Hobby</TableCell>
                      <TableCell>
                        <p className="capitalize">
                          {getUser?.hobby.join(", ")}
                        </p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        id="editUserModal"
        isOpen={editUserModal.isOpen}
        onOpenChange={editUserModal.onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modify User
              </ModalHeader>
              <ModalBody>
                <CreateUserForm
                  mode={"update"}
                  onClose={onClose}
                  defaultValues={getUser}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    toast.success("Successfully update user details.");
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        id="changePasswordModal"
        isOpen={changePasswordModal.isOpen}
        onOpenChange={changePasswordModal.onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change Password
              </ModalHeader>
              <ModalBody>
                <ChangePasswordForm onClose={onClose} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    toast.success("User password successfully changed.");
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        id="deleteUserModal"
        isOpen={deleteUserModal.isOpen}
        onOpenChange={deleteUserModal.onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete User
              </ModalHeader>
              <ModalBody>
                <p>Are you sure to delete this user permanently?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    toast.success("User deleted.");
                    onClose();
                  }}
                >
                  Yes, delete permanently
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
