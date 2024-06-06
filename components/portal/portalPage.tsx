"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { PersonalPortalPage } from "./portalContent/personalPortalPage";
import { BookIcon, ClockIcon, MenuIcon } from "../icons";

export const PortalPage = () => {
  const [isVertical, setIsVertical] = useState(true);

  return (
    <div className="grid p-10 gap-4">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          isVertical={isVertical}
          classNames={{
            tab: "justify-start",
            tabContent: "group-data-[selected=true]:text-[#FF644B] font-medium",
            panel: "justify-center w-full",
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
            <div>hi</div>
          </Tab>
          <Tab
            key="Guide"
            title={
              <div className="flex items-center space-x-2">
                <BookIcon />
                <span>Guide</span>
              </div>
            }
          >
            <div>hi hi</div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
