import path from "path"
import {defineConfig} from "vite";
import laravel from 'laravel-vite-plugin';
import viteReact from "@vitejs/plugin-react";
import {TanStackRouterVite} from '@tanstack/router-plugin/vite'
import {VitePWA} from "vite-plugin-pwa";

type Icons = {
    src: string
}

const manifestIcons = [
    {
        src: '/pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
    },
    {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
    },
    {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
    },
    {
        src: '/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
    }
]

const publicIcons: Icons[] = [
    { src: '/favicon.ico' },
    { src: '/favicon.svg' },
    { src: '/apple-touch-icon-180x180.png' }
]

const additionalImages: Icons[] = []

export default defineConfig({
    plugins: [
        laravel({
            input: 'src/main.tsx',
            refresh: true,
        }),
        viteReact(),
        TanStackRouterVite(),
        VitePWA({
            // Make the PWA plugin build to the same place as laravel/vite-plugin
            buildBase: '/build/',

            // Define the scope and the base so that the PWA can run from the
            // root of the domain, even though the files live in /build.
            // This requires the service worker to be served with
            // a header `Service-Worker-Allowed: /` to authorise it.
            // @see server.php
            scope: '/',
            base: '/',

            // Use 'prompt' for new versions of the PWA. 'autoUpdate' is
            // simpler but may as well dmeo how this works.
            registerType: 'autoUpdate',

            // Do not use the PWA with dev builds.
            devOptions: {
                enabled: false
            },

            // The Vite PWA docs suggest you should use includeAssets for
            // icons that are not in the manifest. But laravel/vite-plugin
            // does not use a public dir in the build - it relies on
            // Laravel's. If we add this as a publicDir to vite's config
            // then vite-plugin-pwa finds everything in public (eg if you are
            // using telescope then all its assets get cached). It then adds
            // these assets to the service worker with the `/build` prefix,
            // which doesn't work. I found it easiest to leave this empty
            // and use `additionalManifestEntries` below.
            includeAssets: [],

            workbox: {
                // Add all the assets built by Vite into the public/build/assets
                // folder to the SW cache.
                globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg,woff,woff2,ttf,eot}'],

                // Define the root URL as the entrypoint for the offline app.
                // vue-router can then takes over and shows the correct page
                // if you are using it.
                navigateFallback: '/',

                // Stops various paths being intercepted by the service worker
                // if they're not available offline. Telescope is a good
                // example, if you are using that.
                navigateFallbackDenylist: [/^\/telescope/],

                // Add some explicit URLs to the SW precache. This helps us
                // work with the laravel/vite-plugin setup.
                additionalManifestEntries: [
                    // Cache the root URL to get hold of the PWA HTML entrypoint
                    // defined in welcome.blade.php. Ref:
                    // https://github.com/vite-pwa/vite-plugin-pwa/issues/431#issuecomment-1703151065
                    { url: '/', revision: `${Date.now()}` },

                    // Cache the icons defined above for the manifest
                    ...manifestIcons.map((i) => {
                        return { url: i.src, revision: `${Date.now()}` }
                    }),

                    // Cache the other offline icons defined above
                    ...publicIcons.map((i) => {
                        return { url: i.src, revision: `${Date.now()}` }
                    }),

                    // Cache any additional images defined above
                    ...additionalImages.map((i) => {
                        return { url: i.src, revision: `${Date.now()}` }
                    })
                ],

                // Ensure the JS build does not get dropped from the cache.
                // This allows it to be as big as 3MB
                maximumFileSizeToCacheInBytes: 3000000
            },

            // Manifest settings - these will appear in the generated manifest.webmanifest
            manifest: {
                // Metadata
                name: 'Vinci Photo',
                short_name: 'Vinci Photo',
                description: 'Это приложение позволит автоматизировать и упростить процесс документирования и контроля мероприятий, предоставляя администратору и фотографам мощный инструмент для эффективной работы.',
                theme_color: '#0f172a',
                background_color: '#0f172a',
                orientation: 'portrait',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                id: '/',

                // These icons are used when installing the PWA onto a home screen
                icons: [...manifestIcons]
            }
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
