/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    qualities: [75, 90],
  },
  // SVG logos are served as static files (`unoptimized` on the Image), so the
  // image optimizer never needs to process SVG.
};

export default nextConfig;
