"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  Textarea,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import ImageUpload from "./imgUpload";
import ConfirmModal from "../confirm-modal/confirmModal";
import { CloseIcon, WarningIcon } from "../icons";

export const AddServicePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isSelected, setIsSelected] = React.useState(true);
  const [serviceName, setServiceName] = useState("");
  const [serviceLink, setServiceLink] = useState("");
  const [username, setUsername] = useState(session?.user?.name);
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState([""]);
  const [image, setImage] = useState<File | null>(null);
  const [showError, setShowError] = useState(false);

  const duplicateModal = useDisclosure();

  interface UploadResponse {
    message?: string;
    status: number;
    filePath?: string;
  }

  async function handleAddService() {
    if (image == null) {
      setShowError(true);
      return;
    }

    const dupLink = await fetch("/api/management/service/validateLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: serviceLink }),
    });
    if (dupLink.status === 409) {
      duplicateModal.onOpen();
      return;
    }

    let formData = new FormData();
    formData.append("file", image as Blob);
    let imgUploadFetch = await fetch("/api/management/service/imgUpload", {
      method: "POST",
      body: formData,
    });
    const imgUpload = await imgUploadFetch.json();

    fetch("/api/management/service/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceName: serviceName,
        serviceDescription: description,
        serviceImg: (imgUpload as UploadResponse).filePath,
        role: roles,
        serviceLink: serviceLink,
        date: new Date().toISOString(),
        username: username,
        enable: isSelected,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Service added successfully");
          router.push("/management/services");
        } else {
          console.log("Service add failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
                isRequired
                endContent={<CloseIcon />}
                maxLength={100}
                onValueChange={(value) => {
                  setServiceName(value);
                }}
              />

              <Input
                type="url"
                label="Service Link (url)"
                placeholder="Please enter..."
                labelPlacement="outside"
                isClearable
                isRequired
                endContent={<CloseIcon />}
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
                value={username as string}
              />

              <ImageUpload
                onValueChange={(value) => {
                  setImage(value);
                  setShowError(false);
                }}
                required={true}
              />

              {showError && (
                <div className="col-span-3 text-red-500 text-sm">
                  An image is required.
                </div>
              )}

              <Textarea
                type="text"
                label="Description"
                placeholder="Please enter..."
                labelPlacement="outside"
                minRows={6}
                maxLength={200}
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
                  isRequired
                >
                  <div className="grid grid-cols-2 gap-3 w-[357px] h-[76px]">
                    <Checkbox value="student" className="p-0 m-0">
                      Student
                    </Checkbox>

                    <Checkbox value="templecturer" className="p-0 m-0">
                      Temporary Lecturer
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
      <Modal
        className="w-[360px]"
        isOpen={duplicateModal.isOpen}
        onOpenChange={duplicateModal.onOpenChange}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col justify-center items-center gap-3">
            <div className="text-[#FF644B]">
              <WarningIcon />
            </div>
            <div>Service Link Already Exists</div>
          </ModalHeader>
          <ModalBody className="justify-center items-center pt-0">
            <span className="font-sansThai">
              Service link already exists. Please try another link.
            </span>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button
              className="text-[#FF644B] font-medium"
              color="default"
              variant="light"
              onPress={duplicateModal.onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
