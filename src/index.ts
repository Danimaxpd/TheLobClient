import { handleLSBNumber } from "./controller";
import { PDFWrapper } from "./interfaces/pdf_interface";

/**
 *
 * @param {string} pathToPDFFile - The path to a pdf file
 * @param {number} fileInfo - A binary represenation of the attributes required to render the PDF.
 * You can choose which LSB represents which characteristic (annotation, encryption, search)
 * @returns {PDFWrapper} - A PDFWrapper that wraps a selected PDF rendering engine
 */
export function renderPDF(pathToPDFFile: string, fileInfo: number): PDFWrapper {
  return handleLSBNumber(fileInfo, pathToPDFFile);
}

// Feel free to use or remove this run function
function run() {
  console.info("--RUN--");
  const fileInfoByte = 0b111;
  const pathToPDFFile = "./example.pdf";
  const pdf = renderPDF(pathToPDFFile, fileInfoByte);
  console.info("Loaded fake PDF -->", pdf);
}
console.info("******The Lob Client******");
run();
