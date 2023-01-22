module.exports = {
  images: {
      domains: ['media.graphcms.com', 'shopify.com', 'cdn.shopify.com', 'media.graphassets.com','cms.bodykore.com'],
  },
  i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
  },
  async headers() {
      return [
        {
          source: '/sitemap.xml',
          headers: [
            {
              key: 'content-type',
              value: 'application/xml',
            },
          ],
        },
        {
          source: '/sitemaps/:sitemap*',
          headers: [
            {
              key: 'content-type',
              value: 'application/xml',
            },
          ],
        },
      ]
  },
  async redirects() {
    return []
  },
  poweredByHeader: false,
  trailingSlash: false,
};
