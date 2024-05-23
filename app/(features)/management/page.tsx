"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Management = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/management/services");
  }, [router]);

  return null;
};

export default Management;
