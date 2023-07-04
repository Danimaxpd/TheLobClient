/**
 * Add additional unit tests here to ensure your code works properly for all use cases.
 * Feel free to adjust the structure of tests as suites your needs.
 *
 * You do NOT need to test actually opening or manipulating a PDF document. Testing mock responses is perfect
 */
import { renderPDF } from "../src/index";
import {
  PDFWrapper,
  BESTPdfEngineInterface,
  SOSOPdfEngineInterface,
  OKPdfEngineInterface,
  ALSOOKPdfEngineInterface,
  BETTERPdfEngineInterface,
} from "../src/interfaces/pdf_interface";
import {
  SOSOPdfEngine,
  OKPdfEngine,
  ALSOOKPdfEngine,
  BETTERPdfEngine,
  BESTPdfEngine,
} from "../src/engines/";

describe("renderPDF", () => {
  it("chooses the BestPDFEngine if the file requires Annotation, Encryption, and Search", () => {
    const fileInfoByte = 0b111;
    const pathToPDFFile = "./example.pdf";
    const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual("BESTPDFENGINE");
    expect(pdfWrapper.engine).toBeInstanceOf(BESTPdfEngine);
  });

  it("chooses the BETTERPdfEngine if the file requires Annotation and Search, but not Encryption", () => {
    const fileInfoByte = 0b101;
    const pathToPDFFile = "./example.pdf";
    const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual("BETTERPDFENGINE");
    expect(pdfWrapper.engine).toBeInstanceOf(BETTERPdfEngine);
  });

  it("chooses the ALSOOKPdfEngine if the file requires Encryption/Decryption but not Annotation or Search", () => {
    const fileInfoByte = 0b010;
    const pathToPDFFile = "./example.pdf";
    const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual("ALSOOKPDFENGINE");
    expect(pdfWrapper.engine).toBeInstanceOf(ALSOOKPdfEngine);
  });

  it("chooses the OKPdfEngine if the file requires Search but not Annotation or Encryption/Decryption", () => {
    const fileInfoByte = 0b100;
    const pathToPDFFile = "./example.pdf";
    const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual("OKPDFENGINE");
    expect(pdfWrapper.engine).toBeInstanceOf(OKPdfEngine);
  });

  it("chooses the SOSOPdfEngine if the file requires none of the supported features", () => {
    const fileInfoByte = 0b000;
    const pathToPDFFile = "./example.pdf";
    const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
    expect(pdfWrapper.engineName).toEqual("SOSOPDFENGINE");
    expect(pdfWrapper.engine).toBeInstanceOf(SOSOPdfEngine);
  });

  describe("Test the supported operations base on fileInfoByte", () => {
    // BestPDFEngine
    it("chooses BestPDFEngine", () => {
      const fileInfoByte = 0b111;
      const pathToPDFFile = "./example.pdf";
      const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
      const pdfEngine = pdfWrapper.engine as BESTPdfEngineInterface;
      expect(pdfWrapper.engineName).toEqual("BESTPDFENGINE");
      expect(pdfEngine.LoadDocument).toBeDefined();
      expect(pdfEngine.GetPageCount).toBeDefined();
      expect(pdfEngine.GetPageSize).toBeDefined();
      expect(pdfEngine.SaveAs).toBeDefined();
      expect(pdfEngine.CloseDocument).toBeDefined();
      expect(pdfEngine.RenderPage).toBeDefined();
      // features
      if ("addAnnotation" in pdfEngine) {
        expect(pdfEngine.addAnnotation).toBeDefined();
        expect(pdfEngine.addAnnotation()).toMatchInlineSnapshot(
          `"Annotation added"`
        );
      }
      if ("encryptDecrypt" in pdfEngine) {
        expect(pdfEngine.encryptDecrypt).toBeDefined();
        expect(pdfEngine.encryptDecrypt()).toMatchInlineSnapshot(
          `"Encryption/Decryption performed"`
        );
      }
      if ("granularSearch" in pdfEngine) {
        expect(pdfEngine.granularSearch).toBeDefined();
        expect(pdfEngine.granularSearch()).toMatchInlineSnapshot(
          `"Granular search performed"`
        );
      }
      // Main
      expect(pdfEngine.LoadDocument(pathToPDFFile)).toEqual(
        `PDF loaded in: ${pathToPDFFile}`
      );
      expect(pdfEngine.GetPageCount()).toBeGreaterThan(0);
      expect(pdfEngine.GetPageSize()).toBeGreaterThan(0);
      expect(pdfEngine.SaveAs("documentFile")).toMatchInlineSnapshot(
        `"Saved as documentFile"`
      );
      expect(pdfEngine.SaveAs("memoryBuffer")).toMatchInlineSnapshot(
        `"Saved as memoryBuffer"`
      );
      expect(pdfEngine.CloseDocument()).toMatchInlineSnapshot(`"PDF closed"`);
      expect(pdfEngine.RenderPage()).toMatchInlineSnapshot(
        `"The PDF Page it is rendered"`
      );
    });
    // BETTERPDFENGINE
    it("chooses BETTERPDFENGINE", () => {
      const fileInfoByte = 0b101;
      const pathToPDFFile = "./example.pdf";
      const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
      const pdfEngine = pdfWrapper.engine as BETTERPdfEngineInterface;
      expect(pdfWrapper.engineName).toEqual("BETTERPDFENGINE");
      expect(pdfEngine.LoadDocument).toBeDefined();
      expect(pdfEngine.GetPageCount).toBeDefined();
      expect(pdfEngine.GetPageSize).toBeDefined();
      expect(pdfEngine.SaveAs).toBeDefined();
      expect(pdfEngine.CloseDocument).toBeDefined();
      expect(pdfEngine.RenderPage).toBeDefined();
      // features
      if ("addAnnotation" in pdfEngine) {
        expect(pdfEngine.addAnnotation).toBeDefined();
        expect(pdfEngine.addAnnotation()).toMatchInlineSnapshot(
          `"Annotation added"`
        );
      }
      if ("encryptDecrypt" in pdfEngine) {
        expect(pdfEngine.encryptDecrypt).toBeUndefined();
      }
      if ("granularSearch" in pdfEngine) {
        expect(pdfEngine.granularSearch).toBeDefined();
        expect(pdfEngine.granularSearch()).toMatchInlineSnapshot(
          `"Granular search performed"`
        );
      }
      // Main
      expect(pdfEngine.LoadDocument(pathToPDFFile)).toEqual(
        `PDF loaded in: ${pathToPDFFile}`
      );
      expect(pdfEngine.GetPageCount()).toBeGreaterThan(0);
      expect(pdfEngine.GetPageSize()).toBeGreaterThan(0);
      expect(pdfEngine.SaveAs("documentFile")).toMatchInlineSnapshot(
        `"Saved as documentFile"`
      );
      expect(pdfEngine.SaveAs("memoryBuffer")).toMatchInlineSnapshot(
        `"Saved as memoryBuffer"`
      );
      expect(pdfEngine.CloseDocument()).toMatchInlineSnapshot(`"PDF closed"`);
      expect(pdfEngine.RenderPage()).toMatchInlineSnapshot(
        `"The PDF Page it is rendered"`
      );
    });
    // ALSOOKPDFENGINE
    it("chooses ALSOOKPDFENGINE", () => {
      const fileInfoByte = 0b010;
      const pathToPDFFile = "./example.pdf";
      const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
      const pdfEngine = pdfWrapper.engine as ALSOOKPdfEngineInterface;
      expect(pdfWrapper.engineName).toEqual("ALSOOKPDFENGINE");
      expect(pdfEngine.LoadDocument).toBeDefined();
      expect(pdfEngine.GetPageCount).toBeDefined();
      expect(pdfEngine.GetPageSize).toBeDefined();
      expect(pdfEngine.SaveAs).toBeDefined();
      expect(pdfEngine.CloseDocument).toBeDefined();
      expect(pdfEngine.RenderPage).toBeDefined();
      // features
      if ("addAnnotation" in pdfEngine) {
        expect(pdfEngine.addAnnotation).toBeUndefined();
      }
      if ("encryptDecrypt" in pdfEngine) {
        expect(pdfEngine.encryptDecrypt).toBeDefined();
        expect(pdfEngine.encryptDecrypt()).toMatchInlineSnapshot(
          `"Encryption/Decryption performed"`
        );
      }
      if ("granularSearch" in pdfEngine) {
        expect(pdfEngine.granularSearch).toBeUndefined();
      }
      // Main
      expect(pdfEngine.LoadDocument(pathToPDFFile)).toEqual(
        `PDF loaded in: ${pathToPDFFile}`
      );
      expect(pdfEngine.GetPageCount()).toBeGreaterThan(0);
      expect(pdfEngine.GetPageSize()).toBeGreaterThan(0);
      expect(pdfEngine.SaveAs("documentFile")).toMatchInlineSnapshot(
        `"Saved as documentFile"`
      );
      expect(pdfEngine.SaveAs("memoryBuffer")).toMatchInlineSnapshot(
        `"Saved as memoryBuffer"`
      );
      expect(pdfEngine.CloseDocument()).toMatchInlineSnapshot(`"PDF closed"`);
      expect(pdfEngine.RenderPage()).toMatchInlineSnapshot(
        `"The PDF Page it is rendered"`
      );
    });
    // OKPDFENGINE
    it("chooses OKPDFENGINE", () => {
      const fileInfoByte = 0b100;
      const pathToPDFFile = "./example.pdf";
      const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
      const pdfEngine = pdfWrapper.engine as OKPdfEngineInterface;
      expect(pdfWrapper.engineName).toEqual("OKPDFENGINE");
      expect(pdfEngine.LoadDocument).toBeDefined();
      expect(pdfEngine.GetPageCount).toBeDefined();
      expect(pdfEngine.GetPageSize).toBeDefined();
      expect(pdfEngine.SaveAs).toBeDefined();
      expect(pdfEngine.CloseDocument).toBeDefined();
      expect(pdfEngine.RenderPage).toBeDefined();
      // features
      if ("addAnnotation" in pdfEngine) {
        expect(pdfEngine.addAnnotation).toBeUndefined();
      }
      if ("encryptDecrypt" in pdfEngine) {
        expect(pdfEngine.encryptDecrypt).toBeUndefined();
      }
      if ("granularSearch" in pdfEngine) {
        expect(pdfEngine.granularSearch).toBeDefined();
        expect(pdfEngine.granularSearch()).toMatchInlineSnapshot(
          `"Granular search performed"`
        );
      }
      // Main
      expect(pdfEngine.LoadDocument(pathToPDFFile)).toEqual(
        `PDF loaded in: ${pathToPDFFile}`
      );
      expect(pdfEngine.GetPageCount()).toBeGreaterThan(0);
      expect(pdfEngine.GetPageSize()).toBeGreaterThan(0);
      expect(pdfEngine.SaveAs("documentFile")).toMatchInlineSnapshot(
        `"Saved as documentFile"`
      );
      expect(pdfEngine.SaveAs("memoryBuffer")).toMatchInlineSnapshot(
        `"Saved as memoryBuffer"`
      );
      expect(pdfEngine.CloseDocument()).toMatchInlineSnapshot(`"PDF closed"`);
      expect(pdfEngine.RenderPage()).toMatchInlineSnapshot(
        `"The PDF Page it is rendered"`
      );
    });
    // SOSOPdfEngine
    it("chooses the SOSOPdfEngine", () => {
      const fileInfoByte = 0b000;
      const pathToPDFFile = "./example.pdf";
      const pdfWrapper: PDFWrapper = renderPDF(pathToPDFFile, fileInfoByte);
      const pdfEngine = pdfWrapper.engine as SOSOPdfEngineInterface;
      expect(pdfWrapper.engineName).toEqual("SOSOPDFENGINE");
      expect(pdfEngine.LoadDocument).toBeDefined();
      expect(pdfEngine.GetPageCount).toBeDefined();
      expect(pdfEngine.GetPageSize).toBeDefined();
      expect(pdfEngine.SaveAs).toBeDefined();
      expect(pdfEngine.CloseDocument).toBeDefined();
      expect(pdfEngine.RenderPage).toBeDefined();
      // features
      if ("addAnnotation" in pdfEngine) {
        expect(pdfEngine.addAnnotation).toBeUndefined();
      }
      if ("encryptDecrypt" in pdfEngine) {
        expect(pdfEngine.encryptDecrypt).toBeUndefined();
      }
      if ("granularSearch" in pdfEngine) {
        expect(pdfEngine.granularSearch).toBeUndefined();
      }
      // Main
      expect(pdfEngine.LoadDocument(pathToPDFFile)).toEqual(
        `PDF loaded in: ${pathToPDFFile}`
      );
      expect(pdfEngine.GetPageCount()).toBeGreaterThan(0);
      expect(pdfEngine.GetPageSize()).toBeGreaterThan(0);
      expect(pdfEngine.SaveAs("documentFile")).toMatchInlineSnapshot(
        `"Saved as documentFile"`
      );
      expect(pdfEngine.SaveAs("memoryBuffer")).toMatchInlineSnapshot(
        `"Saved as memoryBuffer"`
      );
      expect(pdfEngine.CloseDocument()).toMatchInlineSnapshot(`"PDF closed"`);
      expect(pdfEngine.RenderPage()).toMatchInlineSnapshot(
        `"The PDF Page it is rendered"`
      );
    });
  });
});
