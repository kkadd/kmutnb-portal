import { Spinner } from "@nextui-org/react";

export const LoadingCustom = () => {
  return (
    <div className="grid justify-center items-center h-full w-full">
      <Spinner
        classNames={{
          circle1: "border-b-[#FF644B]",
          circle2: "border-b-[#FF644B]",
        }}
      />
    </div>
  );
};
