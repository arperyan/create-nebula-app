import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        typescript({
            tsconfig: "./tsconfig.json",
        }),
        svelte(),
    ],
    css: { postcss: "./postcss.config.cjs" },
    {{VP}}
});
