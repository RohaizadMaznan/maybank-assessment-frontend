import RegisterForm from "@/app/_components/form/register";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Register - NextApp | Maybank Front-end Assessment",
};

export default function Page({}: Props) {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
