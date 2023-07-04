import { getRandomInt } from "../helpers/math_helper";
import { SaveType, SaveTypes } from "../interfaces/pdf_type";
import {
  PdfEngineFeatures,
  MainPdfEngineInterface,
} from "../interfaces/pdf_interface";

class MainPdfEngine implements MainPdfEngineInterface {
  protected engineName: string;
  protected pathToPDFFile: string;
  protected featureAnnotation: boolean = false;
  protected featureEncryptDecrypt: boolean = false;
  protected featureGranularSearch: boolean = false;

  constructor(
    featureAnnotation: boolean,
    featureEncryptDecrypt: boolean,
    featureGranularSearch: boolean
  ) {
    this.engineName = "";
    this.pathToPDFFile = "";
    this.featureAnnotation = featureAnnotation;
    this.featureEncryptDecrypt = featureEncryptDecrypt;
    this.featureGranularSearch = featureGranularSearch;
  }

  set_Name(engName: string): void {
    this.engineName = engName;
  }

  get_Name(): string {
    return this.engineName;
  }

  get_AvailableFeatures(): [PdfEngineFeatures] {
    return [
      {
        featureAnnotation: this.featureAnnotation,
        featureEncryptDecrypt: this.featureEncryptDecrypt,
        featureGranularSearch: this.featureGranularSearch,
      },
    ];
  }

  LoadDocument(pathToPDFFile: string): string {
    this.pathToPDFFile = pathToPDFFile;
    return `PDF loaded in: ${pathToPDFFile}`;
  }

  CloseDocument(): string {
    this.pathToPDFFile = "";
    return `PDF closed`;
  }

  GetPageCount(): number {
    return getRandomInt(1, 100);
  }

  GetPageSize(): number {
    return getRandomInt(1, 100);
  }

  SaveAs(type: SaveType): string {
    if (type in SaveTypes) {
      return `Saved as ${type}`;
    } else {
      throw new Error(`Invalid save type: ${type}`);
    }
  }

  RenderPage(): string {
    return `The PDF Page it is rendered`;
  }
}

export { MainPdfEngine };
