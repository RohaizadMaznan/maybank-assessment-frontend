import { UserProps } from "@/types/user";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowPerPage: string;
  setRowPerPage: React.Dispatch<React.SetStateAction<string>>;
  users: UserProps[];
  lastPagePagination: number;
};

export default function BottomContentTable({
  currentPage,
  setCurrentPage,
  rowPerPage,
  setRowPerPage,
  users,
  lastPagePagination,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <Select
        aria-labelledby="Select row per page"
        items={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
        ]}
        defaultSelectedKeys={[rowPerPage]}
        className="max-w-20"
        onChange={(e) => {
          // Reset to first page
          setCurrentPage(1);

          // Set rows per page
          setRowPerPage(e.target.value);
        }}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>

      <p className="text-sm font-medium">
        <>
          <b>{users?.length}</b> user(s) found
        </>
      </p>

      <div className="flex justify-between space-x-2">
        <Button
          variant="flat"
          isDisabled={currentPage === 1}
          onPress={() =>
            // Previous page setter
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
          }
        >
          <ChevronLeft className="min-w-4 h-4" />
        </Button>
        <Button
          variant="flat"
          isDisabled={lastPagePagination !== 1}
          onPress={() => {
            // Next page setter, if lastPagePagination equal to 1
            if (lastPagePagination === 1) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
        >
          <ChevronRight className="min-w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
