// Adapted from https://github.com/shadcn-ui/ui/blob/main/packages/react/src/questionnaire/utils.ts
import type { AnswerControlRegistration, QuestionnaireShortcutMode } from "./types.js";

export function hasInputValue(value: unknown) {
	if (Array.isArray(value)) {
		return value.some((item) => String(item).trim().length > 0);
	}

	return value !== undefined && value !== null && String(value).trim().length > 0;
}

export function getShortcutKeys(shortcuts: QuestionnaireShortcutMode | null) {
	if (shortcuts === "letters") {
		return Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
	}

	if (shortcuts === "numbers") {
		return Array.from({ length: 9 }, (_, index) => String(index + 1));
	}

	return [];
}

export function getShortcutFromKey(key: string, shortcuts: QuestionnaireShortcutMode) {
	const normalizedKey = shortcuts === "letters" ? key.toUpperCase() : key;

	return getShortcutKeys(shortcuts).includes(normalizedKey) ? normalizedKey : null;
}

export function getAnswerKeyShortcuts(shortcut: string | null, filled: boolean) {
	return [shortcut, filled ? "Enter" : null].filter(Boolean).join(" ") || undefined;
}

export function isAnswerFilled(answer: AnswerControlRegistration) {
	if (answer.type === "choice") {
		return answer.element.checked;
	}

	return answer.element.hasAttribute("name") && hasInputValue(answer.element.value);
}

export function isEmptyNavigableInput(answer: AnswerControlRegistration | null) {
	return (
		answer?.type === "input" &&
		["email", "password", "search", "tel", "text", "url"].includes(answer.element.type) &&
		!hasInputValue(answer.element.value)
	);
}

export function isTextEntryTarget(element: Element) {
	if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
		return true;
	}

	if (element instanceof HTMLInputElement) {
		return !["button", "checkbox", "radio", "reset", "submit"].includes(element.type);
	}

	return element instanceof HTMLElement && element.isContentEditable;
}

export function isRadioTarget(element: Element) {
	return element instanceof HTMLInputElement && element.type === "radio";
}

/** Sorts registrations (items or answer controls) by the DOM order of their elements. */
export function compareDocumentOrder<T extends { element: Element }>(first: T, second: T) {
	if (first.element === second.element) {
		return 0;
	}

	const position = first.element.compareDocumentPosition(second.element);

	if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
		return -1;
	}

	if (position & Node.DOCUMENT_POSITION_PRECEDING) {
		return 1;
	}

	return 0;
}
