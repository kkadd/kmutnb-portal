import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { AddIcon, ArrowRightIcon, BookIcon, HelpIcon } from "../icons";

const serviceMock = [
  {
    id: "s1",
    serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    serviceImg:
      "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
  },
  {
    id: "s2",
    serviceName: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    serviceImg: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
  },
  {
    id: "s3",
    serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
  },
  {
    id: "s4",
    serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
  },
  {
    id: "s5",
    serviceName: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
  },
  {
    id: "s6",
    serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    serviceImg:
      "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
  },
  {
    id: "s7",
    serviceName: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    serviceImg: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
  },
  {
    id: "s8",
    serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
  },
  {
    id: "s9",
    serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
  },
  {
    id: "s10",
    serviceName: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
  },
  {
    id: "s11",
    serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    serviceImg:
      "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
  },
  {
    id: "s12",
    serviceName: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    serviceImg: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
  },
  {
    id: "s13",
    serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
  },
  {
    id: "s14",
    serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
  },
];

const recentlyServiceMock = [
  {
    id: "r1",
    serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    serviceImg:
      "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
  },
  {
    id: "r2",
    serviceName: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    serviceImg: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
  },
  {
    id: "r3",
    serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
  },
  {
    id: "r4",
    serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
  },
  {
    id: "r5",
    serviceName: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
  },
];

const frequencyServiceMock = [
  {
    id: "f10",
    serviceName: "กองบริการการศึกษา",
    serviceLink: "https://acdserv.kmutnb.ac.th/home",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "",
  },
  {
    id: "f11",
    serviceName: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "https://reg.kmutnb.ac.th/registrar/home",
    serviceImg:
      "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    description:
      "ใช้สำหรับลงทะเบียนเรียน, ดูผลการเรียน, แจ้งจบ และบริการงานทะเบียนต่าง ๆ",
  },
  {
    id: "f12",
    serviceName: "ICIT Account",
    serviceLink: "https://account.kmutnb.ac.th/web/",
    serviceImg: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    description:
      "เปิดใช้งานบัญชีนักศึกษา, ระบบกู้รหัสผ่าน, ปลดล็อกบัญชีด้วยแอปพลิเคชัน ThaID.",
  },
  {
    id: "f13",
    serviceName: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "http://authen.eduroam.kmutnb.ac.th/",
    serviceImg: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    description: "",
  },
  {
    id: "f14",
    serviceName: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "https://software.kmutnb.ac.th/",
    serviceImg:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    description: "บริการซอฟต์แวร์ลิขสิทธิ์เพื่อนักศึกษา และบุคลากร",
  },
];

export const PortalPage = () => {
  return (
    <div className="grid p-10 gap-4">
      <div className="relative z-50 flex justify-end ">
        <Popover placement="left" showArrow={true} backdrop="opaque">
          <PopoverTrigger>
            <Button isIconOnly className="bg-transparent">
              <HelpIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 font-sansThai w-[300px]">
              <div className="flex justify-center items-center text-base font-bold">
                <BookIcon />
                &nbsp;คู่มือการใช้งาน
              </div>
              <div className="text-sm mt-2">
                หากต้องการเพิ่มบริการออนไลน์มาไว้ที่หน้า personal portal
                สามารถทำได้โดย
                <ul>
                  <li className="flex items-center">
                    1. ไปที่หน้า <ArrowRightIcon /> All Services
                  </li>
                  <li className="flex items-center">
                    2. ค้นหาบริการที่ต้องการ คลิ๊กที่ <AddIcon />
                    เพื่อเพิ่มบริการ
                  </li>
                  <li className="ml-4">มาที่หน้า Personal Portal</li>
                  <li>
                    3. หากต้องการแก้ไขลำดับ สามารถคลิ๊กที่ปุ่ม Edit
                    เพื่อเข้าสู่หน้าการแก้ไข
                  </li>
                </ul>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid justify-center items-center mt-[-32px] h-[370px]">
        <div
          className="grid-container grid justify-center items-center gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gridAutoRows: "auto",
          }}
        >
          {serviceMock.map((service) => (
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
              <Link href={service.serviceLink}>
                <div className="grid justify-center items-center gap-2 h-[132px] z-10">
                  <Card
                    className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
                    key={service.id}
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

      <div className="grid grid-cols-2 gap-4">
        <Card shadow="sm" className="h-[210px]">
          <CardHeader className="text-lg font-medium ">Recently</CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-5 justify-start items-center gap-8">
              {recentlyServiceMock.map((service) => (
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
                  <Link href={service.serviceLink}>
                    <div className="grid justify-center items-center gap-2 h-[132px]">
                      <Card
                        className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
                        key={service.id}
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
          </CardBody>
        </Card>
        <Card shadow="sm" className="h-[210px]">
          <CardHeader className="font-medium text-lg">Frequency</CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-5 justify-start items-center gap-8">
              {frequencyServiceMock.map((service) => (
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
                  <Link href={service.serviceLink}>
                    <div className="grid justify-center items-center gap-2 h-[132px]">
                      <Card
                        className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
                        key={service.id}
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
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
