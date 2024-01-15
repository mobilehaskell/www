import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'mobile haskell',
  tagline: 'putting haskell onto mobile and low energy devices',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.mobilehaskell.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mobilehaskell', // Usually your GitHub org/user name.
  projectName: 'www', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'mobilehaskell.org',
      logo: {
        alt: 'Mobile Haskell Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'tutorial',
          position: 'left',
          label: 'Tutorial',
        },
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'doc',
          docId: 'faq',
          position: 'left',
          label: 'FAQ',
        },
        {
          type: 'docSidebar',
          sidebarId: 'showcaseSidebar',
          position: 'left',
          label: 'Showcase',
        },
        {
          label: 'Join the Discussion',
          position: 'left',
          href: 'https://t.me/mobilehaskell',
        },
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      // style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial',
            },
            {
              label: 'Documentation',
              to: '/docs',
            },
            {
              label: 'FAQ',
              to: '/docs/faq',
            },
            {
              label: 'Showcase',
              to: '/showcase',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/mobilehaskell',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/mobilehaskell',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/mobilehaskell',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} the mobilehaskell.org contributors on <a href="https://github.com/mobilehaskell/www">GitHub</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
