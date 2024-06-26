"use client";
import React, { useState, useEffect } from "react";

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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";

import {
  AddStaffIcon,
  ArrowDownIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "../icons";
import { LoadingCustom } from "../Loading/loadingCustom";
import ConfirmModal from "@/components/confirm-modal/confirmModal";

const rolesOptions = [
  { name: "Admin", uid: "admin" },
  { name: "Staff", uid: "staff" },
];

export function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const StaffManage = () => {
  type User = {
    _id: string;
    username: string;
    displayname: string;
    role: string;
  };

  const [users, setUsers] = useState<User[]>([]);

  const [addUsername, setAddUsername] = useState("");
  const [addRole, setAddRole] = useState("");
  const [addDisplayname, setAddDisplayname] = useState("");
  /*   const [addConfirmModal, setAddConfirmModal] = useState(false); */
  const [editUsername, setEditUsername] = useState("");
  const [editUserRole, setEditUserRole] = useState("");
  const [editDisplayname, setEditDisplayname] = useState("");

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

  const addUserModal = useDisclosure();
  const addUserConfirmModal = useDisclosure();
  const editUserModal = useDisclosure();
  const editUserConfirmModal = useDisclosure();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const deleteUserModal = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.displayname.toLowerCase().includes(filterValue.toLowerCase())
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
  }, [filterValue, roleFilter, hasSearchFilter, users]);

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

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const handleAddRoleChange = (value: any) => {
    setAddRole(value.target.value);
  };

  const handleEditRoleChange = (value: any) => {
    setEditUserRole(value.target.value);
  };

  function roleColor(role: string) {
    switch (role) {
      case "admin":
        return "bg-blue-300";
      case "staff":
        return "bg-green-300";
      default:
        return "bg-gray-300";
    }
  }

  const renderCell = (user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "no":
        const userIndex = items.findIndex((item) => item._id === user._id);
        const startIndex = (page - 1) * rowsPerPage;

        return (
          <div className="flex justify-center">
            {startIndex + userIndex + 1}
          </div>
        );

      case "displayname":
        return (
          <div className="flex items-center align-middle gap-3">
            <Avatar
              className="bg-[#FF644B] bg-opacity-10 text-sm text-[#FF644B] font-sansThai"
              radius="lg"
              name={
                user.displayname && user.displayname.charAt(0).toUpperCase()
              }
            />
            <div className="font-sansThai">{user.displayname}</div>
          </div>
        );

      case "username":
        return <div className="text-md">{user.username}</div>;

      case "role":
        return (
          <div className="flex justify-center items-center">
            <Chip classNames={{ base: `${roleColor(user.role)} text-white` }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Chip>
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-center items-center gap-3">
            <Tooltip content="Edit user">
              <Button
                className="bg-[#FF644B] bg-opacity-10 text-[#FF644B]"
                isIconOnly
                size="sm"
                onPress={() => {
                  handleEditClick(user);
                }}
                key={"edit"}
              >
                <EditIcon />
              </Button>
            </Tooltip>

            <Tooltip color="danger" content="Delete user">
              <Button
                className="bg-[#FF644B] bg-opacity-10 text-[#FF644B]"
                isIconOnly
                size="sm"
                onPress={() => handleDeleteClick(user)}
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

  function handleAddStaff() {
    fetch("/api/management/userInfo", {
      method: "POST",
      body: JSON.stringify({ username: addUsername }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAddDisplayname(data.userInfo.displayname);
        addUserConfirmModal.onOpen();
        addUserModal.onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const addMessage = (displayname: string, role: string) => {
    return (
      "Are you sure you want to add " + displayname + " as a " + role + "?"
    );
  };

  async function handleAddConfirm() {
    await fetch("/api/management/staff/add", {
      method: "POST",
      body: JSON.stringify({
        username: addUsername,
        displayname: addDisplayname,
        role: addRole,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    addUserConfirmModal.onClose();
    setIsLoading(true);
  }

  function handleDeleteClick(user: User | null) {
    deleteUserModal.onOpen();
    setCurrentUser(user);
  }
  async function handleDeleteConfirm() {
    await fetch("/api/management/staff/delete", {
      method: "DELETE",
      body: JSON.stringify({
        username: currentUser?.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    await deleteUserModal.onClose();
    setCurrentUser(null);
    setIsLoading(true);
  }

  async function handleEditClick(user: User) {
    await setCurrentUser(user);
    await setEditUsername(user.username);
    await setEditUserRole(user.role);

    console.log(editUsername, editUserRole);
    editUserModal.onOpen();
  }
  const defaultRole = (role: string) => {
    switch (role) {
      case "admin":
        return ["admin"];
      case "staff":
        return ["staff"];
      default:
        return ["admin"];
    }
  };
  async function handleEditStaff() {
    await fetch("/api/management/userInfo", {
      method: "POST",
      body: JSON.stringify({ username: editUsername }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEditDisplayname(data.userInfo.displayname);
        editUserConfirmModal.onOpen();
        editUserModal.onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleCancleEdit() {
    editUserConfirmModal.onClose();
    editUserModal.onOpen();
  }
  async function handleEditConfirm() {
    await fetch("/api/management/staff/edit", {
      method: "PUT",
      body: JSON.stringify({
        username: editUsername,
        role: editUserRole,
        displayname: editDisplayname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    await editUserConfirmModal.onClose();
    setIsLoading(true);
  }
  const editMessage = (displayname: string, role: string) => {
    return (
      "Are you sure you want to edit " + displayname + " as a " + role + "?"
    );
  };

  useEffect(() => {
    if (isLoading) {
      fetch("/api/management/staff/get")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setIsLoading(false);
          console.log(users);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoading, users]);

  if (isLoading) {
    return <LoadingCustom />;
  }

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
                input: "font-sansThai",
              }}
              placeholder="Search user"
              isClearable
              startContent={<SearchIcon />}
              endContent={<CloseIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
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
              onPress={addUserModal.onOpen}
            >
              Add User
            </Button>
            <Modal
              isOpen={addUserModal.isOpen}
              onOpenChange={addUserModal.onOpenChange}
              classNames={{ base: "w-[360px]" }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Add Staff
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Username"
                        placeholder="Enter your Username"
                        variant="bordered"
                        isClearable
                        isRequired
                        endContent={<CloseIcon />}
                        onValueChange={(value) => {
                          setAddUsername(value);
                        }}
                      />
                      <Select
                        label="Role"
                        placeholder="Please select Role"
                        className="max-w-xs"
                        variant="bordered"
                        value={addRole}
                        onChange={handleAddRoleChange}
                        isRequired
                      >
                        <SelectItem key={"admin"}>Admin</SelectItem>
                        <SelectItem key={"staff"}>Staff</SelectItem>
                      </Select>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="text-[#FF644B] font-medium"
                        color="default"
                        variant="light"
                        onPress={onClose}
                      >
                        Close
                      </Button>
                      <Button
                        className="bg-[#FF644B] text-white font-medium"
                        onPress={handleAddStaff}
                      >
                        Add Staff
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
            <TableColumn key={"displayname"} allowsSorting>
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
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {currentUser && (
        <Modal
          isOpen={editUserModal.isOpen}
          onOpenChange={editUserModal.onOpenChange}
          classNames={{ base: "w-[360px]" }}
        >
          <ModalContent key={"edit"}>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Staff
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Username"
                    defaultValue={editUsername}
                    variant="bordered"
                    disabled
                    isRequired
                  />

                  <Select
                    label="Role"
                    placeholder="Please select Role"
                    className="max-w-xs"
                    variant="bordered"
                    onChange={handleEditRoleChange}
                    defaultSelectedKeys={defaultRole(editUserRole)}
                    isRequired
                  >
                    <SelectItem key={"admin"}>Admin</SelectItem>
                    <SelectItem key={"staff"}>Staff</SelectItem>
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="text-[#FF644B] font-medium"
                    color="default"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-[#FF644B] text-white font-medium"
                    onPress={() => {
                      handleEditStaff();
                    }}
                  >
                    Save Edit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Add confirm modal */}
      <ConfirmModal
        title="Add Staff"
        description={addMessage(addDisplayname, addRole)}
        icon={<AddStaffIcon />}
        textClose="Cancel"
        textConfirm="Add"
        isOpen={addUserConfirmModal.isOpen}
        onOpenChange={addUserConfirmModal.onOpenChange}
        onClose={addUserConfirmModal.onClose}
        onConfirm={handleAddConfirm}
      ></ConfirmModal>
      {/* Delete confirm modal */}
      <ConfirmModal
        title="Delete Staff"
        description="Are you sure you want to delete this staff?"
        icon={<DeleteIcon />}
        textClose="Cancel"
        textConfirm="Delete"
        isOpen={deleteUserModal.isOpen}
        onOpenChange={deleteUserModal.onOpenChange}
        onClose={deleteUserModal.onClose}
        onConfirm={handleDeleteConfirm}
      ></ConfirmModal>
      {/* Edit confirm modal */}
      <ConfirmModal
        title="Edit Staff"
        description={editMessage(editDisplayname, editUserRole)}
        icon={<EditIcon />}
        textClose="Cancel"
        textConfirm="Edit"
        isOpen={editUserConfirmModal.isOpen}
        onOpenChange={editUserConfirmModal.onOpenChange}
        onClose={handleCancleEdit}
        onConfirm={handleEditConfirm}
      ></ConfirmModal>
    </div>
  );
};
