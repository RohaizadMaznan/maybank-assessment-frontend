"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
  cn,
} from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, Search, Table, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { capitalize } from "@/lib/utils";

type Props = {
  columns: { label: string; key: string; sortable?: boolean }[];
  visibleColumns: any;
  setVisibleColumns: any;
  setCurrentPage: any;
  setFilterValue: any;
};

export const UserTableFilterFormSchema = z.object({
  search: z.string().optional(),
});

export default function TopContentTable({
  columns,
  visibleColumns,
  setVisibleColumns,
  setCurrentPage,
  setFilterValue,
}: Props) {
  //   const { isPending } = useFetchVoters();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    getValues,
  } = useForm<z.infer<typeof UserTableFilterFormSchema>>({
    resolver: zodResolver(UserTableFilterFormSchema),
    defaultValues: {
      search: "",
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof UserTableFilterFormSchema>) => {
      setCurrentPage(1);
    },
  });

  const onSubmit = async (data: z.infer<typeof UserTableFilterFormSchema>) => {
    setFilterValue(data);

    mutation.mutate(data);
  };

  return (
    <form
      className="flex justify-between"
      autoComplete="off"
      autoCorrect="off"
      autoFocus={false}
      autoCapitalize="off"
      onSubmit={handleSubmit(onSubmit)}
      id="searchUser"
    >
      <div className="flex space-x-2 w-full">
        <Controller
          control={control}
          name="search"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Search user..."
              className="max-w-lg"
              classNames={{
                input: "placeholder:text-default-500",
              }}
              errorMessage={errors.search?.message}
              isInvalid={!!errors.search}
              // isDisabled={isPending}
              isClearable
              onClear={() => {
                setValue("search", "", {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
          )}
        />

        <Tooltip content="Search" placement="bottom">
          <Button type="submit" form="searchUser" variant="flat" isIconOnly>
            <Search className="min-w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip content="Clear" placement="bottom">
          <Button
            onClick={() => {
              reset();
            }}
            color="danger"
            isDisabled={!watch("search")}
            isIconOnly
          >
            <X className="min-w-4 h-4" />
          </Button>
        </Tooltip>
      </div>

      <div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="hidden sm:flex">
            <Button
              endContent={<ChevronDownIcon className="min-w-4 h-4" />}
              variant="flat"
            >
              <Table className="min-h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={setVisibleColumns}
          >
            {columns.map((column) => (
              <DropdownItem
                key={column.key}
                className={cn(
                  "capitalize",
                  column.key === "actions" && "hidden"
                )}
              >
                {capitalize(column.label)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </form>
  );
}
