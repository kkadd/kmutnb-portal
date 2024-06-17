"use client";

// import { useSearchParams } from "next/navigation";
import { Image } from "@nextui-org/react";
import "@/styles/globals.css";
type Props = {
  error: string | null;
};

const ErrorPage = ({ error }: Props) => {
  /* const searchParams = useSearchParams();
  const error = searchParams.get("error"); */

  const errorMessage = () => {
    switch (error) {
      case "CredentialsSignin":
        return "Sign in failed. Please check your credentials and try again.";
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "You do not have permission to sign in.";
      default:
        return "An unexpected error occurred. Please try again later.";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image src="/404.svg" alt="empty image" height={400} width={400} />
        <div className="text-center text-4xl mt-[-100px]">
          Authentication Error
        </div>
        <div className="text-center text-lg">{errorMessage()}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
