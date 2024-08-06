import {
  Card,
  Divider,
  Link,
  Tooltip,
  Image,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TItem } from "../edit/editPortalPage";
import { useSession } from "next-auth/react";

import { LoadingCustom } from "@/components/Loading/loadingCustom";
import { HistoryAddFunction } from "@/components/historyAddFunc/historyAddFunc";
import { InfoIcon } from "@/components/icons";

export const PersonalPortalPage = () => {
  const router = useRouter();
  const [currentFolder, setCurrentFolder] = useState<TItem | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [service, setService] = useState<TItem[]>([]);
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user?.name);

  const [isLoading, setIsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(true);

  const colServiveLength = (length: number) => {
    switch (length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      case 7:
        return "grid-cols-7";
      default:
        return "grid-cols-7";
    }
  };

  const handleFolderClick = (folder: TItem) => {
    setCurrentFolder(folder);
    onOpen();
  };

  useEffect(() => {
    if (isLoading) {
      setUsername(session?.user?.name);
      setSessionLoading(false);
    }
    if (isLoading && !sessionLoading) {
      fetch("/api/portal/personal/getPortal?username=" + username, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setService(data);
          setPortalLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setPortalLoading(false);
        });
    }
    if (!portalLoading && !sessionLoading) {
      setIsLoading(false);
    }
  }, [
    isLoading,
    portalLoading,
    session?.user.account_type,
    session?.user?.name,
    sessionLoading,
    username,
  ]);

  if (isLoading) return <LoadingCustom />;

  return (
    <div className="grid p-10 gap-4">
      {service.length > 0 ? (
        <div className="grid justify-center items-center h-[370px]">
          <div
            className={`grid-container grid justify-center items-center gap-8 ${colServiveLength(
              service.length
            )} max-sm:grid-cols-2`}
          >
            {service.map((service) =>
              service.type === "service" ? (
                <Tooltip
                  key={service.id}
                  content={
                    <div className="grid gap-4 p-4">
                      <div className="font-sansThai font-medium">
                        {service.name}
                      </div>
                      <Divider />
                      <div className="text-default-500 font-sansThai">
                        {service.description
                          ?.split(/(?:\r\n|\r|\n)/g)
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
                  <div className="relative flex-none flex flex-col items-center gap-2 p-2">
                    <Popover placement="top" showArrow={true}>
                      <PopoverTrigger>
                        <Button
                          isIconOnly
                          className="absolute z-50 bg-[#e3e3e3] -top-2 right-0 rounded-full text-white h-[40px] w-[40px] sm:hidden"
                        >
                          <InfoIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="grid gap-4 p-4">
                          <div className="font-sansThai font-medium">
                            {service.name}
                          </div>
                          <Divider />
                          <div className="text-default-500 font-sansThai">
                            {service.description
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
                    <Link
                      href={service.serviceLink}
                      isExternal
                      onPress={() =>
                        HistoryAddFunction(service.id, username ? username : "")
                      }
                    >
                      <div className="grid justify-center items-center gap-2 h-[132px]">
                        <Card
                          className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
                          key={service.id}
                        >
                          <Image
                            src={service.imageUrl}
                            alt="service image"
                            width={90}
                            height={90}
                          />
                        </Card>
                        <div className="grid justify-center items-center text-default-700 font-sansThai md:text-base">
                          {service.name ? service.name.substring(0, 12) : ""}
                        </div>
                      </div>
                    </Link>
                  </div>
                </Tooltip>
              ) : (
                <div
                  className="grid justify-center items-center gap-2 h-[132px]"
                  key={service.id}
                >
                  <Card
                    className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
                    key={service.id}
                    isPressable
                    onPress={() => handleFolderClick(service)}
                  >
                    <Image
                      src="/serviceFolder.svg"
                      alt={`${service.id}`}
                      width={90}
                      height={90}
                    />
                  </Card>

                  <div className="grid justify-center items-center text-default-700 font-sansThai md:text-base">
                    {service.name ? service.name.substring(0, 12) : ""}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="grid justify-center items-center gap-4 w-full text-center">
          <Image src="/chill.svg" alt="empty image" height={300} width={500} />
          <div className="grid justify-center items-center text-2xl font-sansThai">
            ยังไม่มีบริการในพอร์ทัลของคุณ
          </div>
          <div className="flex justify-center items-center text-lg font-sansThai">
            <div>คุณสามารถเพิ่มบริการได้ที่หน้า&nbsp;</div>
            <Link
              className="text-[#FF644B] cursor-pointer"
              onClick={() => router.push("/kmutnb-portal/all-services")}
              isExternal
            >
              All service
            </Link>
            <div>&nbsp;และบริการที่คุณเพิ่มจะปรากฏที่นี่</div>
          </div>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          {currentFolder && (
            <>
              <ModalHeader>
                <div className="text-base font-sansThai">
                  {currentFolder.name}
                </div>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="flex overflow-x-auto h-[170px]">
                  {currentFolder?.contain?.map((containedItem) => (
                    <div
                      key={containedItem.id}
                      className="flex-none flex flex-col items-center gap-2 p-2"
                    >
                      <Tooltip
                        key={containedItem.id}
                        content={
                          <div className="grid gap-4 p-4">
                            <div className="font-sansThai font-medium">
                              {containedItem.name}
                            </div>
                            <Divider />
                            <div className="text-default-500 font-sansThai">
                              {containedItem.description
                                ?.split(/(?:\r\n|\r|\n)/g)
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
                        <Link
                          href={containedItem.serviceLink}
                          isExternal
                          onPress={() =>
                            HistoryAddFunction(
                              containedItem.id,
                              username ? username : ""
                            )
                          }
                        >
                          <div className="grid justify-center items-center gap-2 h-[132px]">
                            <Card
                              className="justify-center items-center bg-white p-2 h-[100px] w-[100px] md:h-[120px] md:w-[120px]"
                              key={containedItem.id}
                            >
                              <Image
                                src={containedItem.imageUrl}
                                alt="service image"
                                width={90}
                                height={90}
                              />
                            </Card>

                            <div className="grid justify-center items-center text-default-700 font-sansThai md:text-base">
                              {containedItem.name
                                ? containedItem.name.substring(0, 12)
                                : ""}
                            </div>
                          </div>
                        </Link>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
