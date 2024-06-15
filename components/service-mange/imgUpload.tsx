import { ChangeEvent, useRef, useState, useEffect } from "react";
import { DeleteIcon, UploadIcon } from "../icons";
import { Image } from "@nextui-org/react";

type ImageUploadProps = {
  onValueChange?: (file: File | null) => void;
  defaultValue?: File | null;
  required?: boolean;
};

const ImageUpload = ({
  onValueChange,
  defaultValue,
  required,
}: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(
    defaultValue ? defaultValue : null
  );
  const [fileEnter, setFileEnter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultFileEnter, setDefaultFileEnter] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file !== selectedImage) {
        setSelectedImage(file);
        setFileEnter(true);
        setShowError(false);
      }
    } else {
      setSelectedImage(null);
      setFileEnter(false);
      setShowError(required ? true : false);
    }
  };

  useEffect(() => {
    if (onValueChange) {
      onValueChange(selectedImage);
    }

    if (defaultValue != null && defaultFileEnter == false) {
      setSelectedImage(defaultValue);
      setFileEnter(true);
      setDefaultFileEnter(true);
      setShowError(false);
    }
  }, [selectedImage, onValueChange, defaultValue, fileEnter, defaultFileEnter]);

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setFileEnter(false);
    setShowError(required ? true : false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setFileEnter(true);
      setShowError(false);
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
      {fileEnter ? (
        <div className="h-[162px]">
          <div className="text-sm pr-2 pb-[6px]">Service Image</div>
          <div className="grid justify-center items-center bg-[#F4F4F5] h-[136px] rounded-xl">
            <div className="delete-icon-container" onClick={handleDeleteImage}>
              <DeleteIcon />
            </div>
            <Image
              src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
              alt="Uploaded Image"
              style={{ maxWidth: "357.33px", maxHeight: "136px" }}
              defaultValue={
                defaultValue ? URL.createObjectURL(defaultValue as Blob) : ""
              }
            />
          </div>
        </div>
      ) : (
        <div className="h-[162px]">
          <div className="flex">
            <div className="text-sm pb-[6px]">Service Image</div>
            <div className="text-sm text-danger pb-[6px]">*</div>
          </div>
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
      {required && showError && (
        <div className="text-red-500 text-sm mt-2">An image is required.</div>
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
