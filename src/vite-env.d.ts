/// <reference types="vite/client" />

interface Window {
  Buffer: typeof Buffer;
  process: { env: any };
  global: typeof globalThis;
}