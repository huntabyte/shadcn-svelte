import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1).max(64),
	email: z.string().email(),
	password: z.string().min(8).max(64),
	passwordConfirm: z.string().min(8).max(64)
});
