import React, { FC, HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TItem } from "./editPortalPage";
import Item from "./Item";
// import Item, { ItemProps } from "./Item";

type Props = {
  item: TItem;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ item, ...props }: Props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      item={item}
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
