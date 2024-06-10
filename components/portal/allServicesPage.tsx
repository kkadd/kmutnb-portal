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
  Tooltip,
} from "@nextui-org/react";
import {
  AddIcon,
  CampaignIcon,
  CloseIcon,
  SearchIcon,
  SortIcon,
} from "../icons";
import { LoadingCustom } from "../Loading/loadingCustom";

type Service = {
  _id: string;
  serviceName: string;
  serviceLink: string;
  serviceImg: string;
  serviceDescription: string;
  role: string[];
  enable: boolean;
};

const newServiceMock = [
  {
    id: "ns1",
    serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    serviceImg:
      "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
  },
  {
    id: "ns2",
    serviceName: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    serviceImg: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
  },
  {
    id: "ns3",
    serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
  },
  {
    id: "ns4",
    serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
  },
  {
    id: "ns5",
    serviceName: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
  },
  {
    id: "ns6",
    serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
  },
  {
    id: "ns7",
    serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
  },
  {
    id: "ns8",
    serviceName: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
  },
];

export const AllServicesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNewPage, setCurrentNewPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [hydrated, setHydrated] = useState(false);
  const [service, setService] = useState<Service[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const itemsPerPage = 8;
  const newItemsPerpage = 5;

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
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
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setLoading(false);
        });
    }
  }, [isLoading]);

  const filteredServices = useMemo(() => {
    return service.filter((service) =>
      service.serviceName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [service, filterValue]);

  const filteredNewServices = useMemo(() => {
    return newServiceMock.filter((service) =>
      service.serviceName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue]);

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

  if (!hydrated) {
    return null;
  }

  if (isLoading) {
    return <LoadingCustom />;
  }

  return (
    <div className="flex justify-center p-9 gap-6">
      <div className="h-[600px] w-2/5">
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
            <div className="grid grid-cols-2 gap-4 z-50 relative">
              {currentNewItems.map((service) => (
                <Tooltip
                  key={service.id}
                  content={
                    <div className="grid gap-4 p-4">
                      <div className="font-sansThai font-medium">
                        {service.serviceName}
                      </div>
                      <Divider />
                      <div className="text-default-500 font-sansThai">
                        {service.description}
                      </div>
                    </div>
                  }
                >
                  <Card className="h-[90px] w-[250px]" key={service.id}>
                    <CardBody className="justify-center p-4">
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <Link href={service.serviceLink} isExternal>
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
                            >
                              {service.serviceName.substring(0, 11)}
                            </Link>
                            <Link
                              className="text-sm text-default-500 font-sansThai"
                              href={service.serviceLink}
                              isExternal
                            >
                              {service.description.substring(0, 11)}
                            </Link>
                          </div>
                        </div>
                        <Button
                          isIconOnly
                          variant="flat"
                          className="bg-transparent text-[#afafaf]"
                        >
                          <AddIcon />
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Tooltip>
              ))}
            </div>
            <div className="absolute inset-0 z-10 flex justify-end items-end p-3">
              <Image
                src="/campaign.svg"
                alt="new service image"
                width={300}
                height={300}
              />
            </div>
            <div className="z-50 flex justify-center items-center h-[300px] w-2/5">
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
                total={Math.ceil(newServiceMock.length / newItemsPerpage)}
                initialPage={currentNewPage}
                onChange={(page) => setCurrentNewPage(page)}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="h-[600px] w-3/5">
        <div className="flex justify-between items-stretch mb-6">
          <div className="flex justify-start">
            <div className="text-[24px] font-medium">All Services</div>
          </div>

          <div className="flex justify-end gap-2">
            <Input
              className="w-[210px]"
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

        <div className="grid grid-cols-2 gap-6">
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
                    {service.serviceDescription}
                  </div>
                </div>
              }
            >
              <Card className="h-[90px]" key={service._id}>
                <CardBody className="justify-center p-4">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Link href={service.serviceLink} isExternal>
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
                        >
                          {service.serviceName.substring(0, 35)}
                        </Link>
                        <Link
                          className="text-sm text-default-500 font-sansThai"
                          href={service.serviceLink}
                          isExternal
                        >
                          {service.serviceDescription.substring(0, 43)}
                        </Link>
                      </div>
                    </div>
                    <Button
                      isIconOnly
                      variant="flat"
                      className="bg-transparent text-[#afafaf]"
                    >
                      <AddIcon />
                    </Button>
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
