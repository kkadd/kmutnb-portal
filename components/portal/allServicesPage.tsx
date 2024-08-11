"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Image,
  Input,
  Link,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  User,
} from "@nextui-org/react";
import {
  AddIcon,
  CampaignIcon,
  CloseIcon,
  MoreIcon,
  SearchIcon,
  SortIcon,
} from "../icons";
import { LoadingCustom } from "../Loading/loadingCustom";
import { useSession } from "next-auth/react";
import { HistoryAddFunction } from "@/components/historyAddFunc/historyAddFunc";

export type Service = {
  _id: string;
  serviceName: string;
  serviceLink: string;
  serviceImg: string;
  serviceDescription: string;
  role: string[];
  enable: boolean;
  toggle: boolean;
};

export const AllServicesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNewPage, setCurrentNewPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [hydrated, setHydrated] = useState(false);
  const [service, setService] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [serviceLoading, setServiceLoading] = useState(true);
  const [newServiceLoading, setNewServiceLoading] = useState(true);

  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user.name);
  const [role, setRole] = useState(session?.user.account_type);

  const itemsPerPage = 8;
  const newItemsPerpage = 5;

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setUsername(session?.user.name);
      setRole(session?.user.account_type);
      setSessionLoading(false);
    }
    if (isLoading && !sessionLoading) {
      fetch("/api/portal/allServices/getAllServices", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          role: role,
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
      fetch("/api/portal/allServices/getNewServices", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          role: role,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNewService(data);
          setNewServiceLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching new services:", error);
          setNewServiceLoading(false);
        });
    }
    if (!serviceLoading && !newServiceLoading && !sessionLoading) {
      setIsLoading(false);
    }
  }, [
    isLoading,
    newServiceLoading,
    role,
    serviceLoading,
    session?.user.account_type,
    session?.user.name,
    sessionLoading,
    username,
  ]);

  const filteredServices = useMemo(() => {
    return service.filter((service) =>
      service.serviceName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [service, filterValue]);

  const filteredNewServices = useMemo(() => {
    return newService.filter((service) =>
      service.serviceName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, newService]);

  const sortedServices = useMemo(() => {
    return [...filteredServices].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.serviceName.localeCompare(b.serviceName);
      } else {
        return b.serviceName.localeCompare(a.serviceName);
      }
    });
  }, [filteredServices, sortOrder]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedServices.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedServices, currentPage]);

  const currentNewItems = useMemo(() => {
    const newStartIndex = (currentNewPage - 1) * newItemsPerpage;
    return filteredNewServices.slice(
      newStartIndex,
      newStartIndex + newItemsPerpage
    );
  }, [filteredNewServices, currentNewPage]);

  const onSearchChange = useCallback((value: any) => {
    setFilterValue(value || "");
    setCurrentPage(1);
    setCurrentNewPage(1);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setCurrentPage(1);
    setCurrentNewPage(1);
  }, []);

  const handleSort = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }, []);

  const handleAddService = async (serviceId: Service["_id"]) => {
    await fetch("/api/portal/allServices/addToPersonal", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        serviceId: serviceId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error adding service:", error);
      });
    setIsLoading(true);
  };

  if (!hydrated) {
    return null;
  }

  if (isLoading) {
    return <LoadingCustom />;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:p-9 gap-6">
      <div className="lg:h-[600px] lg:w-2/5 w-full">
        <Card className="h-full w-full">
          <CardBody className="p-4">
            <div className="grid justify-start mb-[21px]">
              <Chip
                className="flex justify-center items-center bg-[#FF644B] p-2"
                startContent={<CampaignIcon />}
              >
                <div className="text-lg text-white font-semibold">
                  New Services
                </div>
              </Chip>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
              {currentNewItems.map((service) => (
                <Tooltip
                  key={service._id}
                  content={
                    <div className="grid gap-4 p-4">
                      <div className="font-sansThai font-medium">
                        {service.serviceName}
                      </div>
                      <Divider />
                      <div className="text-default-500 font-sansThai">
                        {service.serviceDescription
                          .split(/(?:\r\n|\r|\n)/g)
                          .map((line, index, array) => (
                            <span key={index}>
                              {line}
                              {index < array.length - 1 && <br />}
                            </span>
                          ))}
                      </div>
                    </div>
                  }
                >
                  <Card
                    className="h-[90px] w-full relative z-20"
                    key={service._id}
                  >
                    <CardBody className="justify-center p-4">
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <Link
                            href={service.serviceLink}
                            isExternal
                            onPress={() =>
                              HistoryAddFunction(
                                service._id,
                                username ? username : ""
                              )
                            }
                          >
                            <Image
                              src={service.serviceImg}
                              alt="service image"
                              width={50}
                              height={50}
                            />
                          </Link>

                          <div className="flex flex-col">
                            <Link
                              className="text-md text-black font-sansThai font-medium"
                              href={service.serviceLink}
                              isExternal
                              onPress={() =>
                                HistoryAddFunction(
                                  service._id,
                                  username ? username : ""
                                )
                              }
                            >
                              {service.serviceName.substring(0, 11)}
                            </Link>
                            <Link
                              className="text-sm text-default-500 font-sansThai"
                              href={service.serviceLink}
                              isExternal
                              onPress={() =>
                                HistoryAddFunction(
                                  service._id,
                                  username ? username : ""
                                )
                              }
                            >
                              {service.serviceDescription.substring(0, 11)}
                            </Link>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          {!service.toggle && (
                            <Button
                              isIconOnly
                              variant="flat"
                              className="bg-transparent text-[#afafaf]"
                              onPress={() => handleAddService(service._id)}
                            >
                              <AddIcon />
                            </Button>
                          )}
                          <Popover placement="top-end" showArrow={true}>
                            <PopoverTrigger>
                              <Button
                                isIconOnly
                                variant="flat"
                                className="bg-transparent text-[#afafaf]"
                              >
                                <MoreIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="grid gap-4 p-4 w-[277px]">
                                <div className="font-sansThai font-medium">
                                  {service.serviceName}
                                </div>
                                <Divider />
                                <div className="text-default-500 font-sansThai">
                                  {service.serviceDescription
                                    ?.split(/(?:\r\n|\r|\n)/g)
                                    .map((line, index, array) => (
                                      <span key={index}>
                                        {line}
                                        {index < array.length - 1 && <br />}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tooltip>
              ))}
            </div>

            <div className="flex justify-center items-center h-[300px] w-full lg:w-2/5 z-20">
              <Pagination
                classNames={{
                  cursor: "bg-[#FF644B]",
                  item: "bg-white",
                  next: "bg-white",
                  prev: "bg-white",
                }}
                size="sm"
                variant="flat"
                showControls
                total={Math.ceil(newService.length / newItemsPerpage)}
                initialPage={currentNewPage}
                onChange={(page) => setCurrentNewPage(page)}
              />
            </div>
            <div className="flex justify-end items-end p-3">
              <Image
                src="/campaign.svg"
                alt="new service image"
                width={300}
                height={300}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="h-[600px] w-full lg:w-3/5">
        <div className="flex justify-between items-stretch mb-6">
          <div className="flex justify-start">
            <div className="text-[24px] font-medium">All Services</div>
          </div>

          <div className="flex justify-end gap-2">
            <Input
              className="w-full lg:w-[210px]"
              classNames={{
                inputWrapper: "bg-white",
                input: "font-sansThai",
              }}
              placeholder="Search service"
              isClearable
              startContent={<SearchIcon />}
              endContent={<CloseIcon />}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />

            <Button
              className="border-[#FF644B] bg-white"
              isIconOnly
              variant="bordered"
              aria-label="sort service list"
              onClick={handleSort}
            >
              <SortIcon />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentItems.map((service) => (
            <Tooltip
              key={service._id}
              content={
                <div className="grid gap-4 p-4">
                  <div className="font-sansThai font-medium">
                    {service.serviceName}
                  </div>
                  <Divider />
                  <div className="text-default-500 font-sansThai">
                    {service.serviceDescription
                      .split(/(?:\r\n|\r|\n)/g)
                      .map((line, index, array) => (
                        <span key={index}>
                          {line}
                          {index < array.length - 1 && <br />}
                        </span>
                      ))}
                  </div>
                </div>
              }
            >
              <Card className="h-[90px]" key={service._id}>
                <CardBody className="justify-center p-4">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={service.serviceLink}
                        isExternal
                        onPress={() =>
                          HistoryAddFunction(
                            service._id,
                            username ? username : ""
                          )
                        }
                      >
                        <Image
                          src={service.serviceImg}
                          alt="service image"
                          width={50}
                          height={50}
                        />
                      </Link>

                      <div className="flex flex-col">
                        <Link
                          className="text-md text-black font-sansThai font-medium"
                          href={service.serviceLink}
                          isExternal
                          onPress={() =>
                            HistoryAddFunction(
                              service._id,
                              username ? username : ""
                            )
                          }
                        >
                          {service.serviceName.substring(0, 30)}
                        </Link>
                        <Link
                          className="text-sm text-default-500 font-sansThai"
                          href={service.serviceLink}
                          isExternal
                          onPress={() =>
                            HistoryAddFunction(
                              service._id,
                              username ? username : ""
                            )
                          }
                        >
                          {service.serviceDescription.substring(0, 30)}
                        </Link>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {!service.toggle && (
                        <Button
                          isIconOnly
                          variant="flat"
                          className="bg-transparent text-[#afafaf]"
                          onPress={() => handleAddService(service._id)}
                        >
                          <AddIcon />
                        </Button>
                      )}
                      <Popover placement="top-end" showArrow={true}>
                        <PopoverTrigger>
                          <Button
                            isIconOnly
                            variant="flat"
                            className="bg-transparent text-[#afafaf]"
                          >
                            <MoreIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="grid gap-4 p-4 w-[277px]">
                            <div className="font-sansThai font-medium">
                              {service.serviceName}
                            </div>
                            <Divider />
                            <div className="text-default-500 font-sansThai">
                              {service.serviceDescription
                                ?.split(/(?:\r\n|\r|\n)/g)
                                .map((line, index, array) => (
                                  <span key={index}>
                                    {line}
                                    {index < array.length - 1 && <br />}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tooltip>
          ))}
        </div>
        <div className="flex justify-center items-center mt-10 w-full">
          <Pagination
            classNames={{
              cursor: "bg-[#FF644B]",
              item: "bg-white",
              next: "bg-white",
              prev: "bg-white",
            }}
            size="sm"
            variant="flat"
            showControls
            total={Math.ceil(service.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
