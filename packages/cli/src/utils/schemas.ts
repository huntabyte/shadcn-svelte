import { z } from "zod";

export const shadConfigSchema = z.object({
	componentPath: z.string()
});

export type ShadConfig = z.infer<typeof shadConfigSchema>;
