import React, { FC, HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TItem } from "./editPortalPage";
import Item from "./Item";

type Props = {
  item: TItem;
  editMode?: boolean;
  setEditMode: (isEditing: boolean) => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({
  item,
  editMode,
  setEditMode,
  onEditClick,
  onDeleteClick,
  ...props
}: Props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id, disabled: editMode });

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
      editMode={editMode}
      setEditMode={setEditMode}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
