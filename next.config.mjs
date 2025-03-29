import path from "path";

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve("./src");
        return config;
    },
    experimental: {
        appDir: true,
    },
};

export default nextConfig;
