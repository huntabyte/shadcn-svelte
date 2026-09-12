import { defineAddon, defineAddonOptions } from "sv";
import { color, resolveCommandArray, transforms } from "./sv-utils.js";
import { mergeThemeCss } from "./utils/css.js";
import { listTemplatePaths, readTemplateFile, resolveProjectPath } from "./utils/templates.js";

const options = defineAddonOptions()
	.add("demo", {
		question: "Include a demo page for the registry?",
		type: "boolean",
		default: true,
	})
	.build();

// Paths to skip when converting templates. Resolved later after the initial template loop.
const SKIP_PATHS = new Set(["src/app.css", "src/routes/+page.svelte"]);

export default defineAddon({
	id: "@shadcn-svelte/registry",
	shortDescription: "shadcn-svelte custom registry template",
	homepage: "https://shadcn-svelte.com/docs/registry",
	options,

	setup: ({ isKit, language, unsupported, dependsOn }) => {
		if (!isKit) unsupported("Requires SvelteKit");
		if (language !== "ts") unsupported("Requires TypeScript");
		dependsOn("tailwindcss");
	},

	run: ({ sv, options, directory, file }) => {
		sv.devDependency("shadcn-svelte", "^1.4.2");
		sv.devDependency("bits-ui", "^2.7.0");
		sv.devDependency("cn", "^0.2.5");
		sv.devDependency("tailwind-variants", "^3.3.0");
		sv.devDependency("tw-animate-css", "^1.3.3");
		sv.devDependency("zod", "^4.4.3");

		sv.file(
			file.package,
			transforms.json(({ data, json }) => {
				json.packageScriptsUpsert(data, "build:registry", "shadcn-svelte registry build");
			})
		);

		for (const templatePath of listTemplatePaths()) {
			if (SKIP_PATHS.has(templatePath)) continue;

			const templateContent = readTemplateFile(templatePath);
			const projectPath = resolveProjectPath(templatePath, directory);
			sv.file(
				projectPath,
				transforms.text(({ content }) => content || templateContent)
			);
		}

		sv.file(
			file.stylesheet,
			transforms.text(({ content }) => mergeThemeCss(content, readTemplateFile("src/app.css")))
		);

		if (options.demo) {
			sv.file(
				`${directory.kitRoutes}/demo/shadcn-svelte-registry/+page.svelte`,
				transforms.text(() => readTemplateFile("src/routes/+page.svelte"))
			);
		}
	},

	nextSteps: ({ packageManager }) => {
		const runCmd = resolveCommandArray(packageManager, "run", ["build:registry"]);
		const execCmd = resolveCommandArray(packageManager, "execute", [
			"shadcn-svelte@latest",
			"add",
			"http://localhost:5173/r/<name>.json",
		]);
		return [
			`Run ${color.command(runCmd.join(" "))} to build your registry JSON files`,
			`Serve the project and install items with ${color.command(execCmd.join(" "))}`,
			`Docs: ${color.website("https://shadcn-svelte.com/docs/registry")}`,
		];
	},
});
