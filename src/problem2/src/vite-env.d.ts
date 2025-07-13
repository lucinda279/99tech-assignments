/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TOKEN_ICONS_URL: string;
  readonly VITE_PRICE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
