import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "icons/*.png"],
      manifest: {
        id: "new-new-boplats",
        name: "Nya nya boplats",
        short_name: "Nya nya boplats",
        description: "En simpel karta som visar lägenher från boplats.se",
        theme_color: "#4aa4dd",
        background_color: "#111111",
        standalone: true,
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "home-2400-1350.jpeg",
            sizes: "2400x1350",
            form_factor: "wide",
            label: "Desktop view showing home page"
          },
          {
            src: "home-1600-900.jpeg",
            sizes: "1600x900",
            form_factor: "wide",
            label: "Desktop view showing home page"
          },
          {
            src: "home-625-1283.jpeg",
            sizes: "625x1283",
            form_factor: "narrow",
            label: "Desktop view showing home page"
          },
        ],
      },
      workbox: {
        // Workbox options for service worker
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,json}"],
        // Clean the outdated service worker
        cleanupOutdatedCaches: true,
        // Skip waiting so the new service worker can take over immediately
        skipWaiting: true,
        // Don't load Google's stuff
        sourcemap: true,
        runtimeCaching: [
          {
            // Cache rule for specific API calls
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api/apartments");
            },
            handler: "NetworkFirst",
            options: {
              cacheName: "api-apartments-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
        ],
      },
      // Enable dev mode for development (won't register actual service worker during development)
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
