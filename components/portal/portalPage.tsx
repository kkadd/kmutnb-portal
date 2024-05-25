import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export const PortalPage = () => {
  return (
    <div className="grid p-10 gap-4">
      <div className="grid bg-red-200 text-center h-[400px]">DND Zone</div>
      <div className="grid grid-cols-2 gap-4">
        <Card shadow="none" className="h-[200px]">
          <CardHeader className="font-medium text-lg">Recently</CardHeader>
          <Divider />
          <CardBody>test</CardBody>
        </Card>
        <Card shadow="none" className="h-[200px]">
          <CardHeader className="font-medium text-lg">Frequency</CardHeader>
          <Divider />
          <CardBody>test</CardBody>
        </Card>
      </div>
    </div>
  );
};
