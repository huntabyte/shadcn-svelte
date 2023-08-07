import type { Component } from "./get-components";
import prompts from "prompts";
import { getConfig, setConfig } from "./set-config";

export async function promptForComponents(
	components: Component[],
	message: string
) {
	const { components: selectedComponents } = await prompts({
		type: "multiselect",
		name: "components",
		message,
		hint: "<SPACE> to select. <A> to select all.",
		instructions: false,
		choices: components.map((component) => ({
			title: component.name,
			value: component
		}))
	});

	return selectedComponents;
}

export async function promptForDestinationDir() {
	const config = await getConfig();

	if (!config) {
		const { dir } = await prompts([
			{
				type: "text",
				name: "dir",
				message: "Where would you like to install the component(s)?",
				initial: "./src/lib/components/ui"
			}
		]);
		await setConfig(dir);
		return dir;
	}

	return config.componentPath;
}
