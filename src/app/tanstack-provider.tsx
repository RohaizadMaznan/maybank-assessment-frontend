"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast from "react-hot-toast";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query: any) => {
      const message =
        query?.meta?.errorMessage ||
        error?.response?.data?.err ||
        "Unexpected Error occurred. Please try again in a few minutes later or contact us at rohaizadmaznan@gmail.com";

      toast.error(
        <div>
          <h3 className="font-semibold">Client Error</h3>
          <p>{message}</p>
        </div>
      );
    },
  }),
});

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={false}
        position="top"
        buttonPosition="top-right"
      />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
