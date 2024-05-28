import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import { CloseIcon } from "../icons";

export const LoginPage = () => {
  return (
    <div className="flex p-10 gap-4 h-screen">
      <div className="bg-[#FF644B] bg-opacity-10 w-1/2 rounded-3xl">
        <Image
          src="/user-interface.svg"
          alt="login image"
          width={800}
          height={800}
          priority
        />
      </div>
      <div className="grid justify-center items-center w-1/2">
        <div className="grid gap-10">
          <div className="grid gap-2">
            <span className="grid justify-center text-[24px] font-bold">
              <Image
                src="/logo.png"
                alt="logo image"
                width={300}
                height={100}
              />
            </span>
            <span className="grid justify-center text-base">
              let&apos;s manage your personalized portal !
            </span>
          </div>
          <form>
            <div className="grid gap-8">
              <div className="grid gap-2">
                <Input
                  classNames={{ base: "border-[#FF644B]" }}
                  variant="bordered"
                  placeholder="ICIT Account"
                  isClearable
                  radius="full"
                  endContent={<CloseIcon />}
                />
                <Input
                  variant="bordered"
                  placeholder="Password"
                  type="password"
                  radius="full"
                />
                <div className="flex justify-end mt-1">
                  <Link
                    href="https://account.kmutnb.ac.th/web/recovery/index"
                    className="text-xs text-black"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Button
                className="text-white bg-[#FF644B] font-semibold"
                radius="full"
                type="submit"
              >
                Login
              </Button>
              <div className="flex justify-center">
                Don&apos;t have account?
                <Link
                  href="https://account.kmutnb.ac.th/web/student/activation"
                  className="text-[#FF644B]"
                >
                  &nbsp;Register now
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
