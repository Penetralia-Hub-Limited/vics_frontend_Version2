import { useCallback } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

export type DownloadTarget = {
  ref?: React.RefObject<HTMLElement | HTMLDivElement>; // Only for PDFs
  data?: Record<string, any>[]; // Only for XLSX
  sheetName?: string;
  filename: string;
  type: "pdf" | "xlsx";
};

export const useMultiFileDownloader = () => {
  const downloadAsPDF = useCallback(
    async (
      ref: React.RefObject<HTMLElement | HTMLDivElement>,
      filename: string
    ) => {
      const element = ref.current;
      if (!element) return;

      try {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
      } catch (error) {
        console.error("PDF Download Error:", error);
      }
    },
    []
  );

  const downloadAsXLSX = useCallback(
    (data: Record<string, any>[], filename: string, sheetName = "Sheet1") => {
      try {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, filename);
      } catch (error) {
        console.error("XLSX Download Error:", error);
      }
    },
    []
  );

  const downloadMultiple = useCallback(
    async (targets: DownloadTarget[]) => {
      for (const { type, filename, ref, data, sheetName } of targets) {
        if (type === "pdf" && ref) {
          await downloadAsPDF(ref, filename);
        }
        if (type === "xlsx" && data) {
          downloadAsXLSX(data, filename, sheetName);
        }
      }
    },
    [downloadAsPDF, downloadAsXLSX]
  );

  return {
    downloadAsPDF,
    downloadAsXLSX,
    downloadMultiple,
  };
};
