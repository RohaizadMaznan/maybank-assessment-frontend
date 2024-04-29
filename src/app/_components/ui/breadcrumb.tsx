"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import React from "react";
import CreateUserForm from "../form/createUser";

type Props = {};

export default function Breadcrumb({}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex justify-between">
      <div className="space-y-1">
        <p className="font-semibold text-xl">Users</p>
        <Breadcrumbs>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Users</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Table</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div>
        <Button
          onPress={onOpen}
          startContent={<Plus className="min-h-4 w-4" />}
          color="primary"
        >
          Create user
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <p>Create a user</p>
                  <p className="font-normal text-sm">
                    Please enter all the required fields to create a new user.
                  </p>
                </ModalHeader>
                <ModalBody>
                  <CreateUserForm onClose={onClose} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" form="createNewUser">
                    Create user
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
