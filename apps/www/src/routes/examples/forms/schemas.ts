import { z } from "zod";

export const profileSchema = z.object({
	username: z.string().min(1, "Username is required").max(64),
	email: z.string().email("Email must be a valid email"),
	bio: z.string().max(256, "Bio must be less than 256 characters"),
	urls: z.array(z.string().url("URL must be a valid URL"))
});
