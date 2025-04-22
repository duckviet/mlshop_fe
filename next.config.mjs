/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "img.daisyui.com",
      "i.postimg.cc",
      "www.example.com",
      "www.ecogoods.com",
      "images.unsplash.com",
    ], // Add the hostname here
  },
};

export default nextConfig;
