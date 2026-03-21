import { Context } from "runed";
import { z } from "zod";
import {
	applyLocalizationToDocument,
	DEFAULT_DIRECTION,
	DEFAULT_LANGUAGE_TAG,
	inferDirectionFromLanguageTag,
	normalizeLocalizationConfig,
} from "./localization.svelte.js";

export const USER_CONFIG_COOKIE_NAME = "scn_user_config";

const layoutSchema = z.enum(["fixed", "full"]).default("full");
const installationTypeSchema = z.enum(["cli", "manual"]).default("cli");
const packageManagerSchema = z.enum(["npm", "yarn", "pnpm", "bun"]).default("pnpm");
const colorFormatSchema = z.enum(["class", "hex", "rgb", "hsl", "oklch", "var"]).default("oklch");
const languageTagSchema = z.string().trim().min(1).default(DEFAULT_LANGUAGE_TAG);
const directionSchema = z.enum(["ltr", "rtl"]).default(DEFAULT_DIRECTION);
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
export type LanguageTag = z.infer<typeof languageTagSchema>;
export type LocalizationDirection = z.infer<typeof directionSchema>;

const baseUserConfigSchema = z
	.object({
		layout: layoutSchema,
		installationType: installationTypeSchema,
		packageManager: packageManagerSchema,
		colorFormat: colorFormatSchema,
		activeTheme: activeTheme,
		languageTag: languageTagSchema,
		direction: directionSchema,
	})
	.default({
		layout: "full",
		installationType: "cli",
		packageManager: "npm",
		colorFormat: "hsl",
		activeTheme: "default",
		languageTag: DEFAULT_LANGUAGE_TAG,
		direction: DEFAULT_DIRECTION,
	});

export const userConfigSchema = baseUserConfigSchema.transform((config) => ({
	...config,
	...normalizeLocalizationConfig(config),
}));

export type UserConfigType = z.infer<typeof userConfigSchema>;
export const DEFAULT_USER_CONFIG = userConfigSchema.parse({});

function parseCookie(cookie: string): Record<string, string> {
	const cookies = cookie.split(";");
	const cookieMap: Record<string, string> = {};
	for (const cookie of cookies) {
		const trimmedCookie = cookie.trim();
		if (!trimmedCookie) continue;

		const separatorIndex = trimmedCookie.indexOf("=");
		if (separatorIndex === -1) continue;

		const key = trimmedCookie.slice(0, separatorIndex).trim();
		const value = trimmedCookie.slice(separatorIndex + 1);

		if (!key) continue;

		cookieMap[key] = decodeURIComponent(value);
	}
	return cookieMap;
}

export function parseUserConfig(cookie: string): UserConfigType {
	const cookieMap = parseCookie(cookie);
	const userConfig = cookieMap[USER_CONFIG_COOKIE_NAME];
	if (!userConfig) return DEFAULT_USER_CONFIG;

	try {
		return userConfigSchema.parse(JSON.parse(userConfig));
	} catch {
		return DEFAULT_USER_CONFIG;
	}
}

export class UserConfig {
	#config: UserConfigType;

	constructor(config: UserConfigType) {
		this.#config = $state.raw(config);
		syncDocumentConfig(this.#config);
	}

	get current(): UserConfigType {
		return this.#config;
	}

	setConfig(config: Partial<UserConfigType>): void {
		this.#config = userConfigSchema.parse({
			...this.#config,
			...config,
			...(config.languageTag !== undefined && config.direction === undefined
				? {
						direction: inferDirectionFromLanguageTag(config.languageTag),
					}
				: {}),
		});
		document.cookie = `${USER_CONFIG_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(this.#config))}; path=/; max-age=31536000; SameSite=Lax;`;
		syncDocumentConfig(this.#config);
	}
}

function updateLayoutClass(newLayout: Layout): void {
	if (typeof document === "undefined") return;

	// Remove any existing layout classes
	document.documentElement.classList.remove("layout-fixed", "layout-full");
	// Add the new layout class
	document.documentElement.classList.add(`layout-${newLayout}`);
}

function syncDocumentConfig(
	config: Pick<UserConfigType, "layout" | "languageTag" | "direction">
): void {
	updateLayoutClass(config.layout);
	applyLocalizationToDocument(config);
}

export const UserConfigContext = new Context<UserConfig>("UserConfigContext");
