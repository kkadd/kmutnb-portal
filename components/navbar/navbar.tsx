"use client";

import React from "react";

import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarContent,
  Breadcrumbs,
  BreadcrumbItem,
  Link,
} from "@nextui-org/react";

import { BurgerButton } from "./burgerButton";

import { HomeIcon } from "../icons";

interface BreadcrumbItem {
  key: string;
  label: string;
  isCurrent?: boolean;
}
interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const breadcrumbs: BreadcrumbItem[] = pathNames.map((segment, index) => {
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    const isCurrent = index === pathNames.length - 1;

    const link =
      index > 0 ? (
        <Link key={index} href={`/${pathNames.slice(0, index + 1).join("/")}`}>
          {label}
        </Link>
      ) : (
        <BreadcrumbItem key={index}>{label}</BreadcrumbItem>
      );

    return { key: index.toString(), link, isCurrent, label };
  });

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurgerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Breadcrumbs underline="active">
            <BreadcrumbItem startContent={<HomeIcon />}>Home</BreadcrumbItem>
            {breadcrumbs.map((crumb) => (
              <BreadcrumbItem key={crumb.key}>{crumb.label}</BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
