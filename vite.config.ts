import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

import path from "path";
import * as pathsConfig from "./config/paths.json";

const alias = {
    "@mui/styled-engine": path.resolve(
        __dirname,
        "./node_modules/@mui/styled-engine-sc"
    ),
};
pathsConfig.paths.forEach((pathConfig: { alias: string; path: string }) => {
    alias[pathConfig["alias"]] = path.resolve(
        __dirname,
        `src/${pathConfig["path"]}`
    );
});

export default defineConfig({
    plugins: [react({ fastRefresh: true }), viteCompression()],
    resolve: { alias },
    server: {
        host: "0.0.0.0",
        port: 8080,
    },
    build: {
        outDir: "build",
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name]-[hash].js`,
                chunkFileNames: `assets/[name]-[hash].js`,
                assetFileNames: `assets/[name]-[hash].[ext]`,
            },
        },
    },
});
