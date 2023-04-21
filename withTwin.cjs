// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// The folders containing files importing twin.macro
const includedDirs = [
  path.resolve(__dirname, "app"),
  path.resolve(__dirname, "src"),
];

module.exports = function withTwin( // @ts-ignore
  /** @type {import("next").NextConfig}} */ nextConfig
) {
  return {
    ...nextConfig,
    /**
     * @param {{ module: { rules?: any; }; resolve: { fallback: any; }; }} config
     * @param {{ defaultLoaders?: any; dev?: any; isServer?: any; }} options
     */
    // @ts-ignore
    webpack(config, options) {
      const { dev, isServer } = options;
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includedDirs,
        use: [
          options.defaultLoaders.babel,
          {
            loader: "babel-loader",
            options: {
              sourceMaps: dev,
              presets: [
                [
                  "@babel/preset-react",
                  { runtime: "automatic", importSource: "@emotion/react" },
                ],
              ],
              plugins: [
                require.resolve("babel-plugin-twin"),
                require.resolve("babel-plugin-macros"),
                require.resolve("@emotion/babel-plugin"),
                [
                  require.resolve("@babel/plugin-syntax-typescript"),
                  { isTSX: true },
                ],
              ],
            },
            // ignore: ["\x00commonjsHelpers.js"], // Weird babel-macro bug fix
          },
        ],
      });

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      if (typeof nextConfig.webpack === "function") {
        // @ts-ignore
        return nextConfig.webpack(config, options);
      } else {
        return config;
      }
    },
  };
};
