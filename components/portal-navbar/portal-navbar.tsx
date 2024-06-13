"use client";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { EditIcon } from "../icons";

import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const PortalNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/log-in" }); // Add the signOut method with a callback URL
  };

  if (!pathname) {
    return null;
  }

  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-[#FF644B]",
          "data-[active=true]:text-[#FF644B]",
        ],
      }}
      isBlurred={false}
    >
      <NavbarBrand>
        <Image src="/logo.png" alt="logo" width={100} height={30} />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive={pathname === "/kmutnb-portal"}>
          <span
            className="cursor-pointer"
            onClick={() => router.push("/kmutnb-portal")}
          >
            Personalized Portal
          </span>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/kmutnb-portal/all-services"}>
          <span
            className="cursor-pointer"
            onClick={() => router.push("/kmutnb-portal/all-services")}
          >
            All Services
          </span>
        </NavbarItem>
        {/* only staff and admin can see this tab */}
        {session?.user.management_role == "staff" ||
        session?.user.management_role === "admin" ? (
          <NavbarItem isActive={pathname === "/management"}>
            <span
              className="cursor-pointer"
              onClick={() => router.push("/management/services")}
            >
              Management
            </span>
          </NavbarItem>
        ) : null}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {(pathname === "/kmutnb-portal" ||
          pathname === "/kmutnb-portal/edit") && (
          <Button
            variant="bordered"
            startContent={<EditIcon />}
            className="border-[#FF644B] text-[#FF644B] font-semibold"
            onClick={() => router.push("/kmutnb-portal/edit")}
          >
            Edit
          </Button>
        )}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="bg-[#FF644B] bg-opacity-20 text-md text-[#FF644B] font-sansThai"
              radius="lg"
              name={
                session?.user.displayname ? session?.user.displayname[0] : ""
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-4" showDivider>
              <p className="font-semibold font-sansThai">
                {session?.user.displayname}
              </p>
              <p className="font-medium text-[#afafaf]">
                {session?.user.email}
              </p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
