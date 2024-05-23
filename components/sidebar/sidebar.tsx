import React from "react";
import { usePathname } from "next/navigation";
import { SidebarContext, useSidebarContext } from "../layout/layoutContext";
import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebarItem";
import { LogoutIcon, ServiceIcon, StaffIcon } from "../icons";
import { SidebarMenu } from "./sidebarMenu";
import { Avatar } from "@nextui-org/react";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

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
          <h1 className="text-black">Logo</h1>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <div className="flex gap-4 justify-center">
              <Avatar
                classNames={{
                  base: "bg-gradient-to-br from-[#EFBBB0] to-[#EFBBB0]",
                }}
                name="Siriwan"
                src="https://i.pinimg.com/736x/f9/69/e7/f969e7040a7f4be872819285b61d8335.jpg"
                size="md"
                radius="lg"
              />
              <div>
                <p className="text-base font-medium text-[#E16449]">
                  Siriwan Tuha
                </p>
                <p className="text-[10px] text-[#afafaf]">
                  s6303051623179@kmutnb.ac.th
                </p>
              </div>
            </div>
            <SidebarMenu title="Menu">
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
              <SidebarItem
                isActive={pathname === "/management/staff"}
                href="/management/staff"
                title="Staff Management"
                icon={<StaffIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <SidebarItem title="Log out" icon={<LogoutIcon />} />
          </div>
        </div>
      </div>
    </aside>
  );
};
