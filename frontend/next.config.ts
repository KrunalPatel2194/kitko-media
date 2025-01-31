import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // ✅ Proxy all API requests
        destination: "http://localhost:5000/api/v1/:path*", // ✅ Backend API
      },
    ];
  },
};

export default nextConfig;
