/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['kwnodbtuttenhfadqote.supabase.co', 'lcuvdrkgilgijikhddrt.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig