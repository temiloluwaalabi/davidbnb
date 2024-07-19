/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  // redirects: async () => {
  //   return [
  //     {
  //       source: "/en",
  //       destination: "/",
  //       permanent: true,
  //       locale: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
