/**
 * Implement this interface. 
 * Engine name is just an example, feel free to structure this as you see fit
 */ 
interface PDFWrapper {
  engineName: string;
}

/**
 * 
 * @param {string} pathToPDFFile - The path to a pdf file
 * @param {number} fileInfo - A binary represenation of the attributes required to render the PDF.
 * You can choose which LSB represents which characteristic (annotation, encryption, search)
 * @returns {PDFWrapper} - A PDFWrapper that wraps a selected PDF rendering engine
 */
export function renderPDF(pathToPDFFile: string, fileInfo: number): PDFWrapper {
  // Implementation goes here. You can leave it in this file or move it elsewhere

  const pdfWrapper: PDFWrapper = {
    engineName: 'SoSoPDFEngine'
  };
  console.log({pdfWrapper});
  return pdfWrapper;
}

// Feel free to use or remove this run function
function run() {
  const fileInfoByte = 0b111;
  const pathToPDFFile = './example.pdf';
  renderPDF(pathToPDFFile, fileInfoByte);
}

run();