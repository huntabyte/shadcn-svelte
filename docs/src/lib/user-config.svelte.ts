import { Context } from "runed";
import { z } from "zod/v4";

export const USER_CONFIG_COOKIE_NAME = "scn_user_config";

const layoutSchema = z.enum(["fixed", "full"]).default("full");
const installationTypeSchema = z.enum(["cli", "manual"]).default("cli");
const packageManagerSchema = z.enum(["npm", "yarn", "pnpm", "bun"]).default("pnpm");
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
		"violet",
		"red",
		"yellow",
		"neutral",
	])
	.default("default");

export type Layout = z.infer<typeof layoutSchema>;
export type InstallationType = z.infer<typeof installationTypeSchema>;
export type PackageManager = z.infer<typeof packageManagerSchema>;
export type ColorFormat = z.infer<typeof colorFormatSchema>;
export type ActiveTheme = z.infer<typeof activeTheme>;

export const userConfigSchema = z
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
		cookieMap[key.trim()] = decodeURIComponent(value);
	}
	return cookieMap;
}

export function parseUserConfig(cookie: string): UserConfigType {
	const cookieMap = parseCookie(cookie);
	const userConfig = cookieMap[USER_CONFIG_COOKIE_NAME];
	if (!userConfig) return userConfigSchema.parse({});
	return userConfigSchema.parse(JSON.parse(userConfig));
}

export class UserConfig {
	#config: UserConfigType;

	constructor(config: UserConfigType) {
		this.#config = $state.raw(config);
	}

	get current(): UserConfigType {
		return this.#config;
	}

	setConfig(config: Partial<UserConfigType>): void {
		this.#config = { ...this.#config, ...config };
		document.cookie = `${USER_CONFIG_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(this.#config))}; path=/; max-age=31536000; SameSite=Lax;`;

		if (config.layout) updateLayoutClass(this.#config.layout);
	}
}

function updateLayoutClass(newLayout: Layout): void {
	if (typeof document === "undefined") return;

	// Remove any existing layout classes
	document.documentElement.classList.remove("layout-fixed", "layout-full");
	// Add the new layout class
	document.documentElement.classList.add(`layout-${newLayout}`);
}

export const UserConfigContext = new Context<UserConfig>("UserConfigContext");
