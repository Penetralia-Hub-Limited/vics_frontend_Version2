"use client";

import React, { useState } from "react";
import DocumentUploader from "@/components/general/upload-document";

const requiredDocs = [
  { key: "policeextract", label: "Police Extract" },
  { key: "courtaffidavit", label: "Court Affidavit" },
  { key: "purchaserecipt", label: "Purchase Receipt" },
  { key: "others", label: "Others" },
];

type UploadsState = {
  [key: string]: File | null;
};

const MultiDocumentUploader = () => {
  const [uploads, setUploads] = useState<UploadsState>({
    idCard: null,
    utilityBill: null,
    passportPhoto: null,
  });

  const handleUpload = (key: string, file: File) => {
    setUploads((prev) => ({ ...prev, [key]: file }));
  };

  return (
    <>
      {requiredDocs.map((doc) => (
        <DocumentUploader
          key={doc.key}
          label={doc.label}
          acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
          uploadedFile={uploads[doc.key]}
          onUpload={(file) => handleUpload(doc.key, file)}
        />
      ))}
    </>
  );
};

export default MultiDocumentUploader;
