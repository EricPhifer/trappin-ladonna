/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Trappin' LaDonna`,
    description: `Puttin' Pests in Prison`,
    author: 'Phifer Web Solutions',
    siteUrl: `https://trappinladonna.netlify.app`,
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '8mmwj73i',
        dataset: 'production',
      },
    },
    {
      resolve: 'gatsby-plugin-sanity-image',
      options: {
        projectId: '8mmwj73i',
        dataset: 'production',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://trappinladonna.netlify.app',
        sitemap: 'https://trappinladonna.netlify.app/sitemap/sitemap-index.xml',
        policy: [{ userAgent: '*', disallow: '*' }],
      },
    },
  ],
}
