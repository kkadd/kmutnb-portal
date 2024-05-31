"use client";

import React from "react";
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
  const [isSelected, setIsSelected] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              />

              <Input
                type="link"
                label="Service Link (url)"
                placeholder="Please enter..."
                labelPlacement="outside"
                isClearable
              />

              <Input
                type="text"
                label="Username"
                placeholder="Please enter..."
                labelPlacement="outside"
                disabled
              />

              <ImageUpload />

              <Textarea
                type="text"
                label="Description"
                placeholder="Please enter..."
                labelPlacement="outside"
                minRows={6}
                maxLength={240}
              />

              <div>
                <CheckboxGroup
                  classNames={{
                    label: "text-[#11181C] text-[14px] pr-[8px]",
                  }}
                  label="Select Roles"
                  orientation="horizontal"
                >
                  <div className="grid grid-cols-2 gap-3 w-[357px] h-[76px]">
                    <Checkbox value="Student" className="p-0 m-0">
                      Student
                    </Checkbox>

                    <Checkbox value="Special Teacher" className="p-0 m-0">
                      Special Teacher
                    </Checkbox>

                    <Checkbox value="Exchange Student" className="p-0 m-0">
                      Exchange Student
                    </Checkbox>

                    <Checkbox value="Personnel" className="p-0 m-0">
                      Personnel
                    </Checkbox>

                    <Checkbox value="Alumni" className="p-0 m-0">
                      Alumni
                    </Checkbox>

                    <Checkbox value="Retiree" className="p-0 m-0">
                      Retiree
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
      /* onConfirm={handleDeleteService} */
      />
    </div>
  );
};
