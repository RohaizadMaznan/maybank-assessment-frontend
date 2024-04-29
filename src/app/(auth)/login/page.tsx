import React from "react";
import LoginForm from "@/app/_components/form/login";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Login - NextApp | Maybank Front-end Assessment",
};

export default function Page({}: Props) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
