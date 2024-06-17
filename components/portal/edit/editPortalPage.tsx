"use client";

import React, { FC, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Card,
  Image,
  Divider,
} from "@nextui-org/react";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Grid from "./Grid";
import SortableItem from "./SortableItem";
import Item from "./Item";
import {
  AddIcon,
  CloseIcon,
  DeleteIcon,
  WarningIcon,
} from "@/components/icons";
import { useSession } from "next-auth/react";

import { LoadingCustom } from "@/components/Loading/loadingCustom";
import ConfirmModal from "@/components/confirm-modal/confirmModal";

export interface ServiceShortcut {
  id: string;
  name: string;
  serviceLink: string;
  imageUrl?: string;
  description?: string;
  type: string;
}

export type TItem = {
  id: string;
  name: string;
  serviceLink: string;
  imageUrl?: string;
  description?: string;
  type: string;
  contain?: ServiceShortcut[];
};

export const EditPortalPage: FC = () => {
  const router = useRouter();

  const [portal, setPortal] = useState<TItem[]>([]);
  const [activeItem, setActiveItem] = useState<TItem>();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user?.name);

  const [currentFolder, setCurrentFolder] = useState<TItem | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const columns = Math.min(portal.length, 7);
  const editFolderModal = useDisclosure();
  const editConfirmModal = useDisclosure();

  const [isLoading, setIsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(true);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(portal.find((item) => item.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeItem = portal.find((item) => item.id === active.id);
    const overItem = portal.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = portal.findIndex((item) => item.id === active.id);
    const overIndex = portal.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setPortal((prev) => arrayMove<TItem>(prev, activeIndex, overIndex));
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  const handleEditMode = (isEditing: boolean) => {
    setIsEditMode(isEditing);
  };

  const handleEditClick = useCallback(
    (id: string) => {
      const folder = portal.find((item) => item.id === id);
      if (folder) {
        setCurrentFolder(folder);
        editFolderModal.onOpen();
      }
    },
    [editFolderModal, portal]
  );

  function handleEditModalClose() {
    if (currentFolder) {
      setPortal((prevItems) =>
        prevItems.map((item) =>
          item.id === currentFolder.id ? currentFolder : item
        )
      );
    }
    editFolderModal.onClose();
    setCurrentFolder(null);
    setIsEditMode(false);
  }

  const handleDeleteItemClick = (id: string) => {
    setPortal((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleDeleteFolderItemClick = (id: string) => {
    setCurrentFolder((prev) => {
      if (prev) {
        const updatedContain =
          prev.contain?.filter((item) => item.id !== id) || [];

        const deletedItem = prev.contain?.find((item) => item.id === id);
        if (deletedItem) {
          setPortal((prevItems) => {
            const itemExists = prevItems.some(
              (item) => item.id === deletedItem.id
            );
            if (!itemExists) {
              return [...prevItems, deletedItem];
            }
            return prevItems;
          });
        }

        return { ...prev, contain: updatedContain };
      }
      return prev;
    });
  };

  const handleAddItemClick = (id: string) => {
    setCurrentFolder((prev) => {
      if (prev) {
        const addedItem = portal.find((item) => item.id === id);
        if (addedItem) {
          setPortal((prevItems) =>
            prevItems.filter((item) => item.id !== addedItem.id)
          );
          return {
            ...prev,
            contain: [...(prev.contain || []), addedItem],
          };
        }
      }
      return prev;
    });
  };

  const handleAddFolderClick = () => {
    const newFolder = {
      id: Date.now().toString(),
      name: "New Folder",
      serviceLink: "",
      type: "folder",
      contain: [],
    };
    setPortal((prevItems) => [...prevItems, newFolder]);
  };

  const handleEditPortal = async () => {
    fetch("/api/portal/personal/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        data: portal,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Your Portal update successfully");
          editConfirmModal.onClose();
          router.push("/kmutnb-portal");
        } else {
          console.log("Your Portal update failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          setPortal(data);
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
    <>
      <div className="flex justify-end items-center h-[600px] mr-4">
        <div className="flex-none flex flex-col items-center gap-2 p-2">
          <div className="relative z-10 p-2 flex justify-center items-center h-[90px] w-[90px]">
            <Card className="justify-center items-center w-full h-full">
              <Image
                src="/serviceFolder.svg"
                alt="add folder"
                width={55}
                height={55}
              />
            </Card>
            <Button
              isIconOnly
              className="absolute z-50 bg-[#9edd56] top-0 right-0 rounded-full text-white h-[40px] w-[40px]"
              onClick={handleAddFolderClick}
            >
              <AddIcon />
            </Button>
          </div>
          <div className="flex justify-center items-center text-default-700 font-sansThai">
            Add Folder
          </div>
        </div>
      </div>

      <div className="mt-[-600px]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={portal} strategy={rectSortingStrategy}>
            <Grid columns={columns}>
              {portal.map((item) => (
                <>
                  <SortableItem
                    key={item.id}
                    item={item}
                    editMode={isEditMode}
                    setEditMode={handleEditMode}
                    onEditClick={() => handleEditClick(item.id)}
                    onDeleteClick={() => handleDeleteItemClick(item.id)}
                  />
                </>
              ))}
            </Grid>

            <div className="flex justify-center gap-4 mt-11">
              <Button
                className="w-[120px] bg-[#f4f4f5] font-medium"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                className="w-[120px] bg-[#FF644B] text-white font-medium"
                type="submit"
                onPress={editConfirmModal.onOpen}
              >
                Save Edit
              </Button>
            </div>
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {activeItem ? (
              <Item item={activeItem} isDragging setEditMode={setIsEditMode} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <Modal isOpen={editFolderModal.isOpen} onClose={handleEditModalClose}>
        <ModalContent>
          {() => (
            <div className="p-4 gap-3">
              <ModalHeader>
                <Input
                  type="text"
                  classNames={{ input: "font-sansThai" }}
                  variant="bordered"
                  label="Folder Name"
                  labelPlacement="outside"
                  placeholder="Enter Folder Name"
                  isClearable
                  endContent={<CloseIcon />}
                  defaultValue={currentFolder?.name || ""}
                  onChange={(e) =>
                    setCurrentFolder((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                />
              </ModalHeader>
              <ModalBody>
                <div className="flex overflow-x-auto h-[170px]">
                  {currentFolder?.contain?.map((containedItem) => (
                    <div
                      key={containedItem.id}
                      className="flex-none flex flex-col items-center gap-2 p-2"
                    >
                      {/* in folder */}
                      <div className="relative z-10 bg-white p-2 flex justify-center items-center h-[100px] w-[100px]">
                        <Card className="justify-center items-center w-full h-full">
                          <Image
                            src={containedItem.imageUrl}
                            alt={`${containedItem.id}`}
                            width={90}
                            height={90}
                          />
                        </Card>
                        <Button
                          isIconOnly
                          className="absolute z-50 bg-red-400 top-0 right-0 rounded-full text-white h-[40px] w-[40px]"
                          onClick={() =>
                            handleDeleteFolderItemClick(containedItem.id)
                          }
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                      <div className="flex justify-center items-center text-default-700 font-sansThai">
                        {containedItem.name.substring(0, 12)}
                      </div>
                    </div>
                  ))}
                </div>

                <Divider />
                <div className="font-medium">All services in your portal</div>
                <div className="flex overflow-x-auto h-[170px]">
                  {portal
                    .filter(
                      (item) =>
                        item.id !== currentFolder?.id && item.type !== "folder"
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex-none flex flex-col items-center gap-2 p-2"
                      >
                        {/* all item in portal */}
                        <div className="relative z-10 bg-white p-2 flex justify-center items-center h-[100px] w-[100px]">
                          <Card className="justify-center items-center w-full h-full">
                            <Image
                              src={item.imageUrl}
                              alt={`${item.id}`}
                              width={90}
                              height={90}
                            />
                          </Card>
                          <Button
                            isIconOnly
                            className="absolute z-50 bg-[#9edd56] top-0 right-0 rounded-full text-white h-[40px] w-[40px]"
                            onClick={() => handleAddItemClick(item.id)}
                          >
                            <AddIcon />
                          </Button>
                        </div>
                        <div className="flex justify-center items-center text-default-700 font-sansThai">
                          {item.name.substring(0, 12)}
                        </div>
                      </div>
                    ))}
                </div>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
      <ConfirmModal
        icon={<WarningIcon />}
        title="Save Your Edit"
        description="You're going to save this data to your portal?"
        textClose="Cancel"
        textConfirm="Save"
        isOpen={editConfirmModal.isOpen}
        onOpenChange={editConfirmModal.onOpenChange}
        onConfirm={handleEditPortal}
      />
    </>
  );
};
