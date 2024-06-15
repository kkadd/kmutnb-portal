import React from "react";
import { Image } from "@nextui-org/react";

const AccessDeniedPage: React.FC = () => {
  return (
    <div className="grid justify-center items-center gap-4 w-full">
      <Image
        src="/cybersecurity.svg"
        alt="empty image"
        height={300}
        width={500}
      />
      <div className="grid justify-center items-center text-2xl font-sansThai">
        Access Denied
      </div>
      <div className="flex justify-center items-center text-lg font-sansThai">
        <div>Sorry, you do not have permission to access this page.</div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
