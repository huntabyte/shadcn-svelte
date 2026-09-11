/** @vitest-environment jsdom */

import { flushSync, hydrate, unmount } from "svelte";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QuestionnaireCases from "./questionnaire-cases.svelte";
import type { QuestionnaireTestModel } from "./questionnaire-test-model.svelte.ts";
import {
	closeQuestionnaireSsrVite,
	renderQuestionnaireToString,
} from "./questionnaire-ssr-vite.js";
import {
	action,
	actionsMarkup,
	container,
	createModel,
	flushEffects,
	form,
	item,
	keydown,
	model,
	progress,
	requiredElement,
	setContainer,
	ssrChoice,
	ssrChoiceInput,
	shortcut,
	unmountApp,
} from "./questionnaire-test-utils.js";

let hydrated: ReturnType<typeof hydrate> | null = null;

beforeEach(() => {
	const nextContainer = document.createElement("div");
	document.body.appendChild(nextContainer);
	setContainer(nextContainer);
	hydrated = null;
});

afterEach(() => {
	if (hydrated) {
		unmount(hydrated);
		hydrated = null;
	}
	unmountApp();
	container.remove();
	vi.restoreAllMocks();
});

afterAll(async () => {
	await closeQuestionnaireSsrVite();
});

describe("Questionnaire server rendering", () => {
	it("renders collection progress, active item, actions, and shortcuts", async () => {
		await renderServerQuestionnaire();

		expect(form().dataset.current).toBe("1");
		expect(form().dataset.total).toBe("2");
		expect(form().hasAttribute("data-first")).toBe(true);
		expect(progress().textContent).toBe("Question 1 of 2");
		expect(progress().getAttribute("aria-valuenow")).toBe("1");
		expect(progress().getAttribute("aria-valuemax")).toBe("2");
		expect(item("scope").hasAttribute("data-active")).toBe(true);
		expect(item("scope").hidden).toBe(false);
		expect(item("disabled").hidden).toBe(true);
		expect(item("detail").hidden).toBe(true);
		expect(action("previous").hidden).toBe(true);
		expect(action("skip").hidden).toBe(true);
		expect(action("next").hidden).toBe(false);
		expect(action("next").dataset.status).toBe("unanswered");
		expect(action("submit").hidden).toBe(true);
		expect(ssrChoice("delegation").dataset.shortcut).toBe("A");
		expect(ssrChoiceInput("delegation").getAttribute("aria-keyshortcuts")).toBe("A");
		expect(ssrChoice("automatic").hasAttribute("data-shortcut")).toBe(false);
		expect(shortcut("automatic").hidden).toBe(true);
		expect(ssrChoice("questions").dataset.shortcut).toBe("B");
	});

	it("renders a requested optional item and its applicable actions", async () => {
		await renderServerQuestionnaire({ defaultItem: "detail" });

		expect(form().dataset.current).toBe("2");
		expect(form().hasAttribute("data-last")).toBe(true);
		expect(progress().textContent).toBe("Question 2 of 2");
		expect(item("scope").hidden).toBe(true);
		expect(item("detail").hasAttribute("data-active")).toBe(true);
		expect(action("previous").hidden).toBe(false);
		expect(action("skip").hidden).toBe(false);
		expect(action("next").hidden).toBe(true);
		expect(action("submit").hidden).toBe(false);
	});

	it("renders a controlled item from the collection", async () => {
		await renderMarkup("ssr", (next) => {
			next.item = "detail";
		});

		expect(progress().textContent).toBe("Question 2 of 2");
		expect(item("scope").hidden).toBe(true);
		expect(item("detail").hasAttribute("data-active")).toBe(true);
	});

	it.each(["missing", "disabled"])(
		"falls back from an invalid default item %s during render",
		async (defaultItem) => {
			await renderServerQuestionnaire({ defaultItem });

			expect(progress().textContent).toBe("Question 1 of 2");
			expect(item("scope").hasAttribute("data-active")).toBe(true);
			expect(item("detail").hidden).toBe(true);
		}
	);

	it("renders numeric shortcuts and leaves overflow choices unassigned", async () => {
		await renderMarkup("ssr-numeric");

		expect(ssrChoice("choice-1").dataset.shortcut).toBe("1");
		expect(ssrChoice("choice-9").dataset.shortcut).toBe("9");
		expect(ssrChoice("choice-10").hasAttribute("data-shortcut")).toBe(false);
	});

	it("renders an input-only item without fixed-choice definitions", async () => {
		await renderMarkup("ssr-input-only");

		expect(progress().textContent).toBe("Question 1 of 1");
		expect(item("input").hasAttribute("data-active")).toBe(true);
		expect(requiredElement<HTMLInputElement>('[data-testid="input-control"]').type).toBe("text");
		expect(action("submit").hidden).toBe(false);
	});

	it("renders both navigation directions for a middle item", async () => {
		await renderMarkup("ssr-middle");

		expect(progress().textContent).toBe("Question 2 of 3");
		expect(action("previous").hidden).toBe(false);
		expect(action("next").hidden).toBe(false);
		expect(action("submit").hidden).toBe(true);
	});

	it("pins the current defaultChecked server-rendering limitation", async () => {
		await renderMarkup("ssr-default-checked");

		expect(ssrChoiceInput("default").checked).toBe(false);
		expect(ssrChoice("default").hasAttribute("data-checked")).toBe(false);
	});
});

