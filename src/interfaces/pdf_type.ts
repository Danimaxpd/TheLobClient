export const SaveTypes = {
  memoryBuffer: "memoryBuffer",
  documentFile: "documentFile",
} as const;

export type SaveType = keyof typeof SaveTypes;
