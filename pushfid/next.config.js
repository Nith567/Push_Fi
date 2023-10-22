/** @type {import('next').NextConfig} */
const {webpack} = require("next/dist/compiled/webpack/webpack");
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
   images:{
    domains:[
        "pbs.twimg.com",
        "cdn.discordapp.com"
    ]
   },
   webpack: (config, {isServer}) => {
    if (!isServer) {
        config.resolve = {
            ...config.resolve,
            fallback: {
                // fixes proxy-agent dependencies
                net: false,
                dns: false,
                tls: false,
                assert: false,
                // fixes next-i18next dependencies
                path: false,
                fs: false,
                // fixes mapbox dependencies
                events: false,
                // fixes sentry dependencies
                process: false
            }
        };
    }
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
    }))

    return config
},
experimental: {appDir: true}
}

module.exports = nextConfig
