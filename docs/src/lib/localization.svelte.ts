import { Context } from "runed";

export type Direction = "ltr" | "rtl";
export type PhysicalSide = "top" | "bottom" | "left" | "right";
export type LogicalSide = PhysicalSide | "start" | "end";

export type LocalizationConfig = {
	languageTag: string;
	direction: Direction;
};

export type DirectionSignal = {
	readonly current: Direction;
};

export const DEFAULT_LANGUAGE_TAG = "en";
export const DEFAULT_DIRECTION: Direction = "ltr";

const RTL_LANGUAGE_PREFIXES = new Set([
	"ar",
	"arc",
	"ckb",
	"dv",
	"fa",
	"ha",
	"he",
	"khw",
	"ks",
	"ku",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi",
]);

export const DirectionContext = new Context<DirectionSignal>("DirectionContext");

export function normalizeLanguageTag(languageTag?: string | null): string {
	if (!languageTag?.trim()) {
		return DEFAULT_LANGUAGE_TAG;
	}

	try {
		return Intl.getCanonicalLocales(languageTag)[0] ?? DEFAULT_LANGUAGE_TAG;
	} catch {
		return DEFAULT_LANGUAGE_TAG;
	}
}

export function inferDirectionFromLanguageTag(languageTag?: string | null): Direction {
	const [languagePrefix] = normalizeLanguageTag(languageTag).toLowerCase().split("-");
	return RTL_LANGUAGE_PREFIXES.has(languagePrefix) ? "rtl" : "ltr";
}

export function normalizeDirection(
	direction?: string | null,
	fallback: Direction = DEFAULT_DIRECTION
): Direction {
	if (direction === "rtl" || direction === "ltr") {
		return direction;
	}

	return fallback;
}

export function normalizeLocalizationConfig(
	config: Partial<LocalizationConfig> = {}
): LocalizationConfig {
	const languageTag = normalizeLanguageTag(config.languageTag);

	return {
		languageTag,
		direction: normalizeDirection(config.direction, inferDirectionFromLanguageTag(languageTag)),
	};
}

export function applyLocalizationToDocument(config: Partial<LocalizationConfig>): void {
	if (typeof document === "undefined") return;

	const normalized = normalizeLocalizationConfig(config);
	document.documentElement.lang = normalized.languageTag;
	document.documentElement.dir = normalized.direction;
}

export function getDocumentDirection(fallback: Direction = DEFAULT_DIRECTION): Direction {
	if (typeof document === "undefined") {
		return fallback;
	}

	return normalizeDirection(document.documentElement.getAttribute("dir"), fallback);
}

export function useDirection(fallbackDirection: Direction = DEFAULT_DIRECTION): DirectionSignal {
	try {
		return DirectionContext.get();
	} catch {
		return {
			get current() {
				return getDocumentDirection(fallbackDirection);
			},
		};
	}
}

export function resolveInlineSide(direction: Direction, side: LogicalSide): PhysicalSide {
	if (side === "start") {
		return direction === "ltr" ? "left" : "right";
	}

	if (side === "end") {
		return direction === "ltr" ? "right" : "left";
	}

	return side;
}
