import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: "docs",
  
  title: "NovaGlider Docs",
  description: "The documentation for the whole NovaGlider project.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction' },
      { text: 'Self Host', link: '/self-host' }
    ],

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nova-glider' }
    ]
  },
  markdown: {
    languageAlias: {
      // Alias 'nginx' to 'caddy' for syntax highlighting
      caddyfile: 'nginx',
      Caddyfile: 'nginx',
      Caddy: 'nginx',
      caddy: 'nginx'
    }
  }
})
