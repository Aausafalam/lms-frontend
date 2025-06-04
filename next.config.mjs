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
        domains: ["192.168.152.220"],
        unoptimized: true,
    },
};

export default nextConfig;
