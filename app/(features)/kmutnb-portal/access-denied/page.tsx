import React from "react";
import { Image } from "@nextui-org/react";

const AccessDeniedPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full min-h-screen p-4">
      <Image
        src="/cybersecurity.svg"
        alt="empty image"
        height={300}
        width={500}
        className="max-w-full h-auto"
      />
      <div className="text-2xl font-sansThai text-center">Access Denied</div>
      <div className="text-lg font-sansThai text-center">
        <div>Sorry, you do not have permission to access this page.</div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
