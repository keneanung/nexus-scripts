// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Keneanungs Collection of IRE Nexus scripts',
  tagline: 'Documentation for my Nexus packages and more',
  url: `https://keneanung.github.io`,
  baseUrl: `/nexus-scripts/`,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'keneanung', // Usually your GitHub org/user name.
  projectName: 'nexus-scripts', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/keneanung/nexus-scripts/edit/development/website/',
          remarkPlugins: [require('mdx-mermaid')]
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
          'https://github.com/keneanung/nexus-scripts/edit/development/website/blog/',
          remarkPlugins: [require('mdx-mermaid')],
          
        },
        pages: {
          remarkPlugins: [require('mdx-mermaid')],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Keneanungs Collection of IRE Nexus scripts',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/keneanung/nexus-scripts',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/keneanung/nexus-scripts',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} keneanung, Built with Docusaurus.`,
      },
    }),
};

module.exports = config;
