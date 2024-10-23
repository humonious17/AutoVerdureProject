/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add the file-loader rule
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            outputPath: "static/videos/", // This will output the videos in the static/videos folder of your Next.js project
            name: "[name].[ext]",
            esModule: false,
          },
        },
      ],
    });
    //config.experiments = { asyncWebAssembly: true };
    return config;
  },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
