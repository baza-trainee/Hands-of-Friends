/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hands-of-friends-backend.onrender.com"],
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
