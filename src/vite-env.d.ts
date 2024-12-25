/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Add your environment variables here
    // readonly VITE_ANOTHER_VAR: string; // Example for additional variables
}
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }