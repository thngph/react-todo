/// <reference types="vite/client" />
export interface ImportMetaEnv {
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;

  API_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
