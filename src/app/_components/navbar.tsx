"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  const router = useRouter();

  return (
    <header>
      <div className="flex justify-between p-4 mx-8">
        <div></div>

        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://media.licdn.com/dms/image/D5603AQF9ntAEbW1s5w/profile-displayphoto-shrink_800_800/0/1705912471915?e=1720051200&v=beta&t=Zxr2AVbdQBmnBDGmFA5ZX03h-zCPCZ6P7_XovgxWqYI",
                }}
                className="transition-transform"
                description="@rohaizadmaznan"
                name="Rohaizad Maznan"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="gap-2">
                <p className="font-bold">@rohaizadmaznan</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => router.push("/login")}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
