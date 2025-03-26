import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // All services are running on port 9999
      "/api/public/auth": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Auth proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Remove any double slashes in the URL
            const url = req.url.replace(/\/+/g, '/');
            console.log('Auth Request:', {
              method: req.method,
              url: url,
              headers: proxyReq.getHeaders()
            });
            // Update the request URL
            req.url = url;
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Auth Response:', {
              status: proxyRes.statusCode,
              url: req.url,
              headers: proxyRes.headers
            });
          });
        }
      },
      "/api/private/profile": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/queries": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/notfication": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/content": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/event": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/admin": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/public/admission": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/admission": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/course": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/degree": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/material": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/private/semester": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // Fallback for any other API routes
      "/api": {
        target: "http://localhost:9999",
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true
    }
  },
})
