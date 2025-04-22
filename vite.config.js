import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isGithubPages = mode === "github";

  return {
    base: isGithubPages ? "/tabflex-extension/" : "",
    plugins: [react()],
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: "./index.html",
        },
      },
    },
  };
});
