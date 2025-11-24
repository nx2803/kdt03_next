import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.visitbusan.net',
        port: '',
        pathname: '/uploadImgs/files/cntnts/**',
      },
    ],
  },
};




export default nextConfig;

