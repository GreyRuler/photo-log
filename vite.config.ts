import path from "path"
import {defineConfig} from "vite";
import laravel from 'laravel-vite-plugin';
import viteReact from "@vitejs/plugin-react";
import {TanStackRouterVite} from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        laravel({
            input: 'src/main.tsx',
            refresh: true,
        }),
        viteReact(),
        TanStackRouterVite()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        port: 3000,
    }
});
