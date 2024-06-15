import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

import { useSidebarContext } from "../layout/layoutContext";
import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebarItem";
import {
  LogoutIcon,
  MenuIcon,
  PortalIcon,
  ServiceIcon,
  StaffIcon,
} from "../icons";
import { SidebarMenu } from "./sidebarMenu";

import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/log-in" });
  };

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <Image src="/logo.png" alt="logo image" width={100} height={25} />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <div className="flex gap-4 justify-center">
              <Avatar
                classNames={{
                  base: "bg-[#FF644B] bg-opacity-10 text-sm text-[#FF644B] font-sansThai",
                }}
                name={
                  session?.user.displayname ? session?.user.displayname[0] : ""
                }
                size="md"
                radius="lg"
              />
              <div>
                <p className="text-base font-medium text-[#FF644B] font-sansThai">
                  {session?.user.displayname}
                </p>
                <p className="text-[10px] text-[#afafaf]">
                  {session?.user.email}
                </p>
              </div>
            </div>
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/kmutnb-portal"}
                href="/kmutnb-portal"
                title="Personalized Portal"
                icon={<PortalIcon />}
              />
              <SidebarItem
                isActive={
                  pathname === "/management/services" ||
                  pathname === "/management/services/add" ||
                  pathname === "/management/services/edit"
                }
                href="/management/services/"
                title="Service Management"
                icon={<ServiceIcon />}
              />
              {session?.user.management_role == "admin" && (
                <SidebarItem
                  isActive={pathname === "/management/staff"}
                  href="/management/staff"
                  title="Staff Management"
                  icon={<StaffIcon />}
                />
              )}
            </SidebarMenu>
          </div>
          {pathname === "/management/services" ||
          pathname === "/management/services/add" ||
          pathname === "/management/services/edit" ? (
            <Image
              src="/folder.svg"
              alt="service management"
              width={300}
              height={300}
            />
          ) : null}
          {session?.user.management_role == "admin" &&
          pathname === "/management/staff" ? (
            <Image
              src="/profiling.svg"
              alt="staff management"
              width={300}
              height={300}
            />
          ) : null}
          <div className={Sidebar.Footer()}>
            <div className="grid">
              <SidebarItem
                title="Log out"
                icon={<LogoutIcon />}
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
