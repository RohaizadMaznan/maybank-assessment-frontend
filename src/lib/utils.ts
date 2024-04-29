"use client";

import toast from "react-hot-toast";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function paginate(array: any, pageNumber: number, itemsPerPage: string) {
  // Calculate the start and end index for the current page
  const startIndex = (pageNumber - 1) * Number(itemsPerPage);
  const endIndex = startIndex + itemsPerPage;

  // Slice the array to get the items for the current page
  const currentPageItems = array.slice(startIndex, endIndex);

  // Return the items for the current page
  return currentPageItems;
}

export const copyToClipboard = async (e: any, value?: string) => {
  e.stopPropagation();
  await navigator.clipboard.writeText(value as string);
  toast.success("Copied", { id: "copyToClipboard" });
};
