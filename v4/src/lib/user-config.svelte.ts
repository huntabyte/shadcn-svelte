import { Context } from "runed";
import { z } from "zod";

export const USER_CONFIG_COOKIE_NAME = "scn_user_config";

const layoutSchema = z.enum(["fixed", "full"]).default("full");
const installationTypeSchema = z.enum(["cli", "manual"]).default("cli");
const packageManagerSchema = z.enum(["npm", "yarn", "pnpm", "bun"]).default("npm");
const colorFormatSchema = z.enum(["class", "hex", "rgb", "hsl", "oklch", "var"]).default("oklch");
const activeTheme = z
	.enum([
		"default",
		"scaled",
		"mono",
		"blue",
		"green",
		"amber",
		"rose",
		"purple",
		"orange",
		"teal",
	])
	.default("default");

export type Layout = z.infer<typeof layoutSchema>;
export type InstallationType = z.infer<typeof installationTypeSchema>;
export type PackageManager = z.infer<typeof packageManagerSchema>;
export type ColorFormat = z.infer<typeof colorFormatSchema>;
export type ActiveTheme = z.infer<typeof activeTheme>;

const userConfigSchema = z
	.object({
		layout: layoutSchema,
		installationType: installationTypeSchema,
		packageManager: packageManagerSchema,
		colorFormat: colorFormatSchema,
		activeTheme: activeTheme,
	})
	.default({
		layout: "full",
		installationType: "cli",
		packageManager: "npm",
		colorFormat: "oklch",
		activeTheme: "default",
	});

export type UserConfigType = z.infer<typeof userConfigSchema>;

function parseCookie(cookie: string): Record<string, string> {
	const cookies = cookie.split(";");
	const cookieMap: Record<string, string> = {};
	for (const cookie of cookies) {
		const [key, value] = cookie.split("=");
		cookieMap[key] = value;
	}
	return cookieMap;
}

export function parseUserConfig(cookie: string) {
	const cookieMap = parseCookie(cookie);
	const userConfig = cookieMap[USER_CONFIG_COOKIE_NAME];
	if (!userConfig) return userConfigSchema.parse({});
	return userConfigSchema.parse(JSON.parse(userConfig));
}

export class UserConfig {
	#config = $state.raw(userConfigSchema.parse({}));
	#cookieValue = $derived(JSON.stringify(this.#config));

	constructor(config: UserConfigType) {
		this.#config = config;

		$effect.pre(() => {
			document.cookie = `${USER_CONFIG_COOKIE_NAME}=${this.#cookieValue}; path=/; max-age=31536000; SameSite=Lax;`;
		});
	}

	get current() {
		return this.#config;
	}

	setConfig(config: Partial<UserConfigType>) {
		this.#config = { ...this.#config, ...config };
	}
}

export const UserConfigContext = new Context<UserConfig>("UserConfigContext");
