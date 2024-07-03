"use client";
import { Button, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { CloseIcon, VisibilityIcon, VisibilityOffIcon } from "../icons";
import React, { useState } from "react";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  async function handleLogin(e: React.FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    signIn("credentials", {
      username,
      password,
      callbackUrl: "/kmutnb-portal", // Redirect to the homepage
    });
  }
  return (
    <div className="flex flex-col md:flex-row p-10 gap-4 h-screen">
      <div className="bg-[#FF644B] bg-opacity-10 md:w-1/2 w-full rounded-3xl items-center justify-center">
        <Image
          src="/user-interface.svg"
          alt="login image"
          width={800}
          height={800}
          priority
          className="max-w-full h-auto"
        />
      </div>
      <div className="grid justify-center items-center md:w-1/2 w-full">
        <div className="grid gap-10">
          <div className="grid gap-2 text-center">
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
                  onValueChange={(value) => {
                    setUsername(value);
                  }}
                />
                <Input
                  variant="bordered"
                  placeholder="Password"
                  type={isVisible ? "text" : "password"}
                  radius="full"
                  onValueChange={(value) => {
                    setPassword(value);
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  }
                />
                <div className="flex justify-end mt-1">
                  <Link
                    href="https://account.kmutnb.ac.th/web/recovery/index"
                    className="text-xs text-black"
                    isExternal
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Button
                className="text-white bg-[#FF644B] font-semibold"
                radius="full"
                type="submit"
                onClick={handleLogin}
                isLoading={isLoading}
              >
                Login
              </Button>
              <div className="flex justify-center">
                Don&apos;t have account?
                <Link
                  href="https://account.kmutnb.ac.th/web/student/activation"
                  className="text-[#FF644B]"
                  isExternal
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
