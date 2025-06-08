// @ts-check
import { defineCollection, defineConfig, s } from "velite";

const docSchema = s
	.object({
		title: s.string(),
		description: s.string(),
		path: s.path(),
		navLabel: s.string().optional(),
		links: s
			.object({
				doc: s.string().optional(),
				api: s.string().optional(),
				source: s.string().optional(),
			})
			.optional(),
		component: s.boolean().default(false),
		toc: s.toc(),
	})
	.transform((data) => {
		return {
			...data,
			slug: data.path.split("/").slice(1).join("/"),
			slugFull: `/${data.path}`,
		};
	});

const gettingStarted = defineCollection({
	name: "gettingStarted",
	pattern: "./*.md",
	schema: docSchema,
});

const migration = defineCollection({
	name: "migration",
	pattern: "./migration/**/*.md",
	schema: docSchema,
});

const components = defineCollection({
	name: "components",
	pattern: "./components/**/*.md",
	schema: docSchema,
});

const installation = defineCollection({
	name: "installation",
	pattern: "./installation/**/*.md",
	schema: docSchema,
});

const darkMode = defineCollection({
	name: "darkMode",
	pattern: "./dark-mode/**/*.md",
	schema: docSchema,
});

const registry = defineCollection({
	name: "registry",
	pattern: "./registry/**/*.md",
	schema: docSchema,
});

export default defineConfig({
	root: "./content",
	collections: {
		gettingStarted,
		migration,
		components,
		installation,
		darkMode,
		registry,
	},
	output: { assets: "static" },
});
