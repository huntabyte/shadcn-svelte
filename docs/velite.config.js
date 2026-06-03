// @ts-check
import { defineCollection, defineConfig, s } from "velite";

const dateSchema = s.union([s.string(), s.date()]).transform((date) => {
	if (date instanceof Date) {
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, "0");
		const day = String(date.getUTCDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		throw new Error(`Invalid date "${date}". Expected YYYY-MM-DD.`);
	}

	return date;
});

const docSchema = s
	.object({
		title: s.string(),
		description: s.string(),
		date: dateSchema.optional(),
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

const changelog = defineCollection({
	name: "changelog",
	pattern: "./changelog/**/*.md",
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
		changelog,
	},
	output: { assets: "static" },
});
