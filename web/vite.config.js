import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build` → normal multi-file build for Vercel (dist/).
// `npm run build:single` → one self-contained index.html (for previews and hand-offs).
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  build: {
    outDir: mode === "single" ? "dist-single" : "dist",
    target: "es2020",
    chunkSizeWarningLimit: 1200,
    copyPublicDir: mode !== "single",
  },
}));
