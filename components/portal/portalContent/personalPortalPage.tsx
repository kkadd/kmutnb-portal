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
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TItem } from "../edit/editPortalPage";

const serviceMock: TItem[] = [
  {
    id: "s1",
    name: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    imageUrl: "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
    type: "service",
  },
  {
    id: "s2",
    name: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    imageUrl: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
    type: "service",
  },
  {
    id: "s3",
    name: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    imageUrl: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
    type: "service",
  },
  {
    id: "s4",
    name: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
    type: "service",
  },
  {
    id: "s5",
    name: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
    type: "service",
  },
  {
    id: "s6",
    name: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    imageUrl: "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
    type: "service",
  },
  {
    id: "s7",
    name: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    imageUrl: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
    type: "service",
  },
  {
    id: "s8",
    name: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    imageUrl: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
    type: "service",
  },
  {
    id: "s9",
    name: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
    type: "service",
  },
  {
    id: "s10",
    name: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
    type: "service",
  },
  {
    id: "s11",
    name: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    imageUrl: "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
    type: "service",
  },
  {
    id: "s12",
    name: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    imageUrl: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
    type: "service",
  },
  {
    id: "s13",
    name: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    imageUrl: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
    type: "service",
  },
  {
    id: "s14",
    name: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
    type: "service",
  },
  {
    id: "10",
    name: "Folder test2",
    serviceLink: "",
    type: "folder",
    contain: [
      {
        id: "s14",
        name: "บริการซอฟต์แวร์ลิขสิทธ์",
        serviceLink: "https://software.kmutnb.ac.th/",
        imageUrl:
          "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
        description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
        type: "service",
      },
    ],
  },
];

export const PersonalPortalPage = () => {
  const router = useRouter();
  const [currentFolder, setCurrentFolder] = useState<TItem | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFolderClick = (folder: TItem) => {
    setCurrentFolder(folder);
    onOpen();
  };

  return (
    <div className="grid p-10 gap-4">
      {serviceMock.length > 0 ? (
        <div className="grid justify-center items-center h-[370px]">
          <div
            className="grid-container grid justify-center items-center gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gridAutoRows: "auto",
            }}
          >
            {serviceMock.map((service) =>
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
                        {service.description}
                      </div>
                    </div>
                  }
                >
                  <Link href={service.serviceLink} isExternal>
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

                      <div className="grid justify-center items-center text-default-700 font-sansThai">
                        {service.name ? service.name.substring(0, 12) : ""}
                      </div>
                    </div>
                  </Link>
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

                  <div className="grid justify-center items-center text-default-700 font-sansThai">
                    {service.name ? service.name.substring(0, 12) : ""}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="grid justify-center items-center gap-4 w-full">
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
          {currentFolder &&
            currentFolder?.contain?.map((containedItem) => (
              <div className="p-4 gap-3" key={currentFolder.id}>
                <ModalHeader>
                  <div className="text-base font-sansThai">
                    {currentFolder.name}
                  </div>
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <div className="flex overflow-x-auto h-[170px]">
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
                              {containedItem.description}
                            </div>
                          </div>
                        }
                      >
                        <Link href={containedItem.serviceLink} isExternal>
                          <div className="grid justify-center items-center gap-2 h-[132px]">
                            <Card
                              className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
                              key={containedItem.id}
                            >
                              <Image
                                src={containedItem.imageUrl}
                                alt="service image"
                                width={90}
                                height={90}
                              />
                            </Card>

                            <div className="grid justify-center items-center text-default-700 font-sansThai">
                              {containedItem.name
                                ? containedItem.name.substring(0, 12)
                                : ""}
                            </div>
                          </div>
                        </Link>
                      </Tooltip>
                    </div>
                  </div>
                </ModalBody>
              </div>
            ))}
        </ModalContent>
      </Modal>
    </div>
  );
};
