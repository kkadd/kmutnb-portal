"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { EditIcon } from "../icons";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export const PortalNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/log-in" });
  };

  if (!pathname) {
    return null;
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
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
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex items-center">
          <Image src="/logo.png" alt="logo" width={100} height={30} />
        </NavbarBrand>{" "}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex flex-wrap gap-6 justify-center"
        justify="center"
      >
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

      <NavbarContent justify="end" className="flex gap-4 justify-end">
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

      <NavbarMenu>
        <NavbarMenuItem isActive={pathname === "/kmutnb-portal"}>
          <Link href="/kmutnb-portal">
            <span
              className="cursor-pointer w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Personalized Portal
            </span>
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem isActive={pathname === "/kmutnb-portal/all-services"}>
          <Link href="/kmutnb-portal/all-services">
            <span
              className="cursor-pointer w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              All Services
            </span>
          </Link>
        </NavbarMenuItem>
        {session?.user.management_role == "staff" ||
        session?.user.management_role === "admin" ? (
          <NavbarMenuItem isActive={pathname === "/management"}>
            <span
              className="cursor-pointer w-full"
              onClick={() => router.push("/management/services")}
            >
              Management
            </span>
          </NavbarMenuItem>
        ) : null}
      </NavbarMenu>
    </Navbar>
  );
};
