import { getContext, setContext } from "svelte";

export type QuestionnaireItem = {
	name: string;
	prompt?: string;
	description?: string;
	required?: boolean;
	multiple?: boolean;
	disabled?: boolean;
};

export type QuestionnaireContext = {
	items: QuestionnaireItem[];
	activeItem: string;
	current: number;
	total: number;
	setItem: (name: string) => void;
	next: () => void;
	previous: () => void;
	skip: () => void;
	validate: (name?: string) => boolean;
	form: HTMLFormElement | null;
	shortcuts: "letters" | "numbers" | null;
	item: (name?: string) => QuestionnaireItem | undefined;
	value: (name: string) => string[];
	markTouched: (name?: string) => void;
	touched: (name?: string) => boolean;
};

const key = Symbol("questionnaire");

export function createQuestionnaireContext(context: QuestionnaireContext) {
	return setContext(key, context);
}

export function useQuestionnaireContext() {
	return getContext<QuestionnaireContext>(key);
}
