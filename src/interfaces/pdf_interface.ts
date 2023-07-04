import { SaveType } from "../interfaces/pdf_type";

export interface PDFWrapper {
  engineName: string;
  availableFeatures: [PdfEngineFeatures];
  engine:
    | SOSOPdfEngineInterface
    | ALSOOKPdfEngineInterface
    | BETTERPdfEngineInterface
    | BESTPdfEngineInterface;
}

export interface MainPdfEngineInterface {
  set_Name(engName: string): void;
  get_Name(): string;
  get_AvailableFeatures(): PdfEngineFeatures[];
  LoadDocument(pathToPDFFile: string): string;
  CloseDocument(): string;
  GetPageCount(): number;
  GetPageSize(): number;
  SaveAs(type: SaveType): string;
  RenderPage(): string;
}

export interface PdfEngineFeatures {
  featureAnnotation: boolean;
  featureEncryptDecrypt: boolean;
  featureGranularSearch: boolean;
}

export interface AnnotationSupport {
  addAnnotation(): string;
}

export interface EncryptionSupport {
  encryptDecrypt(): string;
}

export interface SearchSupport {
  granularSearch(): string;
}

export interface SOSOPdfEngineInterface extends MainPdfEngineInterface {}
export interface OKPdfEngineInterface
  extends MainPdfEngineInterface,
    SearchSupport {}
export interface ALSOOKPdfEngineInterface
  extends MainPdfEngineInterface,
    EncryptionSupport {}
export interface BETTERPdfEngineInterface
  extends MainPdfEngineInterface,
    AnnotationSupport,
    SearchSupport {}
export interface BESTPdfEngineInterface
  extends MainPdfEngineInterface,
    AnnotationSupport,
    EncryptionSupport,
    SearchSupport {}
