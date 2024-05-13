import { ChangeEvent, useRef, useState } from "react";
import { DeleteIcon, UploadIcon } from "../icons";
import { Image } from "@nextui-org/react";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // note to fix : เลือก A แล้วลบ พอกลับมาเลือก A จะไม่แสดงผล แต่ถ้าเลือก B แล้วกลับมาเลือก A จะแสดงผลปกติ
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file !== originalFile) {
        setSelectedImage(file);
        setOriginalFile(file);
      }
    } else {
      setSelectedImage(null);
      setOriginalFile(null);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleTextareaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      {selectedImage ? (
        <div className="h-[162px]">
          <div className="text-sm pr-2 pb-[6px]">Service Image</div>
          <div className="grid justify-center items-center bg-[#F4F4F5] h-[136px] rounded-xl">
            <div className="delete-icon-container" onClick={handleDeleteImage}>
              <DeleteIcon />
            </div>
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded Image"
              style={{ maxWidth: "357.33px", maxHeight: "136px" }}
            />
          </div>
        </div>
      ) : (
        <div className="h-[162px]">
          <div className="text-sm pr-2 pb-[6px]">Service Image</div>
          <div
            className="grid justify-center items-center bg-[#F4F4F5] h-[136px] rounded-xl"
            onClick={handleTextareaClick}
          >
            <div className="flex flex-col items-center gap-2">
              <span>
                <UploadIcon />
              </span>
              <span className="text-sm text-[#71717A]">
                Click or Drop you image here
              </span>
            </div>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
