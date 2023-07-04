import { MainPdfEngine } from "./main_pdf_engine";
import {
  SOSOPdfEngineInterface,
  ALSOOKPdfEngineInterface,
  BETTERPdfEngineInterface,
  BESTPdfEngineInterface,
} from "../interfaces/pdf_interface";

class SOSOPdfEngine extends MainPdfEngine {
  constructor() {
    super(false, false, false);
    this.set_Name("SOSOPDFENGINE");
  }
  // No support for annotation, encryption, or search
}

class OKPdfEngine extends MainPdfEngine implements SOSOPdfEngineInterface {
  constructor() {
    super(false, false, true);
    this.set_Name("OKPDFENGINE");
  }
  // Only support for search
  granularSearch(): string {
    return "Granular search performed";
  }
}

class ALSOOKPdfEngine
  extends MainPdfEngine
  implements ALSOOKPdfEngineInterface
{
  constructor() {
    super(false, true, false);
    this.set_Name("ALSOOKPDFENGINE");
  }
  // Only support for encryption/decryption
  encryptDecrypt(): string {
    return "Encryption/Decryption performed";
  }
}

class BETTERPdfEngine
  extends MainPdfEngine
  implements BETTERPdfEngineInterface
{
  constructor() {
    super(true, false, true);
    this.set_Name("BETTERPDFENGINE");
  }
  // Support for annotation and search
  addAnnotation(): string {
    return "Annotation added";
  }

  granularSearch(): string {
    return "Granular search performed";
  }
}

class BESTPdfEngine extends MainPdfEngine implements BESTPdfEngineInterface {
  constructor() {
    super(true, true, true);
    this.set_Name("BESTPDFENGINE");
  }
  // Support for all features
  addAnnotation(): string {
    return "Annotation added";
  }

  encryptDecrypt(): string {
    return "Encryption/Decryption performed";
  }

  granularSearch(): string {
    return "Granular search performed";
  }
}

export {
  SOSOPdfEngine,
  OKPdfEngine,
  ALSOOKPdfEngine,
  BETTERPdfEngine,
  BESTPdfEngine,
};
