import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Public shell: single-package layout (src/ + shared/ at repo root).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["html2canvas"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "vendor-react";
          }
          if (
            id.includes("@trpc/") ||
            id.includes("@tanstack/react-query") ||
            id.includes("superjson")
          ) {
            return "vendor-trpc";
          }
          if (id.includes("recharts")) return "vendor-recharts";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@radix-ui/")) return "vendor-radix";
          if (
            id.includes("node_modules/sonner") ||
            id.includes("node_modules/wouter")
          ) {
            return "vendor-ui";
          }
        },
      },
    },
  },
  server: {
    host: true,
    fs: { strict: true, deny: ["**/.*"] },
  },
});
