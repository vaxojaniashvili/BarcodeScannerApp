export interface ScannedCode {
  type: string;
  value: string;
}

export type CodeType =
  | 'qr'
  | 'ean-13'
  | 'ean-8'
  | 'code-128'
  | 'code-39'
  | 'code-93'
  | 'codabar'
  | 'itf'
  | 'upc-a'
  | 'upc-e'
  | 'pdf-417'
  | 'aztec'
  | 'data-matrix';
