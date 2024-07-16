"use client";

import { useEffect, useState } from "react";

import { Tab, Tabs } from "@nextui-org/react";
import { BookIcon, ClockIcon, MenuIcon } from "../icons";

import { PersonalPortalPage } from "./portalContent/personalPortalPage";
import { LastAccessPage } from "./portalContent/lastAccessPage";
import { UserGuidePage } from "./portalContent/userGuidePage";

export const PortalPage = () => {
  const [isVertical, setIsVertical] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid p-10 gap-4 max-sm:p-2">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          isVertical={isVertical}
          classNames={{
            tab: "justify-start",
            tabContent: "group-data-[selected=true]:text-[#FF644B] font-medium",
            panel: "justify-center w-full",
            wrapper: "max-sm:block",
            base: "max-sm:place-content-center max-sm:w-screen",
          }}
        >
          <Tab
            key="personalPortal"
            title={
              <div className="flex items-center space-x-2">
                <MenuIcon />
                <span>PerSonalized Portal</span>
              </div>
            }
          >
            <PersonalPortalPage />
          </Tab>
          <Tab
            key="lastAccessed"
            title={
              <div className="flex items-center space-x-2">
                <ClockIcon />
                <span>Last Accessed</span>
              </div>
            }
          >
            <LastAccessPage />
          </Tab>
          <Tab
            key="Guide"
            title={
              <div className="flex items-center space-x-2">
                <BookIcon />
                <span>User Guide</span>
              </div>
            }
          >
            <div className="block">
              <UserGuidePage />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
