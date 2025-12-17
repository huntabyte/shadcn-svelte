import { useSearchParams } from "runed/kit";
import { z } from "zod/v4";

export const CreateSearchParamsSchema = z.object({
	item: z.string().default("Home"),
	theme: z.string().default("neutral"),
	style: z.string().default("vega"),
	font: z.string().default("inter"),
	radius: z.string().default("0.5rem"),
	baseColor: z.string().default("neutral"),
});

export function useCreateSearchParams() {
	return useSearchParams(CreateSearchParamsSchema);
}