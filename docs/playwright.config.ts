import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/rtl",
	use: { baseURL: "http://127.0.0.1:4174" },
	webServer: {
		command: "pnpm exec vite --config tests/rtl/vite.config.ts --host 127.0.0.1 --port 4174",
		url: "http://127.0.0.1:4174",
		reuseExistingServer: !process.env.CI,
	},
});
