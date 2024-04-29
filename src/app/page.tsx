"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Redirecting to login page...
    </main>
  );
}
