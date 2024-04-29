import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import TanstackProvider from "./tanstack-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maybank Assessment",
  description:
    "This NextApp is a Maybank Frontend Assessment purposes only. Any content in the web application are from the task requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ background: "rgb(249 250 251)" }}
      >
        <TanstackProvider>
          <Providers>
            {children}

            <Toaster
              toastOptions={{
                className:
                  "!rounded !shadow-lg dark:shadow-none shadow-lg dark:shadow-none shadow-gray-200",
              }}
            />
          </Providers>
        </TanstackProvider>
      </body>
    </html>
  );
}
