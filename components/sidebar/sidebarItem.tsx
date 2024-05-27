import React from "react";
import NextLink from "next/link";
import { useSidebarContext } from "../layout/layoutContext";
import clsx from "clsx";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-[#FF644B] [&_svg_path]:fill-white"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span
          className={clsx(
            isActive
              ? "text-white font-medium"
              : "text-default-600 font-medium",
            "text-sm"
          )}
        >
          {title}
        </span>
      </div>
    </NextLink>
  );
};
