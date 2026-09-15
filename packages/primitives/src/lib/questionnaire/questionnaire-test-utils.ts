import { flushSync, mount, unmount, type Component } from "svelte";
import QuestionnaireCases from "./questionnaire-cases.svelte";
import { QuestionnaireTestModel } from "./questionnaire-test-model.svelte.ts";

export let container: HTMLDivElement;
let app: ReturnType<typeof mount> | null = null;
export let model: QuestionnaireTestModel;

export function setContainer(next: HTMLDivElement) {
	container = next;
}

export function requiredElement<T extends Element>(selector: string) {
	const element = container.querySelector<T>(selector);
	if (!element) throw new Error(`Missing test element: ${selector}`);
	return element;
}

export function form() {
	return requiredElement<HTMLFormElement>('[data-testid="root"]');
}

export function progress() {
	return requiredElement<HTMLElement>('[data-testid="progress"]');
}

export function item(value: string) {
	return requiredElement<HTMLFieldSetElement>(`[data-testid="${value}"]`);
}

export function choice(testId: string) {
	return requiredElement<HTMLLabelElement>(`[data-testid="${testId}"]`);
}

export function choiceInput(testId: string) {
	const input = choice(testId).querySelector<HTMLInputElement>("input");
	if (!input) throw new Error(`Missing choice input: ${testId}`);
	return input;
}

export function ssrChoice(value: string) {
	return requiredElement<HTMLLabelElement>(`[data-testid="choice-${value}"]`);
}

export function ssrChoiceInput(value: string) {
	return requiredElement<HTMLInputElement>(`[data-testid="input-${value}"]`);
}

export function shortcut(value: string) {
	return requiredElement<HTMLElement>(`[data-testid="shortcut-${value}"]`);
}

export function freeform(testId: string) {
	return requiredElement<HTMLInputElement>(`[data-testid="${testId}"]`);
}

export function error(testId: string) {
	return requiredElement<HTMLParagraphElement>(`[data-testid="${testId}"]`);
}

export function previous() {
	return requiredElement<HTMLButtonElement>('[data-testid="previous"]');
}

export function skip() {
	return requiredElement<HTMLButtonElement>('[data-testid="skip"]');
}

export function next() {
	return requiredElement<HTMLButtonElement>('[data-testid="next"]');
}

export function submit() {
	return requiredElement<HTMLButtonElement>('[data-testid="submit"]');
}

export function action(name: "next" | "previous" | "skip" | "submit") {
	return requiredElement<HTMLButtonElement>(`[data-testid="${name}"]`);
}

export function actionsMarkup() {
	return (["previous", "skip", "next", "submit"] as const)
		.map((name) => action(name).outerHTML)
		.join("");
}

export function click(element: HTMLElement) {
	element.click();
	flushSync();
}

export function choose(testId: string) {
	click(choiceInput(testId));
}

export function type(element: HTMLInputElement, value: string) {
	element.focus();
	Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(element, value);
	element.dispatchEvent(new Event("input", { bubbles: true }));
	flushSync();
}

export function keydown(element: HTMLElement, key: string, options: KeyboardEventInit = {}) {
	element.focus();
	element.dispatchEvent(
		new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			key,
			...options,
		})
	);
	flushSync();
}

export async function flushEffects() {
	flushSync();
	await Promise.resolve();
	await Promise.resolve();
}

export function createModel(scenario = "default") {
	model = new QuestionnaireTestModel();
	model.scenario = scenario;
	return model;
}

export function renderCase(scenario = "default", setup?: (next: QuestionnaireTestModel) => void) {
	createModel(scenario);
	setup?.(model);
	app = mount(QuestionnaireCases, { target: container, props: { model } });
	flushSync();
	return app;
}

export function renderComponent(component: Component, props: Record<string, unknown> = {}) {
	app = mount(component, { target: container, props });
	flushSync();
	return app;
}

export function unmountApp() {
	if (!app) return;
	unmount(app);
	app = null;
}
