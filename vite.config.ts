import { fileURLToPath, URL } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const proxy = { '/functions/v1/app': 'http://127.0.0.1:8000' };
const productionContentSecurityPolicy =
  "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self'; script-src-attr 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://*.supabase.co wss://*.supabase.co wss://api.onlinecompiler.io; worker-src 'self' blob:; media-src 'self' blob:";
const developmentContentSecurityPolicy = productionContentSecurityPolicy
  .replace("script-src 'self';", "script-src 'self' 'unsafe-inline';")
  .replace(
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co wss://api.onlinecompiler.io;",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co wss://api.onlinecompiler.io ws://127.0.0.1:* ws://localhost:*;"
  );

const buildContentSecurityPolicy: Plugin = {
  name: 'codevision-build-content-security-policy',
  apply: 'build',
  transformIndexHtml(html) {
    const meta = `<meta http-equiv="Content-Security-Policy" content="${productionContentSecurityPolicy}" />`;
    return html.replace(/<head([^>]*)>/i, (head) => `${head}\n    ${meta}`);
  },
};

const securityHeaders = {
  'Content-Security-Policy': productionContentSecurityPolicy,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
};

export default defineConfig({
  plugins: [react(), buildContentSecurityPolicy],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    host: '127.0.0.1',
    proxy,
    headers: { ...securityHeaders, 'Content-Security-Policy': developmentContentSecurityPolicy },
  },
  preview: { host: '127.0.0.1', proxy, headers: securityHeaders },
  build: { outDir: 'dist' },
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    include: ['monaco-editor/editor/editor.api.js'],
  },
});
