import { z } from "zod";

export const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, "Username must be at least 2 characters.")
		.max(30, "Username must not be longer than 30 characters."),
	email: z
		.string({ required_error: "Please select an email to display" })
		.email(),
	bio: z.string().max(160).min(4),
	urls: z.string().url().array()
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const defaultValues = {
	bio: "I own a computer.",
	urls: ["https://shadcn.com", "http://twitter.com/shadcn"]
};
