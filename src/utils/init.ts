import { Buffer } from 'buffer';

// Initialize required globals for Solana
window.Buffer = Buffer;
globalThis.Buffer = Buffer;

// Initialize process
if (!window.process) {
  window.process = { env: {} };
}

// Ensure global is defined
if (!window.global) {
  window.global = window;
}