"use client";

import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import users from "@/constants/users.json";
import TableActions from "./actions";
import TopContentTable from "./topContent";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";

type Props = {};

export const INITIAL_VISIBLE_COLUMNS = [
  "username",
  "email",
  "phone",
  "skillsets",
  "hobby",
  "actions",
];

export default function UserTable({}: Props) {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
  const [filterValue, setFilterValue] = React.useState<{ search?: string }>({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const columns = useMemo(() => {
    const baseColumns = [
      {
        key: "username",
        label: "USERNAME",
      },
      {
        key: "email",
        label: "EMAIL",
      },
      {
        key: "phone",
        label: "PHONE NO.",
      },
      {
        key: "skillsets",
        label: "SKILLSETS",
      },
      {
        key: "hobby",
        label: "HOBBY",
      },
      {
        key: "actions",
        label: "",
      },
    ];

    return baseColumns;
  }, []);

  const headerColumns: any = React.useMemo(() => {
    if (visibleColumns === "all") return users;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns, columns]);

  const renderCell = React.useCallback((data: any, columnKey: any) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "email":
        const copyToClipboard = async (e: any) => {
          e.stopPropagation();
          await navigator.clipboard.writeText("example@simpleai.sg");
          toast.success("Copied", { id: "copyToClipboard" });
        };
        return (
          <div className="flex items-center">
            <div className="bg-default-100 rounded-xl px-4 py-1 w-auto flex items-center justify-between space-x-3">
              <p className="truncate max-w-[200px] text-sm">{cellValue}</p>
              <Tooltip content="Copy" placement="bottom">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={async (e) => copyToClipboard(e)}
                >
                  <Copy className="min-w-3 h-3" />
                </Button>
              </Tooltip>
            </div>
          </div>
        );

      case "skillsets":
      case "hobby":
        return <p className="capitalize">{cellValue.join(", ")}</p>;

      case "actions":
        return <TableActions userId={data["id"]} />;

      default:
        return cellValue;
    }
  }, []);

  const topContent = React.useMemo(
    () => (
      <TopContentTable
        columns={columns}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        setCurrentPage={setCurrentPage}
        setFilterValue={setFilterValue}
      />
    ),
    [visibleColumns, setCurrentPage, setVisibleColumns, columns]
  );

  return (
    <div>
      <Table
        aria-label="Users table"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={headerColumns}>
          {(column: { label: string; key: string; sortable?: boolean }) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
