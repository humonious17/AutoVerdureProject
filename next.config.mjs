/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Enable WebAssembly and Layers support
   // config.experiments = {asyncWebAssembly: true,   layers: true,          };

    // Add WebAssembly loader rule
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async", // Set the type for WebAssembly modules
    });

    // Add the file-loader rule for videos
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
