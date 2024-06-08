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
  Spinner,
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
  _id: string;
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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [service, setService] = useState<Service[]>([]);

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
    return service.filter((service) =>
      service.serviceName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, service]);

  const [isLoading, setLoading] = useState(true);

  const [targetId, setTargetId] = useState("");

  function delClick(_id: string) {
    setTargetId(_id);
    onOpen();
  }

  function delService() {
    fetch(`/api/management/service/delete?id=${targetId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) {
        setLoading(true);
        fetch("/api/management/service/getServices")
          .then((res) => res.json())
          .then((data) => {
            setService(data);
          });
      }
    });
    onClose();
  }

  useEffect(() => {
    const sorted = [...filteredServices].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.serviceName.localeCompare(b.serviceName);
      } else {
        return b.serviceName.localeCompare(a.serviceName);
      }
    });
    setSortedServices(sorted);
    if (isLoading) {
      fetch("/api/management/service/getServices")
        .then((res) => res.json())
        .then((data) => {
          setService(data);
          console.log(data);
          setLoading(false);
        });
    }
  }, [filteredServices, sortOrder, isLoading]);

  if (isLoading) {
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
  }

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
              onClick={() => router.push("/management/services/add")}
            >
              Add Service
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 grid-flow-row gap-4">
          {sortedServices
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((service) => (
              <Card key={service._id} className="max-w-[400px]" shadow="sm">
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
                      isExternal
                      className="text-sm text-default-500"
                      href={
                        service.serviceLink.startsWith("http://") ||
                        service.serviceLink.startsWith("https://")
                          ? service.serviceLink
                          : `https://${service.serviceLink}`
                      }
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
                    onClick={() =>
                      router.push("/management/services/edit/" + service._id)
                    }
                  >
                    Edit
                  </Button>
                  <Divider orientation="vertical" />
                  <Button
                    className="mx-auto bg-transparent text-[#afafaf] w-full"
                    onPress={(e) => delClick(service._id)}
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
            total={Math.ceil(service.length / itemsPerPage)}
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
        onConfirm={delService}
      />
    </div>
  );
};

export default ServiceManage;
