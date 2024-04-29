import UserTable from "@/app/_components/table/users";
import React from "react";
import Breadcrumb from "@/app/_components/ui/breadcrumb";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="space-y-6">
      <Breadcrumb />

      <UserTable />
    </div>
  );
}
