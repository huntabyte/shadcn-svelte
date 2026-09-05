import { getContext, setContext } from "svelte";

export type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped";
export type QuestionnaireShortcutMode = "letters" | "numbers";

export type QuestionnaireChoiceDefinition = {
	disabled?: boolean;
	value: string;
};

export type QuestionnaireItemDefinition = {
	choices?: readonly QuestionnaireChoiceDefinition[];
	disabled?: boolean;
	name: string;
	required?: boolean;
};

export type QuestionnaireItemRegistration = {
	name: string;
	element: HTMLFieldSetElement | null;
	required: boolean;
	multiple: boolean;
	disabled: boolean;
	invalid: boolean;
};

export type QuestionnaireItemContext = {
	name: string;
	required: boolean;
	multiple: boolean;
	disabled: boolean;
	registerDescription: (id: string) => () => void;
	registerError: (id: string) => () => void;
};

export type QuestionnaireChoiceContext = {
	value: string;
	disabled: boolean;
	checked: boolean;
	invalid: boolean;
	shortcut: string | null;
	type: "checkbox" | "radio";
	setControl: (control: HTMLInputElement | null) => void;
	handleChange: (event: Event) => void;
};

export type QuestionnaireContext = {
	items: readonly QuestionnaireItemDefinition[];
	activeItem: string;
	current: number;
	total: number;
	first: boolean;
	last: boolean;
	activeRequired: boolean | null;
	shortcuts: QuestionnaireShortcutMode | null;
	registerItem: (registration: QuestionnaireItemRegistration) => () => void;
	setItem: (name: string, focus?: "item" | "invalid") => void;
	next: () => void;
	previous: () => void;
	skip: () => void;
	validate: (name?: string) => boolean;
	status: (name?: string) => QuestionnaireItemStatus;
	invalid: (name?: string) => boolean;
	markAnswered: (name?: string) => void;
	multiple: (name?: string) => boolean;
	selected: (name: string, value: string) => boolean;
	selectControl: (name: string, control: HTMLInputElement) => void;
	shortcut: (name: string, value: string, control: HTMLInputElement | null) => string | null;
};

const key = Symbol("questionnaire");
const itemKey = Symbol("questionnaire-item");
const choiceKey = Symbol("questionnaire-choice");

export function createQuestionnaireContext(context: QuestionnaireContext) {
	return setContext(key, context);
}

export function useQuestionnaireContext() {
	return getContext<QuestionnaireContext>(key);
}

export function createQuestionnaireItemContext(context: QuestionnaireItemContext) {
	return setContext(itemKey, context);
}

export function useQuestionnaireItemContext() {
	return getContext<QuestionnaireItemContext>(itemKey);
}

export function createQuestionnaireChoiceContext(context: QuestionnaireChoiceContext) {
	return setContext(choiceKey, context);
}

export function useQuestionnaireChoiceContext() {
	return getContext<QuestionnaireChoiceContext>(choiceKey);
}
