/** @type {import('next').NextConfig} */
const nextConfig = {
    // hot reload activation
    reactStrictMode: true,

    // Docker configuration, modify development server config. The function sends modified config
     webpack: (config, { isServer }) => {
        config.watchOptions = {
            // check changes every 1000ms
            poll: 1000,
            // waits 300ms to check if there are other changes to update 
            aggregateTimeout: 300,
        }
        return config
    }
};


export default nextConfig;
