"use client";

import React, { useState } from "react";
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
} from "@nextui-org/react";
import { AddIcon, CloseIcon, SearchIcon, SortIcon } from "../icons";
import RoleChips from "./roleChips";

export const ServiceManage = () => {
  const serviceMock = [
    {
      id: "s1",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://miro.medium.com/v2/resize:fit:720/0*I32LiwMMYY16sPAB.jpg",
      role: ["Alumni", "Special Teacher", "Personnel", "Retiree"],
      enable: true,
    },
    {
      id: "s2",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://pm1.aminoapps.com/7412/2a9474d547eaadc128bc547914ebe3c7b39c1141r1-639-609v2_uhq.jpg",
      role: ["Admin", "Member", "newbie", "Guest"],
      enable: false,
    },
    {
      id: "s3",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
      role: ["Admin", "Member"],
      enable: true,
    },
    {
      id: "s4",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://miro.medium.com/v2/resize:fit:720/0*I32LiwMMYY16sPAB.jpg",
      role: ["Admin", "Staff", "Student", "Exchange Student", "Alumni"],
      enable: true,
    },
    {
      id: "s5",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://pm1.aminoapps.com/7412/2a9474d547eaadc128bc547914ebe3c7b39c1141r1-639-609v2_uhq.jpg",
      role: ["Special Teacher", "Personnel", "Retiree"],
      enable: false,
    },
    {
      id: "s6",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
      role: ["Admin", "Member"],
      enable: true,
    },
    {
      id: "s7",
      serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา7",
      serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
      serviceImg:
        "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
      role: ["Admin", "Member"],
      enable: true,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  return (
    <div className="my-6 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between items-stretch">
        <div className="flex justify-start">
          <p className="text-[24px] font-medium">Service Management</p>
        </div>

        <div className="flex justify-end gap-2">
          <Input
            className="w-[226px]"
            classNames={{
              inputWrapper: "bg-white",
            }}
            placeholder="Search service"
            isClearable
            startContent={<SearchIcon />}
            endContent={<CloseIcon />}
          />

          <Button
            className="border-[#FF644B] bg-white"
            isIconOnly
            variant="bordered"
            aria-label="sort service list"
          >
            <SortIcon />
          </Button>

          <Button
            className="text-white bg-[#FF644B] font-semibold w-fit p-3"
            startContent={<AddIcon />}
            variant="flat"
          >
            Add Service
          </Button>
        </div>
      </div>

      {/* <div className="grid p-4 bg-white rounded-2xl"> */}
      <div className="grid grid-cols-3 grid-flow-row gap-4">
        {serviceMock
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((service, index) => (
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
                  <p className="text-md">{service.serviceName}</p>
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
                <div className="flex text-[#afafaf] w-[167px]">
                  <span className="mx-auto">Edit</span>
                </div>
                <Divider orientation="vertical" />
                <div className="flex text-[#afafaf] w-[167px]">
                  <span className="mx-auto">Delete</span>
                </div>
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
      {/* </div> */}
    </div>
  );
};
