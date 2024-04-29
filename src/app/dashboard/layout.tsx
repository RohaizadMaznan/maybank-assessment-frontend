import React from "react";
import Navbar from "../_components/navbar";
import Leftbar from "../_components/leftbar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex w-screen h-screen">
      <Leftbar />

      <div className="w-full rounded-md my-4">
        <Navbar />

        <div className="bg-white m-8 p-8 rounded shadow-sm">{children}</div>
      </div>
    </div>
  );
}
