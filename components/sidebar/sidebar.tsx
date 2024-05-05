import React from "react";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../layout/layoutContext";
import { Sidebar } from "./sidebar.styles";

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
        <div className={Sidebar.Header()}>Logo</div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>body test</div>
          <div className={Sidebar.Footer()}>footer test</div>
        </div>
      </div>
    </aside>
  );
};
