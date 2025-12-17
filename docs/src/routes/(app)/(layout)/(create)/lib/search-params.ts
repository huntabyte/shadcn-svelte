import {
	MENU_ACCENTS,
	RADII,
	type MenuAccentValue,
	type RadiusValue,
} from "$lib/registry/config.js";
import { useSearchParams } from "runed/kit";
import { z } from "zod/v4";

export const CreateSearchParamsSchema = z.object({
	item: z.string().default("accordion"),
	theme: z.string().default("neutral"),
	style: z.string().default("vega"),
	font: z.string().default("inter"),
	radius: z.enum(RADII.map((r) => r.name) as [RadiusValue, ...RadiusValue[]]).default("default"),
	menuAccent: z
		.enum(MENU_ACCENTS.map((a) => a.value) as [MenuAccentValue, ...MenuAccentValue[]])
		.default("subtle"),
	baseColor: z.string().default("neutral"),
});

export function useCreateSearchParams() {
	return useSearchParams(CreateSearchParamsSchema);
}
