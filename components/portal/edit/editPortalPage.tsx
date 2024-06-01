"use client";

import React, { FC, useState, useCallback } from "react";
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

export type TItem = {
  id: number;
  name: string;
  imageUrl: string;
};

const testServiceDnd = [
  {
    id: 1,
    name: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    imageUrl: "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
  },
  {
    id: 2,
    name: "ICIT Account",
    imageUrl: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
  },
  {
    id: 3,
    name: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    imageUrl: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
  },
  {
    id: 4,
    name: "บริการซอฟต์แวร์ลิขสิทธ์",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
  },
  {
    id: 5,
    name: "ระบบสารสนเทศเพื่องานทะเบียนนักศึกษา",
    imageUrl: "https://reg.kmutnb.ac.th/registrar/assets/images/logo/logo.png",
  },
  {
    id: 6,
    name: "ICIT Account",
    imageUrl: "https://account.kmutnb.ac.th/web/images/icit_account_logo.png",
  },
  {
    id: 7,
    name: "บริการเครือข่ายโรมมิ่งเพื่อการศึกษาและการวิจัย(eduroam)",
    imageUrl: "http://authen.eduroam.kmutnb.ac.th/images/logo.jpg",
  },
  {
    id: 8,
    name: "บริการซอฟต์แวร์ลิขสิทธ์",
    imageUrl:
      "https://acdserv.kmutnb.ac.th/wp-content/themes/acdserv/images/kmutnb-logo.png",
  },
];

export const EditPortalPage: FC = () => {
  const [items, setItems] = useState<TItem[]>(testServiceDnd);
  const [activeItem, setActiveItem] = useState<TItem>();

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const columns = Math.min(items.length, 7);

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

  // Button save
  // const handleButtonClick = () => {
  //   const itemIds = items.map((item) => item.id)
  //   alert(itemIds)
  // }

  return (
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
            <SortableItem key={item.id} item={item} />
          ))}
        </Grid>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeItem ? <Item item={activeItem} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};
