import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/milestone-2-Diba15-1/',
    build: {
        outDir: 'dist',
    },
    plugins: [tailwindcss()],
});