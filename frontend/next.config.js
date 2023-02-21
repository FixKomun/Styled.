/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  async redirects(){
    return [
      {source:'/canceled', destination:'/', permanent:true}
    ]
  }
};

module.exports = nextConfig;
