import {
	DEFAULT_CONFIG,
	designSystemConfigSchema,
	getFont,
	RADII,
	type BaseColorName,
	type IconLibraryName,
	type MenuAccentValue,
	type MenuColorValue,
	type StyleName,
	type ThemeName,
} from "$lib/registry/config.js";
import type { RegistryFont } from "@shadcn-svelte/registry";
import { error, json, redirect } from "@sveltejs/kit";

export type DesignSystemResponse = {
	style: StyleName;
	iconLibrary: IconLibraryName;
	baseColor: BaseColorName;
	theme: ThemeName;
	/**
	 * Needs to be the name of the font that will be used for the font provider
	 */
	fonts: RegistryFont[];
	menuAccent: MenuAccentValue;
	menuColor: MenuColorValue;
	radius: `${number}rem`;
};

function response(data: DesignSystemResponse) {
	return json(data);
}

export function GET({ request, url }) {
	const accept = request.headers.get("accept") ?? "text/html";

	// redirect browser sessions to the default preview
	if (accept.includes("text/html")) {
		redirect(303, `/create/accordion${url.search}`);
	}

	const designSystemConfig = {
		style: url.searchParams.get("style") ?? DEFAULT_CONFIG.style,
		iconLibrary: url.searchParams.get("iconLibrary") ?? DEFAULT_CONFIG.iconLibrary,
		baseColor: url.searchParams.get("baseColor") ?? DEFAULT_CONFIG.baseColor,
		theme: url.searchParams.get("theme") ?? DEFAULT_CONFIG.theme,
		font: url.searchParams.get("font") ?? DEFAULT_CONFIG.font,
		menuAccent: url.searchParams.get("menuAccent") ?? DEFAULT_CONFIG.menuAccent,
		menuColor: url.searchParams.get("menuColor") ?? DEFAULT_CONFIG.menuColor,
		radius: url.searchParams.get("radius") ?? DEFAULT_CONFIG.radius,
	};

	const result = designSystemConfigSchema.safeParse(designSystemConfig);
	if (!result.success) {
		error(
			400,
			result.error.issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n")
		);
	}

	// all other requests get the json create config
	return response({
		style: result.data.style,
		iconLibrary: result.data.iconLibrary,
		baseColor: result.data.baseColor,
		theme: result.data.theme,
		fonts: [getFont(result.data.font)!],
		menuAccent: result.data.menuAccent,
		menuColor: result.data.menuColor,
		radius: RADII.find((r) => r.name === result.data.radius)!.value,
	});
}
