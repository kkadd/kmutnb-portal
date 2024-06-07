import { Image } from "@nextui-org/react";

export const UserGuidePage = () => {
  return (
    <div className="grid p-4 gap-4">
      <div className="grid justify-center items-center">
        <Image
          src="/userManual.png"
          alt="empty image"
          height={500}
          width={860}
        />
      </div>
    </div>
  );
};
