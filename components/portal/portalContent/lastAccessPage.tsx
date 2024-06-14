import { Card, Divider, Link, Tooltip, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { LoadingCustom } from "@/components/Loading/loadingCustom";
import { HistoryAddFunction } from "@/components/historyAddFunc/historyAddFunc";

import { Service } from "@/components/portal/allServicesPage";

export const LastAccessPage = () => {
  const [service, setService] = useState<Service[]>([]);
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user?.name);

  const [isLoading, setIsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [serviceLoading, setServiceLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setUsername(session?.user?.name);
      setSessionLoading(false);
    }
    if (isLoading && !sessionLoading) {
      fetch("/api/portal/history/lastAccess", {
        method: "POST",
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setService(data);
          setServiceLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setServiceLoading(false);
        });
    }
    if (!serviceLoading && !sessionLoading) {
      setIsLoading(false);
    }
  }, [
    isLoading,
    serviceLoading,
    session?.user.account_type,
    session?.user.name,
    sessionLoading,
    username,
  ]);

  if (isLoading) return <LoadingCustom />;

  return (
    <div className="grid p-10 gap-4">
      <div className="grid justify-center items-center h-[370px]">
        <div
          className="grid-container grid justify-center items-center gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gridAutoRows: "auto",
          }}
        >
          {service.map((service) => (
            <Tooltip
              key={service._id}
              content={
                <div className="grid gap-4 p-4">
                  <div className="font-sansThai font-medium">
                    {service.serviceName}
                  </div>
                  <Divider />
                  <div className="text-default-500 font-sansThai">
                    {service.serviceDescription}
                  </div>
                </div>
              }
            >
              <Link
                href={service.serviceLink}
                isExternal
                onPress={() =>
                  HistoryAddFunction(service._id, username ? username : "")
                }
              >
                <div className="grid justify-center items-center gap-2 h-[132px]">
                  <Card
                    className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
                    key={service._id}
                  >
                    <Image
                      src={service.serviceImg}
                      alt="service image"
                      width={90}
                      height={90}
                    />
                  </Card>

                  <div className="grid justify-center items-center text-default-700 font-sansThai">
                    {service.serviceName.substring(0, 12)}
                  </div>
                </div>
              </Link>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
