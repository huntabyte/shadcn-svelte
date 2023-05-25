import { mdsvex } from "@huntabyte/mdsvex";
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import preprocess from "svelte-preprocess";

import { mdsvexOptions } from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true
    }),
    mdsvex(mdsvexOptions)
  ],

  extensions: [".svelte", ".md"],

  kit: {
    adapter: adapter(),
    alias: {
      $components: "src/lib/components",
      "$components/*": "src/lib/components/*",
      $ui: "src/lib/components/ui",
      "$ui/*": "src/lib/components/ui/*"
    }
  }
};

export default config;
