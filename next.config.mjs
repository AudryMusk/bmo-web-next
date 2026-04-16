/** @type {import('next').NextConfig} */
const nextConfig = {
  // Le dossier src/ est un vestige d'une ancienne SPA Vite — on l'exclut du build Next.js
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack(config) {
    config.watchOptions = { ...config.watchOptions, ignored: /src\// }
    return config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    turbo: {
      rules: {},
    },
  },
}

export default nextConfig;
