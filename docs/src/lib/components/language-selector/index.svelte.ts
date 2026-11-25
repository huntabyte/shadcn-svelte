import { getContext, setContext } from "svelte";
export type Language = "en" | "ar" | "he";
export type Direction = "ltr" | "rtl";
export type Translations<T extends Record<string, string> = Record<string, string>> = Record<
	Language,
	{ dir: Direction; locale?: string; values: T }
>;
const key = Symbol("example-language");
export type LanguageContext = { language: Language; setLanguage: (value: Language) => void };
export function setLanguageContext(context: LanguageContext) {
	return setContext(key, context);
}
export function useLanguageContext() {
	return getContext<LanguageContext | undefined>(key);
}
export function useTranslation<T extends Translations>(
	translations: T,
	defaultLanguage: Language = "ar"
) {
	const context = useLanguageContext();
	let localLanguage = $state(defaultLanguage);
	return {
		get language() {
			return context?.language ?? localLanguage;
		},
		setLanguage(value: Language) {
			if (context) context.setLanguage(value);
			else localLanguage = value;
		},
		get dir() {
			return translations[context?.language ?? localLanguage].dir;
		},
		get locale() {
			return translations[context?.language ?? localLanguage].locale;
		},
		get values() {
			return translations[context?.language ?? localLanguage].values as {
				[K in keyof T["en"]["values"]]: string;
			};
		},
	};
}
export const languageOptions = [
	{ value: "en", label: "English" },
	{ value: "ar", label: "Arabic (العربية)" },
	{ value: "he", label: "Hebrew (עברית)" },
] as const;
