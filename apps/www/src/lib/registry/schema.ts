import * as z from "zod";

export const registrySchema = z.array(
	z.object({
		name: z.string(),
		dependencies: z.array(z.string()),
		registryDependencies: z.array(z.string()),
		files: z.array(z.string()),
		type: z.enum([
			"components:ui",
			"components:component",
			"components:example"
		])
	})
);

export type Registry = z.infer<typeof registrySchema>;
