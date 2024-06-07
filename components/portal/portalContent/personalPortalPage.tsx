import { Card, Divider, Link, Tooltip, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const serviceMock: any[] = [
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

export const PersonalPortalPage = () => {
  const router = useRouter();

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
            >
              All service
            </Link>
            <div>&nbsp;และบริการที่คุณเพิ่มจะปรากฏที่นี่</div>
          </div>
        </div>
      )}
    </div>
  );
};
