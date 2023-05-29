import { z } from "zod";

export const shadConfigSchema = z
	.object({
		value: z.object({
			type: z.literal("ObjectExpression"),
			properties: z.array(
				z.object({
					type: z.literal("Property"),
					key: z.object({
						type: z.literal("Identifier"),
						name: z.enum(["componentPath"])
					}),
					value: z.object({
						type: z.literal("Literal"),
						value: z.string()
					})
				})
			)
		})
	})
	.transform((data) => {
		return {
			componentPath: data.value.properties[0].value.value
		};
	});

export type ShadConfig = z.infer<typeof shadConfigSchema>;
