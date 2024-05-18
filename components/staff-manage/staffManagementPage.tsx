"use client";
import React from "react";

import {
  Avatar,
  Button,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import {
  AddStaffIcon,
  ArrowDownIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "../icons";

import RoleChips from "../service-mange/roleChips";

type User = (typeof users)[0];

const rolesOptions = [
  { name: "Admin", uid: "admin" },
  { name: "Staff", uid: "staff" },
];

const users = [
  {
    id: 1,
    username: "s6303051623179",
    name: "ศิริวรรณ ทุหา",
    role: "admin",
    manageRole: ["Admin"],
  },
  {
    id: 2,
    username: "s6303051623111",
    name: "เมษา สันติสุข",
    role: "staff",
    manageRole: ["Staff"],
  },
  {
    id: 3,
    username: "s6303051623127",
    name: "จิรภัทร ศรีสมพันธุ์",
    role: "admin",
    manageRole: ["Admin"],
  },
  {
    id: 4,
    username: "s6303051623367",
    name: "กรภัทร ป้องภัย",
    role: "student",
    manageRole: ["Staff"],
  },
  {
    id: 5,
    username: "s630305164567",
    name: "ไกรสร พาใจขวัญ",
    role: "student",
    manageRole: ["Admin"],
  },
  {
    id: 6,
    username: "s6303051629876",
    name: "ธิศา คมปราชญ์",
    role: "student",
    manageRole: ["Staff"],
  },
  {
    id: 7,
    username: "s6303051620097",
    name: "นีรา ศรีสว่างจันทร์",
    role: "student",
    manageRole: ["Admin"],
  },
  {
    id: 8,
    username: "s6303051622345",
    name: "ปองเดช วรารักษ์",
    role: "student",
    manageRole: ["Staff"],
  },
];

export function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const StaffManage = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [roleFilter, setRoleFilter] = React.useState<Selection>("all");

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "no",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      roleFilter !== "all" &&
      Array.from(roleFilter).length !== rolesOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(roleFilter).includes(user.role)
      );
    }

    return filteredUsers;
  }, [users, filterValue, roleFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User]?.toString();
      const second = b[sortDescriptor.column as keyof User]?.toString();

      if (!first || !second) {
        return 0;
      }

      const cmp = first.localeCompare(second, "th");

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = (user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "no":
        const userIndex = items.findIndex((item) => item.id === user.id);
        const startIndex = (page - 1) * rowsPerPage;

        return (
          <div className="flex justify-center">
            {startIndex + userIndex + 1}
          </div>
        );

      case "name":
        return (
          <div className="flex items-center align-middle gap-3">
            <Avatar
              className="bg-[#FF644B] bg-opacity-10 text-[#FF644B] font-sansThai"
              radius="lg"
              name={user.name}
            />
            <div className="font-sansThai">{user.name}</div>
          </div>
        );

      case "username":
        return <div className="text-md">{user.username}</div>;

      case "role":
        return (
          <div className="flex justify-center items-center">
            <RoleChips roles={user.manageRole} />
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-3">
            <Tooltip content="Edit user">
              <Button
                className="bg-[#FF644B] bg-opacity-10"
                isIconOnly
                size="sm"
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <Button
                className="bg-[#FF644B] bg-opacity-10"
                isIconOnly
                size="sm"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div>
      <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <div className="flex justify-between items-stretch">
          <div className="flex justify-start">
            <p className="text-[24px] font-medium">Staff Management</p>
          </div>

          <div className="flex justify-end gap-2">
            <Input
              className="w-[210px]"
              classNames={{
                inputWrapper: "bg-white",
              }}
              placeholder="Search user"
              isClearable
              startContent={<SearchIcon />}
              endContent={<CloseIcon />}
            />

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ArrowDownIcon />}
                  variant="flat"
                  color="default"
                >
                  Role
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {rolesOptions.map((manageRole) => (
                  <DropdownItem key={manageRole.uid} className="capitalize">
                    {capitalize(manageRole.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              className="text-white bg-[#FF644B] font-semibold w-fit p-3"
              startContent={<AddStaffIcon />}
              variant="flat"
            >
              Add User
            </Button>
          </div>
        </div>

        <Table
          aria-label="user list table."
          bottomContent={
            <div className="flex justify-center w-full">
              <Pagination
                classNames={{
                  cursor: "bg-[#FF644B]",
                  item: "bg-white",
                  next: "bg-white",
                  prev: "bg-white",
                }}
                size="sm"
                variant="flat"
                showControls
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <TableHeader>
            <TableColumn
              key={"no"}
              width={100}
              className="text-center"
              allowsSorting
            >
              NO.
            </TableColumn>
            <TableColumn key={"name"} allowsSorting>
              NAME
            </TableColumn>
            <TableColumn key={"username"} allowsSorting>
              USERNAME
            </TableColumn>
            <TableColumn key={"role"} className="text-center">
              ROLE
            </TableColumn>
            <TableColumn key={"actions"} className="text-center">
              ACTIONS
            </TableColumn>
          </TableHeader>
          <TableBody items={sortedItems}>
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
    </div>
  );
};
