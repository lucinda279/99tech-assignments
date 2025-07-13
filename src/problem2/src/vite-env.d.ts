/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_CURRENCY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
