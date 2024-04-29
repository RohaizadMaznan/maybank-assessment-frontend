import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
