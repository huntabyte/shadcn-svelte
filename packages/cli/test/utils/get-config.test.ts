import { describe, expect, it, vi } from "vitest";
import { SITE_BASE_URL } from "../../src/constants";
import { getConf, resolvePath } from "./test-helpers";

vi.mock("tinyexec");

describe("getConfig", () => {
	it("handles cases where no config is present", async () => {
		expect(await getConf("config-none")).toEqual(undefined);
	});

	it("handles invalid configurations", async () => {
		expect(getConf("config-invalid")).rejects.toThrowError();
	});

	it("handles trailing slashes in aliases", async () => {
		expect(await getConf("config-trailing-slashes")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
				lib: "$lib",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-trailing-slashes/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-trailing-slashes/src/app.css"),
				utils: resolvePath("../fixtures/config-trailing-slashes/src/lib/utils"),
				cwd: resolvePath("../fixtures/config-trailing-slashes"),
				hooks: resolvePath("../fixtures/config-trailing-slashes/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-trailing-slashes/src/lib/components/ui"),
				lib: resolvePath("../fixtures/config-trailing-slashes/src/lib"),
			},
			designSystem: {
				fonts: [
					{
						font: {
							cssImport: '@import "@fontsource-variable/inter/index.css";',
							dependencies: ["@fontsource-variable/inter"],
							family: "'Inter Variable', sans-serif",
							variable: "--font-sans",
						},
						name: "font-inter",
						title: "Inter",
						type: "registry:font",
					},
				],
				iconLibrary: "lucide",
				menuAccent: "subtle",
				menuColor: "default",
				radius: "0.5rem",
				style: "vega",
				theme: "neutral",
			},
			sveltekit: true,
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles custom typescript config files", async () => {
		expect(await getConf("config-custom-tsconfig")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
				lib: "$lib",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-custom-tsconfig/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-custom-tsconfig/src/app.css"),
				utils: resolvePath("../fixtures/config-custom-tsconfig/src/lib/utils"),
				cwd: resolvePath("../fixtures/config-custom-tsconfig"),
				hooks: resolvePath("../fixtures/config-custom-tsconfig/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-custom-tsconfig/src/lib/components/ui"),
				lib: resolvePath("../fixtures/config-custom-tsconfig/src/lib"),
			},
			designSystem: {
				fonts: [
					{
						font: {
							cssImport: '@import "@fontsource-variable/inter/index.css";',
							dependencies: ["@fontsource-variable/inter"],
							family: "'Inter Variable', sans-serif",
							variable: "--font-sans",
						},
						name: "font-inter",
						title: "Inter",
						type: "registry:font",
					},
				],
				iconLibrary: "lucide",
				menuAccent: "subtle",
				menuColor: "default",
				radius: "0.5rem",
				style: "vega",
				theme: "neutral",
			},
			sveltekit: true,
			typescript: { config: "tsconfig.base.json" },
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	// this case will be more important once we add support for
	// partial configs via tw prefixes, tw vars, etc.
	it("handles cases where a partial config is present", async () => {
		expect(await getConf("config-partial")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
				lib: "$lib",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-partial/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-partial/src/app.css"),
				utils: resolvePath("../fixtures/config-partial/src/lib/utils"),
				cwd: resolvePath("../fixtures/config-partial"),
				hooks: resolvePath("../fixtures/config-partial/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-partial/src/lib/components/ui"),
				lib: resolvePath("../fixtures/config-partial/src/lib"),
			},
			designSystem: {
				fonts: [
					{
						font: {
							cssImport: '@import "@fontsource-variable/inter/index.css";',
							dependencies: ["@fontsource-variable/inter"],
							family: "'Inter Variable', sans-serif",
							variable: "--font-sans",
						},
						name: "font-inter",
						title: "Inter",
						type: "registry:font",
					},
				],
				iconLibrary: "lucide",
				menuAccent: "subtle",
				menuColor: "default",
				radius: "0.5rem",
				style: "vega",
				theme: "neutral",
			},
			sveltekit: true,
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles cases where a full config is present", async () => {
		expect(await getConf("config-full")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
				lib: "$lib",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-full/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-full/src/app.css"),
				utils: resolvePath("../fixtures/config-full/src/lib/utils"),
				cwd: resolvePath("../fixtures/config-full"),
				hooks: resolvePath("../fixtures/config-full/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-full/src/lib/components/ui"),
				lib: resolvePath("../fixtures/config-full/src/lib"),
			},
			designSystem: {
				fonts: [
					{
						font: {
							cssImport: '@import "@fontsource-variable/inter/index.css";',
							dependencies: ["@fontsource-variable/inter"],
							family: "'Inter Variable', sans-serif",
							variable: "--font-sans",
						},
						name: "font-inter",
						title: "Inter",
						type: "registry:font",
					},
				],
				iconLibrary: "lucide",
				menuAccent: "subtle",
				menuColor: "default",
				radius: "0.5rem",
				style: "vega",
				theme: "neutral",
			},
			sveltekit: true,
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles cases where the project is not svelte-kit", async () => {
		expect(await getConf("config-vite")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
				lib: "$lib",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-vite/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-vite/src/app.css"),
				utils: resolvePath("../fixtures/config-vite/src/lib/utils"),
				hooks: resolvePath("../fixtures/config-vite/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-vite/src/lib/components/ui"),
				lib: resolvePath("../fixtures/config-vite/src/lib"),
				cwd: resolvePath("../fixtures/config-vite"),
			},
			designSystem: {
				fonts: [
					{
						font: {
							cssImport: '@import "@fontsource-variable/inter/index.css";',
							dependencies: ["@fontsource-variable/inter"],
							family: "'Inter Variable', sans-serif",
							variable: "--font-sans",
						},
						name: "font-inter",
						title: "Inter",
						type: "registry:font",
					},
				],
				iconLibrary: "lucide",
				menuAccent: "subtle",
				menuColor: "default",
				radius: "0.5rem",
				style: "vega",
				theme: "neutral",
			},
			sveltekit: false,
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles cases where the project uses jsconfig.json", async () => {
		const config = await getConf("config-jsconfig");

		expect(config).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				components: "$lib/components",
				utils: "$lib/utils",
				ui: "$lib/components/ui",
				hooks: "$lib/hooks",
				lib: "$lib",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-jsconfig/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-jsconfig/src/app.css"),
				utils: resolvePath("../fixtures/config-jsconfig/src/lib/utils"),
				hooks: resolvePath("../fixtures/config-jsconfig/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-jsconfig/src/lib/components/ui"),
				lib: resolvePath("../fixtures/config-jsconfig/src/lib"),
				cwd: resolvePath("../fixtures/config-jsconfig"),
			},
			designSystem: {
				fonts: [
					{
						font: {
							cssImport: '@import "@fontsource-variable/inter/index.css";',
							dependencies: ["@fontsource-variable/inter"],
							family: "'Inter Variable', sans-serif",
							variable: "--font-sans",
						},
						name: "font-inter",
						title: "Inter",
						type: "registry:font",
					},
				],
				iconLibrary: "lucide",
				menuAccent: "subtle",
				menuColor: "default",
				radius: "0.5rem",
				style: "vega",
				theme: "neutral",
			},
			sveltekit: false,
			typescript: false,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles legacy tailwind v3 configs", async () => {
		expect(await getConf("legacy/post-init-default")).toEqual({
			style: "default",
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				components: "$lib/components",
				hooks: "$lib/hooks",
				utils: "$lib/utils",
				lib: "$lib",
				ui: "$lib/components/ui",
			},
			designSystem: {
				fonts: [
					{
						font: {
							cssImport: '@import "@fontsource-variable/inter/index.css";',
							dependencies: ["@fontsource-variable/inter"],
							family: "'Inter Variable', sans-serif",
							variable: "--font-sans",
						},
						name: "font-inter",
						title: "Inter",
						type: "registry:font",
					},
				],
				iconLibrary: "lucide",
				menuAccent: "subtle",
				menuColor: "default",
				radius: "0.5rem",
				style: "vega",
				theme: "neutral",
			},
			typescript: true,
			sveltekit: true,
			registry: `${SITE_BASE_URL}/registry`,
			resolvedPaths: {
				cwd: resolvePath("../fixtures/legacy/post-init-default"),
				components: resolvePath("../fixtures/legacy/src/lib/components"),
				hooks: resolvePath("../fixtures/legacy/src/lib/hooks"),
				lib: resolvePath("../fixtures/legacy/src/lib"),
				tailwindCss: resolvePath("../fixtures/legacy/post-init-default/src/app.css"),
				ui: resolvePath("../fixtures/legacy/src/lib/components/ui"),
				utils: resolvePath("../fixtures/legacy/src/lib/utils"),
			},
		});
	});
});
