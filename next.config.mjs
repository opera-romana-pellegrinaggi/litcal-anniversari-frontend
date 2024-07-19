/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    unoptimized: true // Image optimization cannot be used with output: 'export'
  },
  basePath: process.env.NEXT_PUBLIC_URL === '/' ? '' : process.env.NEXT_PUBLIC_URL
};

export default nextConfig;
