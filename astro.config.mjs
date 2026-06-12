// @ts-check
import { defineConfig } from "astro/config"

// integrations
import tailwindcss from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import icon from "astro-icon"
import sitemap from "@astrojs/sitemap"

// Expressive Code
import astroExpressiveCode from "astro-expressive-code"

// Remark Rehype Plugins
import rehypeExternalLinks from "rehype-external-links"
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs"
import rehypeLightbox from "./src/plugins/rehype-lightbox.mjs"

// Sidey Config
import { sideyConfig } from "./sidey.config.ts"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [astroExpressiveCode(), mdx(), icon(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeLightbox,
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer", "external"],
        },
      ],
    ],
  },
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  site: sideyConfig.site.url,
  vite: {
    plugins: [tailwindcss()],
  },
})
