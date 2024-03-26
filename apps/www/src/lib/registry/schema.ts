import * as z from "zod";

export const registrySchema = z.array(
	z.object({
		name: z.string(),
		style: z.string(),
		dependencies: z.array(z.string()),
		registryDependencies: z.array(z.string()),
		files: z.array(z.object({ name: z.string(), content: z.string(), path: z.string() })),
		type: z.enum([
			"components:ui",
			"components:component",
			"components:example",
			"components:block",
		]),
	})
);

export type Registry = z.infer<typeof registrySchema>;
