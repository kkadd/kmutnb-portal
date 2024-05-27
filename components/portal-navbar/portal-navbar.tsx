import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { EditIcon } from "../icons";

interface Props {
  children: React.ReactNode;
}

export const PortalNav = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

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
    >
      <NavbarBrand>
        <span className="font-bold text-inherit">KMUTNB Portal</span>
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
        <NavbarItem isActive={pathname === "/kmutnb-portal/all-service"}>
          <span
            className="cursor-pointer"
            onClick={() => router.push("/kmutnb-portal/all-service")}
          >
            All Services
          </span>
        </NavbarItem>
        {/* only staff and admin can see this tab */}
        <NavbarItem isActive={pathname === "/management"}>
          <span
            className="cursor-pointer"
            onClick={() => router.push("/management/services")}
          >
            Management
          </span>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Button
          variant="bordered"
          startContent={<EditIcon />}
          className="border-[#FF644B] text-[#FF644B] font-semibold"
        >
          Edit
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="bg-[#FF644B] bg-opacity-10 text-sm text-[#FF644B] font-sansThai "
              radius="full"
              name="Jason Hughes"
              // size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};