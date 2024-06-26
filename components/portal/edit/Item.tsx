import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import { TItem } from "./editPortalPage";
import { Button, Card, Image } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "@/components/icons";

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  item: TItem;
  withOpacity?: boolean;
  isDragging?: boolean;
  editMode?: boolean;
  setEditMode: (isEditing: boolean) => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      item,
      withOpacity,
      isDragging,
      editMode,
      setEditMode,
      onEditClick,
      onDeleteClick,
      style,
      ...props
    },
    ref
  ) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "50% 50%",
      height: "190px",
      width: "140px",
      padding: "10px",
      borderRadius: "10px",
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        <div className="grid justify-center items-center gap-2 h-[170px]">
          <Card
            className="justify-center items-center bg-white p-2 h-[100px] w-[100px]"
            key={item.id}
          >
            {item.type === "service" && (
              <Image
                src={item.imageUrl}
                alt={`${item.id}`}
                width={90}
                height={90}
              />
            )}

            {item.type === "folder" && (
              <Image
                src="/serviceFolder.svg"
                alt={`${item.id}`}
                width={90}
                height={90}
              />
            )}
          </Card>

          <div className="grid justify-center items-center text-default-700 font-sansThai">
            {item.name.substring(0, 12)}
          </div>

          <div className="flex justify-center items-center gap-2">
            <>
              <Button
                isIconOnly
                className="bg-transparent text-[#afafaf]"
                onPress={onEditClick}
                style={{
                  display: item.type == "folder" ? "show" : "none",
                }}
              >
                <EditIcon />
              </Button>
            </>

            <Button
              isIconOnly
              className="bg-transparent text-[#afafaf]"
              onPress={onDeleteClick}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

Item.displayName = "Item";

export default Item;
