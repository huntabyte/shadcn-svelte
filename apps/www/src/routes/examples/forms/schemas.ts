import { z } from "zod";

export const registerSchema = z
	.object({
		name: z.string().min(1, "Name is required").max(64),
		email: z.string().email("Email must be a valid email"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(64),
		passwordConfirm: z
			.string()
			.min(8, "Confirm password must be at least 8 characters")
			.max(64),
		acceptTerms: z
			.boolean()
			.refine((v) => v === true, "You must accept terms and conditions")
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords must match",
				path: ["passwordConfirm"]
			});
		}
	});
