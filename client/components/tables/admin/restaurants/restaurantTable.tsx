"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { PlusIcon } from "../../../icons/PlusIcon";
import { VerticalDotsIcon } from "../../../icons/VerticalDotsIcon";
import { ChevronDownIcon } from "../../../icons/ChevronDownIcon";
import { SearchIcon } from "../../../icons/SearchIcon";
import { columns, restaurantsData, statusOptions } from "./data";
import { capitalize } from "./utils";
import Restaurants from "../../../../types/restaurantTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  inactive: "danger",
  disabled: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["image", "name", "sales", "status", "actions"];

export default function AdminRestaurantsTable() {
  const router = useRouter();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const [restaurants, setRestaurants] = React.useState<Restaurants[]>([]);
  const pages = Math.ceil(restaurants.length / rowsPerPage);

  useEffect(() => {
    restaurantsData().then((data) => setRestaurants(data));
  }, []);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRestaurants = [...restaurants];

    if (hasSearchFilter) {
      filteredRestaurants = filteredRestaurants.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRestaurants = filteredRestaurants.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredRestaurants;
  }, [restaurants, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Restaurants, b: Restaurants) => {
      const first = a[sortDescriptor.column as keyof Restaurants] as number;
      const second = b[sortDescriptor.column as keyof Restaurants] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (restaurant: Restaurants, columnKey: React.Key) => {
      const cellValue = restaurant[columnKey as keyof Restaurants];

      switch (columnKey) {
        case "name":
          return <p className="text-bold text-small capitalize">{cellValue}</p>;
        case "owner":
          return (
            <Popover showArrow placement="bottom">
              <PopoverTrigger>
                <User
                  as="button"
                  name={restaurant.owner.name}
                  description={restaurant.owner.id}
                  className="transition-transform"
                  avatarProps={{
                    src: restaurant.owner.image,
                  }}
                />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <Card
                  shadow="none"
                  className="max-w-[300px] border-none bg-transparent"
                >
                  <CardHeader className="justify-between">
                    <div className="flex gap-3">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={restaurant.owner.image}
                      />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {restaurant.owner.name}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-500">
                          {restaurant.owner.email}
                        </h5>
                        <Link
                          href="#"
                          className="text-small tracking-tight text-primary-500 hover:underline hover:text-primary"
                        >
                          {restaurant.owner.id}
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-small text-default-400">Phone:</p>
                        <p className="text-small text-default-600">
                          {restaurant.owner.phoneNumber}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-small text-default-400">Address:</p>
                        <p className="text-small text-default-600">
                          {restaurant.owner.address}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </PopoverContent>
            </Popover>
          );
        case "image":
          return (
            <img
              className="w-10 h-10 rounded-full"
              src={restaurant.image}
              alt="no image"
            />
          );
        case "sales":
          const calcSales = restaurant.orders.reduce((acc, order) => {
            return acc + order.total;
          }, 0);
          return (
            <div className="text-success">
              <p className="text-bold text-small capitalize">${calcSales}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[restaurant.status]}
              size="sm"
              variant="dot"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <VerticalDotsIcon
                      className="text-default-400"
                      width={undefined}
                      height={undefined}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem aria-label="view">View</DropdownItem>
                  <DropdownItem
                    aria-label="edit"
                    onClick={() =>
                      router.push(
                        `/dashboard/restaurants/edit/${restaurant.id}`
                      )
                    }
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem aria-label="delete">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
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
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon width={undefined} height={undefined} />}
              size="sm"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {restaurants.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    restaurants.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Restaurants Table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No restaurants found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey: React.Key) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
