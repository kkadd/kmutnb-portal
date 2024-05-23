"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Link,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import {
  AddIcon,
  CloseIcon,
  SearchIcon,
  SortIcon,
  WarningIcon,
} from "../icons";
import RoleChips from "./roleChips";
import ConfirmModal from "../confirm-modal/confirmModal";

type Service = {
  id: string;
  serviceName: string;
  serviceLink: string;
  serviceImg: string;
  role: string[];
  enable: boolean;
};

export const ServiceManage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedServices, setSortedServices] = useState<Service[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [serviceMock, setServiceMock] = useState<Service[]>([
    {
      id: "s1",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
      role: ["Alumni", "Exchange Student", "Student"],
      enable: true,
    },
    {
      id: "s2",
      serviceName: "ICIT Account",
      serviceLink: "https://account.kmutnb.ac.th/web/",
      serviceImg:
        "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
      role: ["Alumni", "Exchange Student", "Student", "Personnel"],
      enable: false,
    },
    {
      id: "s3",
      serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
      serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
      serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
      role: [
        "Alumni",
        "Exchange Student",
        "Student",
        "Personnel",
        "Retiree",
        "Special Teacher",
      ],
      enable: true,
    },
    {
      id: "s4",
      serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
      serviceLink: "https://software.kmutnb.ac.th/",
      serviceImg:
        "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
      role: [
        "Exchange Student",
        "Student",
        "Personnel",
        "Retiree",
        "Special Teacher",
      ],
      enable: true,
    },
    {
      id: "s5",
      serviceName: "กองบริการการศึกษา",
      serviceLink: "https://acdserv.kmutnb.ac.th/home",
      serviceImg:
        "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
      role: ["Exchange Student", "Student"],
      enable: false,
    },
    {
      id: "s6",
      serviceName: "KMUTNB Online Learning",
      serviceLink: "https://www.kmutnb.ac.th/kmutnb-online-learning.aspx",
      serviceImg:
        "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
      role: [
        "Exchange Student",
        "Student",
        "Personnel",
        "Retiree",
        "Special Teacher",
      ],
      enable: true,
    },
    {
      id: "s7",
      serviceName: "ระบบขอเอกสารสำคัญทางการศึกษา",
      serviceLink: "http://e-service.acdserv.kmutnb.ac.th/regReqDoc/login/",
      serviceImg:
        "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
      role: ["Exchange Student", "Student", "Alumni"],
      enable: true,
    },
  ]);

  const itemsPerPage = 6;

  const onSearchChange = useCallback((value: any) => {
    setFilterValue(value || "");
    setCurrentPage(1);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback(() => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }, []);

  const filteredServices = useMemo(() => {
    return serviceMock.filter((service) =>
      service.serviceName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, serviceMock]);

  useEffect(() => {
    const sorted = [...filteredServices].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.serviceName.localeCompare(b.serviceName);
      } else {
        return b.serviceName.localeCompare(a.serviceName);
      }
    });
    setSortedServices(sorted);
  }, [filteredServices, sortOrder]);

  return (
    <div>
      <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <div className="flex justify-between items-stretch">
          <div className="flex justify-start">
            <span className="text-[24px] font-medium">Service Management</span>
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

            <Button
              className="text-white bg-[#FF644B] font-semibold w-fit p-3"
              startContent={<AddIcon />}
              variant="flat"
              onClick={() => router.push("/service-management/add")}
            >
              Add Service
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 grid-flow-row gap-4">
          {sortedServices
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((service) => (
              <Card key={service.id} className="max-w-[400px]" shadow="sm">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="service img"
                    height={40}
                    width={40}
                    radius="sm"
                    src={service.serviceImg}
                  />

                  <div className="flex flex-col">
                    <span className="text-md font-sansThai">
                      {service.serviceName}
                    </span>
                    <Link
                      className="text-sm text-default-500"
                      href={service.serviceLink}
                    >
                      {service.serviceLink}
                    </Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <RoleChips roles={service.role} />
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-between items-center">
                  <Button
                    className="mx-auto bg-transparent text-[#afafaf] w-full"
                    onClick={() => router.push("/service-management/edit")}
                  >
                    Edit
                  </Button>
                  <Divider orientation="vertical" />
                  <Button
                    className="mx-auto bg-transparent text-[#afafaf] w-full"
                    onPress={onOpen}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
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
            total={Math.ceil(serviceMock.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <ConfirmModal
        icon={<WarningIcon />}
        title="Delete Service"
        description="You're going to delete this service. Are you sure?"
        textClose="No, Keep it."
        textConfirm="Yes, Delete !"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default ServiceManage;
