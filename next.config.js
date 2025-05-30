/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    images: {
        domains: [
            'images.unsplash.com',
            'ypzodxbpqmdqlsiksgoy.supabase.co',
            'storage.googleapis.com'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        // Exclude Supabase Edge Functions from the build
        config.module.rules.push({
            test: /supabase\/functions\/.*\.ts$/,
            use: 'ignore-loader',
        });
        return config;
    },
    experimental: {
        // Add any other experimental features if needed
    },
};

if (process.env.NEXT_PUBLIC_TEMPO) {
    nextConfig["experimental"] = {
        // NextJS 13.4.8 up to 14.1.3:
        // swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
        // NextJS 14.1.3 to 14.2.11:
        swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]]

        // NextJS 15+ (Not yet supported, coming soon)
    }
}

module.exports = nextConfig;