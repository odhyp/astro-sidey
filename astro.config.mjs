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
import { unified } from "@astrojs/markdown-remark"
import rehypeExternalLinks from "rehype-external-links"
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs"
import rehypeLightbox from "./src/plugins/rehype-lightbox.mjs"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

// Sidey Config
import { sideyConfig } from "./sidey.config.ts"

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [astroExpressiveCode(), mdx(), icon(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        rehypeLightbox,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["heading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener", "noreferrer", "external"],
          },
        ],
      ],
    }),
  },
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  site: sideyConfig.site.url,
  server: {
    host: true,
    allowedHosts: ["thursday-gurgling-tipper.ngrok-free.dev"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
