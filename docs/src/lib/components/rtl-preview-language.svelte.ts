import { getContext, setContext } from "svelte";

export type RtlPreviewLanguage = "en" | "ar" | "he";

type RtlPreviewLanguageContext = {
	readonly current: RtlPreviewLanguage;
	set(value: RtlPreviewLanguage): void;
};

const RTL_PREVIEW_LANGUAGE_CONTEXT = Symbol("rtl-preview-language");

const fallback: RtlPreviewLanguageContext = {
	current: "ar",
	set: () => {},
};

export const rtlPreviewLanguageOptions = [
	{ value: "en", label: "English", dir: "ltr" },
	{ value: "ar", label: "Arabic (العربية)", dir: "rtl" },
	{ value: "he", label: "Hebrew (עברית)", dir: "rtl" },
] as const satisfies Array<{
	value: RtlPreviewLanguage;
	label: string;
	dir: "ltr" | "rtl";
}>;

export function getRtlPreviewDirection(language: RtlPreviewLanguage) {
	return rtlPreviewLanguageOptions.find((option) => option.value === language)?.dir ?? "rtl";
}

export function setRtlPreviewLanguageContext(
	language: () => RtlPreviewLanguage,
	setLanguage: (value: RtlPreviewLanguage) => void
) {
	return setContext<RtlPreviewLanguageContext>(RTL_PREVIEW_LANGUAGE_CONTEXT, {
		get current() {
			return language();
		},
		set: setLanguage,
	});
}

export function useRtlPreviewLanguage() {
	return getContext<RtlPreviewLanguageContext>(RTL_PREVIEW_LANGUAGE_CONTEXT) ?? fallback;
}
