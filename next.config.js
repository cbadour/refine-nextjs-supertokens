const { hostname } = require("os");

module.exports = {
  experimental: {
    newNextLinkBehavior: true,
  },
  transpilePackages: [
    "@refinedev/antd",
    "@refinedev/inferencer",
    "antd",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "rc-pagination",
    "rc-picker",
  ],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/users',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com'
      }
    ]
  }
};
