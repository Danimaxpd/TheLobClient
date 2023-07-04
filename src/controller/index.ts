import { PDFWrapper, PdfEngineFeatures } from "../interfaces/pdf_interface";
import {
  SOSOPdfEngine,
  OKPdfEngine,
  ALSOOKPdfEngine,
  BETTERPdfEngine,
  BESTPdfEngine,
} from "../engines/";

export function handleLSBNumber(
  lsbNumber: number,
  pathToPDFFile: string
): PDFWrapper {
  let result: PDFWrapper;
  const binaryString = lsbNumber.toString(2).padStart(3, "0");

  const annotationBit = binaryString.charAt(2);
  const encryptionBit = binaryString.charAt(1);
  const searchBit = binaryString.charAt(0);

  const supportsAnnotation = annotationBit === "1";
  const supportsEncryption = encryptionBit === "1";
  const supportsSearch = searchBit === "1";

  let selectedEngineClass;

  if (supportsAnnotation && supportsEncryption && supportsSearch) {
    selectedEngineClass = BESTPdfEngine;
  } else if (supportsAnnotation && !supportsEncryption && supportsSearch) {
    selectedEngineClass = BETTERPdfEngine;
  } else if (!supportsAnnotation && supportsEncryption && !supportsSearch) {
    selectedEngineClass = ALSOOKPdfEngine;
  } else if (!supportsAnnotation && !supportsEncryption && supportsSearch) {
    selectedEngineClass = OKPdfEngine;
  } else {
    selectedEngineClass = SOSOPdfEngine;
  }

  const pdfEngine = new selectedEngineClass();
  pdfEngine.LoadDocument(pathToPDFFile);

  const engineName = pdfEngine.get_Name();
  const availableFeatures: [PdfEngineFeatures] =
    pdfEngine.get_AvailableFeatures();

  result = {
    engineName,
    availableFeatures,
    engine: pdfEngine,
  };

  return result;
}
