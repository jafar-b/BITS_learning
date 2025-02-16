import { defineConfig } from "vite";

export default defineConfig({

  build: {
    outDir: "dist",
  },
  server: {
    open: "/pages/Login.html", // Open `Login.html` by default
  },
});
