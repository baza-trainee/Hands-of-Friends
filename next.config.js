/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backend.rd.org.ua'],
    deviceSizes: [640, 768, 1024, 1280, 1600, 3840],  // Include the requested size
    imageSizes: [16, 32, 48, 64, 96, 256, 512],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            outputPath: "static/images",
            name: "[name].[ext]",
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