describe("Questionnaire hydration", () => {
	it("hydrates without changing collection-derived output", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		await renderMarkup("ssr");
		const initialMarkup = {
			actions: actionsMarkup(),
			progress: progress().outerHTML,
			root: form().outerHTML.match(/<form[^>]*>/)?.[0],
		};

		await hydrateMarkup();

		expect(consoleWarn).not.toHaveBeenCalled();
		expect(normalizeHydratedMarkup(progress().outerHTML)).toBe(
			normalizeHydratedMarkup(initialMarkup.progress)
		);
		expect(normalizeHydratedMarkup(actionsMarkup())).toBe(
			normalizeHydratedMarkup(initialMarkup.actions)
		);
		expect(normalizeHydratedMarkup(form().outerHTML.match(/<form[^>]*>/)?.[0] ?? "")).toBe(
			normalizeHydratedMarkup(initialMarkup.root ?? "")
		);
	});

	it("warns after falling back from an invalid default item", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		await renderMarkup("ssr", (next) => {
			next.defaultItem = "missing";
		});

		await hydrateMarkup();
		await flushEffects();

		expect(progress().textContent).toBe("Question 1 of 2");
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('defaultItem "missing" does not identify an enabled item')
		);
	});

	it("joins logical navigation to matching runtime items", async () => {
		await renderMarkup("ssr");
		await hydrateMarkup();

		ssrChoiceInput("delegation").click();
		flushSync();
		action("next").click();
		flushSync();

		expect(progress().textContent).toBe("Question 2 of 2");
		expect(item("scope").hidden).toBe(true);
		expect(item("detail").hasAttribute("data-active")).toBe(true);
	});

	it("keeps definition shortcut order authoritative after hydration", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		await renderMarkup("ssr-order");

		expect(ssrChoice("first").dataset.shortcut).toBe("B");
		expect(ssrChoice("second").dataset.shortcut).toBe("A");

		await hydrateMarkup();
		await flushEffects();

		keydown(item("order"), "A");

		expect(ssrChoiceInput("second").checked).toBe(true);
		expect(ssrChoiceInput("first").checked).toBe(false);
		expect(ssrChoiceInput("second").getAttribute("aria-keyshortcuts")).toContain("A");
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('Choice order for item "order" differs between Root.items')
		);
	});

	it("warns when rendered metadata differs from its definitions", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		await renderMarkup("ssr-metadata");
		await hydrateMarkup();
		await flushEffects();

		expect(consoleWarn).toHaveBeenCalledTimes(2);
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('Item "answer" has different required values in Root.items')
		);
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('Choice "fixed" in item "answer" has different disabled values')
		);
	});

	it("warns about duplicate item names and choice values", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		await renderMarkup("ssr-duplicates");
		await hydrateMarkup();
		await flushEffects();

		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('Item name "answer" is defined more than once')
		);
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('Choice value "fixed" is defined more than once in item "answer"')
		);
	});

	it("does not assign post-hydration shortcuts to omitted definitions", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		await renderMarkup("ssr-omitted");

		expect(shortcut("fixed").hidden).toBe(true);

		await hydrateMarkup();
		await flushEffects();

		expect(shortcut("fixed").hidden).toBe(true);
		expect(ssrChoiceInput("fixed").hasAttribute("aria-keyshortcuts")).toBe(false);
		expect(consoleWarn).toHaveBeenCalledTimes(1);
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('Rendered choice "fixed" in item "answer" is missing from Root.items')
		);
	});

	it("updates authoritative order and falls back when the active item is disabled", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
		const onItemChange = vi.fn();

		await renderMarkup("ssr-dynamic", (next) => {
			next.onItemChange = onItemChange;
		});
		await hydrateMarkup();
		await flushEffects();

		expect(progress().textContent).toBe("Question 2 of 3");

		model.definitions = [{ name: "second" }, { name: "first" }, { name: "third" }];
		await flushEffects();

		expect(progress().textContent).toBe("Question 1 of 3");
		expect(action("previous").hidden).toBe(true);

		model.definitions = [
			{ disabled: true, name: "second" },
			{ name: "first" },
			{ name: "third" },
		];
		await flushEffects();

		expect(progress().textContent).toBe("Question 1 of 2");
		expect(item("first").hasAttribute("data-active")).toBe(true);
		expect(onItemChange).toHaveBeenLastCalledWith("first");
		expect(consoleWarn).toHaveBeenCalledTimes(1);
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining('defaultItem "second" does not identify an enabled item')
		);

		model.definitions = [{ name: "first" }, { name: "third" }, { name: "fourth" }];
		await flushEffects();

		expect(progress().textContent).toBe("Question 1 of 3");
		expect(action("next").hidden).toBe(false);
		expect(item("fourth").hidden).toBe(true);
	});

	it("keeps a controlled item aligned with collection updates", async () => {
		await renderMarkup("ssr-controlled", (next) => {
			next.item = "scope";
		});
		await hydrateMarkup();

		model.item = "detail";
		await flushEffects();

		expect(progress().textContent).toBe("Question 2 of 2");
		expect(item("scope").hidden).toBe(true);
		expect(item("detail").hasAttribute("data-active")).toBe(true);
	});

	it("reports a mismatch again after it resolves and recurs", async () => {
		const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

		await renderMarkup("ssr-warning-recur", (next) => {
			next.includeChoice = true;
		});
		await hydrateMarkup();
		await flushEffects();

		expect(consoleWarn).not.toHaveBeenCalled();

		model.includeChoice = false;
		await flushEffects();

		expect(consoleWarn).toHaveBeenCalledTimes(1);

		model.includeChoice = true;
		await flushEffects();
		model.includeChoice = false;
		await flushEffects();

		expect(consoleWarn).toHaveBeenCalledTimes(2);
	});
});

async function renderServerQuestionnaire({ defaultItem }: { defaultItem?: string } = {}) {
	await renderMarkup("ssr", (next) => {
		next.defaultItem = defaultItem;
	});
}

async function renderMarkup(scenario: string, setup?: (next: QuestionnaireTestModel) => void) {
	createModel(scenario);
	setup?.(model);
	const { body } = await renderQuestionnaireToString(model);
	container.innerHTML = body;
}

async function hydrateMarkup() {
	hydrated = hydrate(QuestionnaireCases, { target: container, props: { model } });
	await flushEffects();
}

function normalizeHydratedMarkup(markup: string) {
	return markup.replaceAll('inert="true"', 'inert=""');
}
