import UserTable from "@/app/_components/table/users";
import React from "react";
import Breadcrumb from "@/app/_components/ui/breadcrumb";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Users - Dashboard NextApp | Maybank Front-end Assessment",
};

export default function Page({}: Props) {
  return (
    <div className="space-y-6">
      <Breadcrumb />

      <UserTable />
    </div>
  );
}
