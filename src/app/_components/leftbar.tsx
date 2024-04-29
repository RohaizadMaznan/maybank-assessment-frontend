"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User2 } from "lucide-react";
import { Button, Image, cn } from "@nextui-org/react";

type Props = {};

export default function Leftbar({}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  let routes: {
    title: string;
    routes: {
      title: string;
      path: string;
      match: RegExp;
      icon: React.ReactNode;
    }[];
  }[] = [];

  routes = [
    {
      title: "Management",
      routes: [
        {
          title: "Users",
          path: "/dashboard/users",
          match: /^\/dashboard\/users/,
          icon: <User2 className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <div className="h-[calc(100vh-32px)] w-[292px] pt-8 pb-14 px-4 shadow-sm bg-white dark:bg-gray-900 my-4 ml-8 rounded-md">
      <div className="text-xl font-bold px-4 mb-8 text-primary text-center flex justify-center">
        <Image
          className="mx-auto h-10 w-auto"
          src="https://static-00.iconduck.com/assets.00/next-js-icon-2048x2048-5dqjgeku.png"
          alt="NextJS logo"
        />
      </div>

      <div className="flex flex-col justify-between h-[calc(100%-28px)]">
        <div className="flex flex-col space-y-6">
          {routes.map((group) => {
            return (
              <div key={group.title}>
                {group.title === "Home" ? (
                  ""
                ) : (
                  <h1 className="text-default-400 px-4 text-sm">
                    {group.title}
                  </h1>
                )}

                <div className="space-y-1 mt-2">
                  {group.routes.map((route, key) => {
                    const isActive = route.match.test(pathname);

                    return (
                      <Button
                        data-state={isActive ? "active" : ""}
                        className={cn(
                          "flex items-center justify-start h-8 hover:text-primary dark:hover:text-primary hover:bg-red-400 dark:hover:bg-gray-900 font-normal data-[state=active]:font-semibold data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary dark:data-[state=active]:text-primary"
                        )}
                        fullWidth
                        radius="sm"
                        variant={isActive ? "solid" : "light"}
                        key={key}
                      >
                        <Link href={route.path}>
                          <div className={`flex items-center space-x-3`}>
                            {route.icon}{" "}
                            <div className="text-sm">{route.title}</div>
                          </div>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <Button
            className="flex items-center justify-start h-8 hover:text-white hover:!bg-primary dark:hover:text-primary dark:hover:bg-gray-900"
            variant={"light"}
            fullWidth
            radius="sm"
            onClick={() => router.push("/login")}
          >
            <div className={`flex items-center space-x-3`}>
              <LogOut className="w-4 h-4" /> <div>Logout</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
