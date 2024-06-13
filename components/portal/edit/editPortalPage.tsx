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
import { AddIcon, CloseIcon, DeleteIcon } from "@/components/icons";
import { useSession } from "next-auth/react";

import { LoadingCustom } from "@/components/Loading/loadingCustom";

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

const testServiceDnd = [
  {
    id: "1",
    name: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "",
    imageUrl: "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    type: "service",
  },
  {
    id: "2",
    name: "ICIT Account",
    serviceLink: "",
    imageUrl: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    type: "service",
  },
  {
    id: "3",
    name: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "",
    imageUrl: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    type: "service",
  },
  {
    id: "4",
    name: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    type: "service",
  },
  {
    id: "5",
    name: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    serviceLink: "",
    imageUrl: "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
    type: "service",
  },
  {
    id: "6",
    name: "ICIT Account",
    serviceLink: "",
    imageUrl: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
    type: "service",
  },
  {
    id: "7",
    name: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    serviceLink: "",
    imageUrl: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
    type: "service",
  },
  {
    id: "8",
    name: "บริการซอฟต์แวร์ลิขสิทธ์",
    serviceLink: "",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
    type: "service",
  },
  {
    id: "9",
    name: "Folder test",
    serviceLink: "",
    type: "folder",
    contain: [
      {
        id: "91",
        name: "test contain",
        serviceLink: "",
        imageUrl:
          "https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/1675/1715415371675-i",
        type: "service",
      },
    ],
  },
  {
    id: "10",
    name: "Folder test2",
    serviceLink: "",
    type: "folder",
    contain: [
      {
        id: "101",
        name: "test contain2",
        serviceLink: "",
        imageUrl:
          "https://miro.medium.com/v2/resize:fit:720/0*I32LiwMMYY16sPAB.jpg",
        type: "service",
      },
    ],
  },
];

export const EditPortalPage: FC = () => {
  const router = useRouter();

  const [items, setItems] = useState<TItem[]>([]);
  const [activeItem, setActiveItem] = useState<TItem>();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user?.name);

  const [currentFolder, setCurrentFolder] = useState<TItem | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const columns = Math.min(items.length, 7);
  const editFolderModal = useDisclosure();

  const [isLoading, setIsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(items.find((item) => item.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeItem = items.find((item) => item.id === active.id);
    const overItem = items.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setItems((prev) => arrayMove<TItem>(prev, activeIndex, overIndex));
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
      const folder = items.find((item) => item.id === id);
      if (folder) {
        setCurrentFolder(folder);
        editFolderModal.onOpen();
      }
    },
    [editFolderModal, items]
  );

  function handleEditModalClose() {
    if (currentFolder) {
      setItems((prevItems) =>
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
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleDeleteFolderItemClick = (id: string) => {
    setCurrentFolder((prev) => {
      if (prev) {
        const updatedContain =
          prev.contain?.filter((item) => item.id !== id) || [];

        const deletedItem = prev.contain?.find((item) => item.id === id);
        if (deletedItem) {
          setItems((prevItems) => {
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
        const addedItem = items.find((item) => item.id === id);
        if (addedItem) {
          setItems((prevItems) =>
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
    setItems((prevItems) => [...prevItems, newFolder]);
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
          setItems(data);
          setItemsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setItemsLoading(false);
        });
    }
    if (!itemsLoading && !sessionLoading) {
      setIsLoading(false);
    }
  }, [
    isLoading,
    itemsLoading,
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
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <Grid columns={columns}>
              {items.map((item) => (
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
                // type="submit"
                // onPress={onOpen}
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
                  value={currentFolder?.name || ""}
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
                  {items
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
    </>
  );
};
