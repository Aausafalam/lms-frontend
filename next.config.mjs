import path from "path";

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve("./src");
        return config;
    },
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["images.unsplash.com"],
    },
};

export default nextConfig;
