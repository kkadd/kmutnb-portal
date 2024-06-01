"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Switch,
  Textarea,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import ImageUpload from "./imgUpload";
import ConfirmModal from "../confirm-modal/confirmModal";
import { WarningIcon } from "../icons";

export const AddServicePage = () => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isSelected, setIsSelected] = React.useState(false); //enable service
  const [serviceName, setServiceName] = useState("");
  const [serviceLink, setServiceLink] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState([""]);
  const [image, setImage] = useState<File | null>(null);

  /* React.useEffect(() => {
    console.log("Enable :", isSelected);
    console.log("Roles: ", roles);
  }, [isSelected, roles]);
   */

  function handleAddService() {
    console.log("Service Name: ", serviceName);
    console.log("Service Link: ", serviceLink);
    console.log("Description: ", description);
    console.log("Roles: ", roles);
    console.log("Image: ", image);
    console.log("Enable: ", isSelected);
    /* onOpenChange(); */
  }

  return (
    <div>
      <div className="flex flex-col my-6 lg:px-6 max-w-[95rem] mx-auto w-full gap-4">
        <div className="flex justify-start">
          <p className="text-[24px] font-medium">Add Service</p>
        </div>

        <div className="grid p-6 bg-white rounded-lg">
          <form>
            <div className="flex justify-end mb-4">
              <Switch
                color="success"
                classNames={{
                  base: cn(
                    "inline-flex flex-row-reverse w-full max-w-md items-center gap-4"
                  ),
                  wrapper: "mr-0",
                }}
                isSelected={isSelected}
                onValueChange={setIsSelected}
              >
                <div className="flex flex-col justify-end items-end gap-1">
                  <p className="text-medium">Enable Service</p>
                  <p className="text-tiny text-default-400">
                    Enable service to show on services list.
                  </p>
                </div>
              </Switch>
            </div>
            <div className="grid grid-flow-row grid-cols-3 gap-5">
              <Input
                type="text"
                label="Service Name"
                placeholder="Please enter..."
                labelPlacement="outside"
                isClearable
                onValueChange={(value) => {
                  setServiceName(value);
                }}
              />

              <Input
                type="link"
                label="Service Link (url)"
                placeholder="Please enter..."
                labelPlacement="outside"
                isClearable
                onValueChange={(value) => {
                  setServiceLink(value);
                }}
              />

              <Input
                type="text"
                label="Username"
                placeholder="Show who add this service"
                labelPlacement="outside"
                disabled
                value={username}
              />

              <ImageUpload
                onValueChange={(value) => {
                  setImage(value);
                }}
              />

              <Textarea
                type="text"
                label="Description"
                placeholder="Please enter..."
                labelPlacement="outside"
                minRows={6}
                maxLength={240}
                onValueChange={(value) => {
                  setDescription(value);
                }}
              />

              <div>
                <CheckboxGroup
                  classNames={{
                    label: "text-[#11181C] text-[14px] pr-[8px]",
                  }}
                  label="Select Roles"
                  orientation="horizontal"
                  onChange={(values) => {
                    setRoles(values);
                    console.log(values);
                  }}
                >
                  <div className="grid grid-cols-2 gap-3 w-[357px] h-[76px]">
                    <Checkbox value="student" className="p-0 m-0">
                      Student
                    </Checkbox>

                    <Checkbox value="templecturer" className="p-0 m-0">
                      Templecturer
                    </Checkbox>

                    <Checkbox value="exchange_student" className="p-0 m-0">
                      Exchange Student
                    </Checkbox>

                    <Checkbox value="personel" className="p-0 m-0">
                      Personnel
                    </Checkbox>

                    <Checkbox value="alumni" className="p-0 m-0">
                      Alumni
                    </Checkbox>

                    <Checkbox value="retirement" className="p-0 m-0">
                      Retirement
                    </Checkbox>
                  </div>
                </CheckboxGroup>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-11">
              <Button
                className="w-[120px] bg-[#f4f4f5] font-medium"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                className="w-[120px] bg-[#FF644B] text-white font-medium"
                // type="submit"
                onPress={onOpen}
              >
                Add Service
              </Button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal
        icon={<WarningIcon />}
        title="Add Service"
        description="You're going to add this service to service list. Are you sure?"
        textClose="No, Cancel."
        textConfirm="Yes, Add Service."
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={handleAddService}
      />
    </div>
  );
};
