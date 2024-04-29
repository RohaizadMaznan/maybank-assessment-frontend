import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="h-screen bg-white">{children}</div>;
}
