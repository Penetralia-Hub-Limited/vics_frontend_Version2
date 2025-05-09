"use client";

import React, { FC, useRef } from "react";
import { Button } from "../ui/button";

interface DocumentUploaderProps {
  acceptedTypes?: string[];
  maxSizeMB?: number;
  onUpload: (file: File) => void;
  label?: string;
  uploadedFile?: File | null;
}

const DocumentUploader: FC<DocumentUploaderProps> = ({
  acceptedTypes = [".pdf", ".docx", ".jpg", ".jpeg", ".png"],
  maxSizeMB = 5,
  onUpload,
  label = "Upload document",
  uploadedFile,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log("Uploaded ", uploadedFile);

  const handleFile = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    const isAccepted = acceptedTypes.some((type) =>
      file.name.toLowerCase().endsWith(type)
    );

    const isTooBig = file.size > maxSizeMB * 1024 * 1024;

    if (!isAccepted) {
      return alert("File type not supported.");
    }

    if (isTooBig) {
      return alert(`File is too large. Max size is ${maxSizeMB}MB.`);
    }

    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e.dataTransfer.files);
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full text-center cursor-pointer hover:bg-gray-50 transition"
    >
      <div>
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          hidden
          onChange={(e) => handleFile(e.target.files)}
        />
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-xs text-gray-400 mt-1">
          (Accepted: {acceptedTypes.join(", ")} — Max size: {maxSizeMB}MB)
        </p>
        <Button className="my-3" onClick={() => inputRef.current?.click()}>
          Browse Files
        </Button>
      </div>

      <div>
        {uploadedFile && (
          <p className="text-xs mt-2 text-primary-500 font-bold truncate">
            Uploaded: {uploadedFile.name}
          </p>
        )}
      </div>
    </label>
  );
};

export default DocumentUploader;
