/** @vitest-environment jsdom */

import { flushSync } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuestionnaireTestModel } from "./questionnaire-test-model.svelte.ts";
import {
	choose,
	choice,
	choiceInput,
	click,
	container,
	error,
	form,
	freeform,
	item,
	keydown,
	model as currentModel,
	next,
	previous,
	progress,
	renderCase,
	requiredElement,
	setContainer,
	skip,
	submit,
	type,
	unmountApp,
} from "./questionnaire-test-utils.js";

beforeEach(() => {
	const nextContainer = document.createElement("div");
	document.body.appendChild(nextContainer);
	setContainer(nextContainer);
});

afterEach(() => {
	unmountApp();
	container.remove();
	vi.restoreAllMocks();
});

describe("Questionnaire", () => {
	it("owns its ordered items, progress, and navigation", async () => {
		renderCase();

		expect(progress().textContent).toBe("Question 1 of 2");
		expect(form().dataset.current).toBe("1");
		expect(form().hasAttribute("data-first")).toBe(true);
		expect(item("scope").hasAttribute("data-active")).toBe(true);
		expect(item("detail").hidden).toBe(true);
		expect(freeform("scope-input").id).not.toBe("");
		expect(freeform("scope-input").hasAttribute("name")).toBe(false);
		expect(previous().hasAttribute("data-hidden")).toBe(true);
		expect(next().hasAttribute("data-visible")).toBe(true);
		expect(next().disabled).toBe(false);
		expect(next().dataset.status).toBe("unanswered");
		expect(submit().hasAttribute("data-hidden")).toBe(true);

		click(next());

		expect(item("scope").hasAttribute("data-active")).toBe(true);
		expect(item("scope").getAttribute("aria-invalid")).toBe("true");
		expect(error("scope-error").hidden).toBe(false);
		expect(document.activeElement).toBe(choiceInput("scope-delegation"));

		choose("scope-delegation");

		expect(item("scope").hasAttribute("aria-invalid")).toBe(false);
		expect(next().disabled).toBe(false);
		expect(next().dataset.status).toBe("answered");
		click(next());

		expect(progress().textContent).toBe("Question 2 of 2");
		expect(form().hasAttribute("data-last")).toBe(true);
		expect(item("scope").hidden).toBe(true);
		expect(item("detail").hasAttribute("data-active")).toBe(true);
		expect(previous().hasAttribute("data-visible")).toBe(true);
		expect(next().hasAttribute("data-hidden")).toBe(true);
		expect(submit().hasAttribute("data-visible")).toBe(true);
		expect(submit().disabled).toBe(false);
		expect(submit().dataset.status).toBe("unanswered");

		click(submit());

		expect(item("detail").getAttribute("aria-invalid")).toBe("true");
		expect(error("detail-error").hidden).toBe(false);
		expect(document.activeElement).toBe(choiceInput("detail-focused"));

		choose("detail-focused");

		expect(item("detail").hasAttribute("aria-invalid")).toBe(false);
		expect(submit().disabled).toBe(false);
		expect(submit().dataset.status).toBe("answered");
		click(previous());

		expect(item("scope").hasAttribute("data-active")).toBe(true);
		expect(choiceInput("scope-delegation").checked).toBe(true);
	});

	it("moves between items with horizontal arrows outside radios and text entry", async () => {
		renderCase();

		expect(item("scope").getAttribute("aria-keyshortcuts")).toBe(
			"Meta+Enter Control+Enter ArrowUp ArrowDown"
		);

		keydown(item("scope"), "ArrowRight");

		expect(item("scope").hasAttribute("data-active")).toBe(true);

		choose("scope-delegation");

		expect(item("scope").getAttribute("aria-keyshortcuts")).toBe(
			"Meta+Enter Control+Enter ArrowUp ArrowDown ArrowRight"
		);

		keydown(choiceInput("scope-delegation"), "ArrowRight");
		keydown(item("scope"), "ArrowRight", { ctrlKey: true });
		keydown(item("scope"), "ArrowRight", { repeat: true });

		expect(item("scope").hasAttribute("data-active")).toBe(true);

		keydown(item("scope"), "ArrowRight");

		expect(item("detail").hasAttribute("data-active")).toBe(true);
		expect(item("detail").getAttribute("aria-keyshortcuts")).toBe(
			"Meta+Enter Control+Enter ArrowUp ArrowDown ArrowLeft"
		);
		expect(document.activeElement).toBe(item("detail"));

		keydown(item("detail"), "ArrowLeft");

		expect(item("scope").hasAttribute("data-active")).toBe(true);
		expect(document.activeElement).toBe(item("scope"));

		type(freeform("scope-input"), "A custom answer");
		keydown(freeform("scope-input"), "ArrowRight");

		expect(item("scope").hasAttribute("data-active")).toBe(true);

		keydown(next(), "ArrowRight");

		expect(item("detail").hasAttribute("data-active")).toBe(true);
	});

	it("moves vertical focus across fixed and freeform answers", async () => {
		renderCase();
		choose("scope-questions");
		keydown(choiceInput("scope-questions"), "ArrowDown");

		expect(document.activeElement).toBe(freeform("scope-input"));
		expect(choiceInput("scope-questions").checked).toBe(true);

		keydown(freeform("scope-input"), "ArrowUp");

		expect(document.activeElement).toBe(choiceInput("scope-questions"));
		expect(choiceInput("scope-questions").checked).toBe(true);

		keydown(choiceInput("scope-questions"), "ArrowDown");
		keydown(freeform("scope-input"), "ArrowDown");

		expect(document.activeElement).toBe(choiceInput("scope-delegation"));
		expect(choiceInput("scope-delegation").checked).toBe(true);

		type(freeform("scope-input"), "A custom answer");
		keydown(freeform("scope-input"), "ArrowUp");

		expect(document.activeElement).toBe(freeform("scope-input"));

		keydown(freeform("scope-input"), "ArrowDown");

		expect(document.activeElement).toBe(freeform("scope-input"));

		item("scope").focus();
		keydown(item("scope"), "ArrowRight");
		keydown(item("detail"), "ArrowDown");

		expect(document.activeElement).toBe(choiceInput("detail-focused"));
		expect(choiceInput("detail-focused").checked).toBe(true);

		item("detail").focus();
		keydown(item("detail"), "ArrowLeft");
		keydown(item("scope"), "ArrowDown");

		expect(document.activeElement).toBe(freeform("scope-input"));
		expect(freeform("scope-input").value).toBe("A custom answer");
	});

	it("moves vertical focus through multiple choices without toggling", async () => {
		renderCase("multiple-vertical");

		item("multiple").focus();
		keydown(item("multiple"), "ArrowDown");

		expect(document.activeElement).toBe(choiceInput("first"));
		expect(choiceInput("first").checked).toBe(false);

		keydown(choiceInput("first"), "ArrowDown");

		expect(document.activeElement).toBe(choiceInput("second"));
		expect(choiceInput("second").checked).toBe(false);

		item("multiple").focus();
		keydown(item("multiple"), "ArrowUp");

		expect(document.activeElement).toBe(choiceInput("second"));
		expect(choiceInput("second").checked).toBe(false);
	});

	it.each(["email", "password", "search", "tel", "text", "url"] as const)(
		"moves vertically out of an empty %s input",
		async (inputType) => {
			renderCase("input-type", (model) => {
				model.inputType = inputType;
			});

			keydown(freeform("answer-input"), "ArrowUp");

			expect(document.activeElement).toBe(choiceInput("fixed"));
			expect(choiceInput("fixed").checked).toBe(true);
		}
	);

	it.each(["date", "datetime-local", "month", "number", "time", "week"] as const)(
		"keeps vertical arrows native for an empty %s input",
		async (inputType) => {
			renderCase("input-type", (model) => {
				model.inputType = inputType;
			});

			const input = freeform("answer-input");

			keydown(input, "ArrowUp");

			expect(document.activeElement).toBe(input);

			keydown(input, "ArrowDown");

			expect(document.activeElement).toBe(input);
		}
	);

	it("omits disabled answers from shortcuts, navigation, and validation focus", async () => {
		renderCase("disabled-answers");

		expect(choice("automatic").hasAttribute("data-shortcut")).toBe(false);
		expect(choice("review").dataset.shortcut).toBe("A");
		expect(freeform("approval-input").hasAttribute("data-shortcut")).toBe(false);

		item("approval").focus();
		keydown(item("approval"), "ArrowDown");

		expect(document.activeElement).toBe(choiceInput("review"));
		expect(choiceInput("review").checked).toBe(true);

		form().reset();
		flushSync();

		form().dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
		flushSync();

		expect(error("approval-error").hidden).toBe(false);
		expect(document.activeElement).toBe(choiceInput("review"));
	});

	it("counts only enabled answers in item status and validation", async () => {
		const onStatusChange = vi.fn();

		renderCase("enabled-answers", (model) => {
			model.onStatusChange = onStatusChange;
			model.answersDisabled = false;
		});

		expect(item("answers").dataset.status).toBe("answered");
		expect(new FormData(form()).getAll("answers")).toEqual(["fixed", "Custom"]);
		expect(submit().disabled).toBe(false);

		currentModel.answersDisabled = true;
		flushSync();

		expect(choiceInput("fixed-answer").checked).toBe(true);
		expect(freeform("custom-answer").value).toBe("Custom");
		expect(item("answers").dataset.status).toBe("unanswered");
		expect(new FormData(form()).getAll("answers")).toEqual([]);
		expect(submit().disabled).toBe(false);
		expect(onStatusChange).toHaveBeenLastCalledWith("unanswered");

		form().dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
		flushSync();

		expect(error("answers-error").hidden).toBe(false);
		expect(document.activeElement).toBe(item("answers"));

		currentModel.answersDisabled = false;
		flushSync();

		expect(item("answers").dataset.status).toBe("answered");
		expect(new FormData(form()).getAll("answers")).toEqual(["fixed", "Custom"]);
		expect(submit().disabled).toBe(false);
		expect(error("answers-error").hidden).toBe(true);
		expect(onStatusChange).toHaveBeenLastCalledWith("answered");
	});

	it("returns to and blocks an externally invalid item", async () => {
		renderCase("external-invalid", (model) => {
			model.item = "first";
		});

		choose("first-choice");
		click(next());
		choose("second-choice");
		click(submit());

		expect(item("first").hasAttribute("data-active")).toBe(true);
		expect(item("first").dataset.status).toBe("answered");
		expect(item("first").getAttribute("aria-invalid")).toBe("true");
		expect(item("first").getAttribute("aria-describedby")).toContain("first-error");
		expect(choiceInput("first-choice").getAttribute("aria-invalid")).toBe("true");
		expect(error("first-error").hidden).toBe(false);
		expect(error("first-error").getAttribute("role")).toBe("alert");
		expect(document.activeElement).toBe(item("first"));

		keydown(item("first"), "Enter", { metaKey: true });

		expect(item("first").hasAttribute("data-active")).toBe(true);
		expect(document.activeElement).toBe(choiceInput("first-choice"));

		item("first").focus();
		click(next());

		expect(item("first").hasAttribute("data-active")).toBe(true);
		expect(document.activeElement).toBe(choiceInput("first-choice"));

		choose("first-alternative");

		expect(item("first").hasAttribute("aria-invalid")).toBe(false);
		expect(error("first-error").hidden).toBe(true);

		click(next());

		expect(item("second").hasAttribute("data-active")).toBe(true);
	});

	it("does not treat ArrowRight as an implicit skip", async () => {
		const onStatusChange = vi.fn();

		renderCase("optional-arrow", (model) => {
			model.onStatusChange = onStatusChange;
		});

		keydown(item("optional"), "ArrowRight");

		expect(item("optional").hasAttribute("data-active")).toBe(true);
		expect(item("optional").dataset.status).toBe("unanswered");
		expect(onStatusChange).not.toHaveBeenCalled();

		click(skip());
		click(previous());

		expect(item("optional").dataset.status).toBe("skipped");
		expect(item("optional").getAttribute("aria-keyshortcuts")).toBe(
			"Meta+Enter Control+Enter ArrowUp ArrowDown ArrowRight"
		);

		keydown(item("optional"), "ArrowRight");

		expect(item("next").hasAttribute("data-active")).toBe(true);
	});

	it("activates the first enabled item without reporting initialization as navigation", async () => {
		const onItemChange = vi.fn();

		renderCase("init-first-enabled", (model) => {
			model.onItemChange = onItemChange;
		});

		expect(item("first").hasAttribute("data-active")).toBe(true);
		expect(item("disabled").hidden).toBe(true);
		expect(progress().textContent).toBe("Question 1 of 2");
		expect(progress().getAttribute("aria-label")).toBe("Questionnaire progress");
		expect(onItemChange).not.toHaveBeenCalled();
		expect(document.activeElement).toBe(document.body);
	});

	it("reports item names without navigation details", async () => {
		const onItemChange = vi.fn();

		renderCase("default", (model) => {
			model.onItemChange = onItemChange;
		});
		choose("scope-delegation");

		expect(item("scope").hasAttribute("name")).toBe(false);
		expect(choiceInput("scope-delegation").name).toBe("scope");

		click(next());
		click(previous());

		expect(onItemChange.mock.calls).toEqual([["detail"], ["scope"]]);
	});

	it("supports controlled active-item navigation", async () => {
		const onItemChange = vi.fn();

		renderCase("controlled-nav", (model) => {
			model.item = "first";
			model.onItemChange = onItemChange;
		});

		choose("first-choice");
		click(next());

		expect(item("second").hasAttribute("data-active")).toBe(true);
		expect(onItemChange).toHaveBeenLastCalledWith("second");

		click(previous());

		expect(item("first").hasAttribute("data-active")).toBe(true);
		expect(onItemChange).toHaveBeenLastCalledWith("first");
	});

	it("treats Input as a freeform answer without selecting it on focus", async () => {
		renderCase();
		const input = freeform("scope-input");

		input.focus();

		expect(item("scope").dataset.status).toBe("unanswered");
		expect(input.hasAttribute("name")).toBe(false);
		expect(input.hasAttribute("data-empty")).toBe(true);

		type(input, "A different direction");

		expect(item("scope").dataset.status).toBe("answered");
		expect(input.name).toBe("scope");
		expect(input.hasAttribute("data-filled")).toBe(true);
		expect(choice("scope-delegation").hasAttribute("data-unchecked")).toBe(true);

		choose("scope-questions");

		expect(input.value).toBe("A different direction");
		expect(input.hasAttribute("name")).toBe(false);
		expect(input.hasAttribute("data-filled")).toBe(true);
		expect(choice("scope-questions").hasAttribute("data-checked")).toBe(true);

		type(input, "A revised direction");

		expect(input.name).toBe("scope");
		expect(choiceInput("scope-questions").checked).toBe(false);
		expect(new FormData(form()).get("scope")).toBe("A revised direction");
	});

	it("supports controlled fixed and freeform answers", async () => {
		renderCase("controlled-answers");

		expect(item("answers").dataset.status).toBe("unanswered");

		choose("controlled-choice");

		expect(new FormData(form()).getAll("answers")).toEqual(["fixed"]);

		type(freeform("controlled-input"), "Custom");

		expect(new FormData(form()).getAll("answers")).toEqual(["fixed", "Custom"]);

		choose("controlled-choice");
		type(freeform("controlled-input"), "");

		expect(item("answers").dataset.status).toBe("unanswered");
		expect(new FormData(form()).getAll("answers")).toEqual([]);
	});

	it("keeps a coordinated controlled Choice and Input mutually exclusive", async () => {
		renderCase("controlled-single");

		choose("controlled-choice");

		expect(item("answer").dataset.status).toBe("answered");
		expect(choice("controlled-choice").hasAttribute("data-checked")).toBe(true);
		expect(choiceInput("controlled-choice").checked).toBe(true);
		expect(choiceInput("controlled-choice").name).toBe("answer");
		expect(freeform("controlled-input").hasAttribute("name")).toBe(false);
		expect(new FormData(form()).getAll("answer")).toEqual(["fixed"]);

		type(freeform("controlled-input"), "Custom");

		expect(item("answer").dataset.status).toBe("answered");
		expect(choice("controlled-choice").hasAttribute("data-unchecked")).toBe(true);
		expect(choiceInput("controlled-choice").checked).toBe(false);
		expect(freeform("controlled-input").name).toBe("answer");
		expect(new FormData(form()).getAll("answer")).toEqual(["Custom"]);

		choose("controlled-choice");

		expect(item("answer").dataset.status).toBe("answered");
		expect(choice("controlled-choice").hasAttribute("data-checked")).toBe(true);
		expect(choiceInput("controlled-choice").checked).toBe(true);
		expect(choiceInput("controlled-choice").name).toBe("answer");
		expect(freeform("controlled-input").value).toBe("Custom");
		expect(freeform("controlled-input").hasAttribute("name")).toBe(false);
		expect(new FormData(form()).getAll("answer")).toEqual(["fixed"]);
	});

	it("does not infer a controlled Input answer from a rejected edit", async () => {
		const onChange = vi.fn();

		renderCase("rejected-input", (model) => {
			model.onChange = onChange;
		});

		type(freeform("answer-input"), "Rejected");

		expect(onChange).toHaveBeenCalledOnce();
		expect(freeform("answer-input").value).toBe("");
		expect(freeform("answer-input").hasAttribute("name")).toBe(false);
		expect(item("answer").dataset.status).toBe("unanswered");
		expect(submit().disabled).toBe(false);
	});

	it("clears controlled choices when an item is intentionally skipped", async () => {
		const onStatusChange = vi.fn();
		const onSubmit = vi.fn((event: SubmitEvent) => {
			event.preventDefault();
		});

		renderCase("controlled-skip", (model) => {
			model.onStatusChange = onStatusChange;
			model.onSubmit = onSubmit;
		});

		expect(choiceInput("controlled-answer").checked).toBe(true);
		expect(item("answer").dataset.status).toBe("answered");

		click(skip());

		expect(choiceInput("controlled-answer").checked).toBe(false);
		expect(choiceInput("controlled-answer").id).not.toBe("");
		expect(choiceInput("controlled-answer").hasAttribute("name")).toBe(false);
		expect(item("answer").dataset.status).toBe("skipped");
		expect(new FormData(form()).getAll("answer")).toEqual([]);
		expect(onStatusChange).toHaveBeenLastCalledWith("skipped");
		expect(onSubmit).toHaveBeenCalledOnce();
	});

	it("does not require fixed radios when an Input can answer the item", async () => {
		renderCase("native-freeform");

		expect(choiceInput("fixed").required).toBe(false);

		type(freeform("answer-input"), "Freeform");

		expect(form().checkValidity()).toBe(true);
		expect(new FormData(form()).get("answer")).toBe("Freeform");
	});

	it("allows fixed and freeform answers in a multiple item", async () => {
		const onSubmit = vi.fn((event: SubmitEvent) => {
			event.preventDefault();
		});

		renderCase("multiple-signals", (model) => {
			model.onSubmit = onSubmit;
		});

		expect(choiceInput("progress").type).toBe("checkbox");
		expect(item("signals").hasAttribute("data-multiple")).toBe(true);
		expect(submit().disabled).toBe(false);

		choose("progress");
		choose("risks");
		type(freeform("signals-input"), "Decisions");

		expect(submit().disabled).toBe(false);
		expect(new FormData(form()).getAll("signals")).toEqual(["progress", "risks", "Decisions"]);

		click(submit());

		expect(onSubmit).toHaveBeenCalledOnce();

		choose("progress");

		expect(new FormData(form()).getAll("signals")).toEqual(["risks", "Decisions"]);
	});

	it("preserves a compatible selection when multiple changes", async () => {
		const { model } = renderWithModel("dynamic-multiple");

		choose("first-signal");
		choose("second-signal");

		expect(new FormData(form()).getAll("signals")).toEqual(["first", "second"]);

		click(requiredElement<HTMLButtonElement>('[data-testid="toggle-multiple"]'));

		expect(choiceInput("first-signal").type).toBe("radio");
		expect(choiceInput("first-signal").checked).toBe(true);
		expect(choiceInput("second-signal").checked).toBe(false);
		expect(new FormData(form()).getAll("signals")).toEqual(["first"]);
		expect(item("signals").dataset.status).toBe("answered");

		click(requiredElement<HTMLButtonElement>('[data-testid="toggle-multiple"]'));

		expect(choiceInput("first-signal").type).toBe("checkbox");
		expect(choiceInput("first-signal").checked).toBe(true);
		expect(choiceInput("second-signal").checked).toBe(false);
		void model;
	});

	it("records an intentional skip separately from an unanswered item", async () => {
		const onTimingStatusChange = vi.fn();

		renderCase("skip-flow", (model) => {
			model.onStatusChange = onTimingStatusChange;
		});

		expect(skip().hidden).toBe(true);

		choose("plan-choice");
		click(next());

		expect(item("timing").dataset.status).toBe("unanswered");
		expect(skip().hidden).toBe(false);
		expect(next().disabled).toBe(false);

		choose("timing-choice");

		expect(item("timing").dataset.status).toBe("answered");
		expect(next().disabled).toBe(false);

		click(skip());

		expect(item("owner").hasAttribute("data-active")).toBe(true);
		expect(choiceInput("timing-choice").checked).toBe(false);
		expect(onTimingStatusChange.mock.calls).toEqual([["answered"], ["skipped"]]);

		click(previous());

		expect(item("timing").dataset.status).toBe("skipped");
		expect(next().disabled).toBe(false);

		choose("timing-choice");

		expect(item("timing").dataset.status).toBe("answered");
		expect(onTimingStatusChange).toHaveBeenLastCalledWith("answered");
	});

	it("treats an intentional skip as valid for an optional external error", async () => {
		renderCase("optional-invalid");

		expect(item("optional").getAttribute("aria-invalid")).toBe("true");

		click(skip());

		expect(item("required").hasAttribute("data-active")).toBe(true);

		click(previous());

		expect(item("optional").dataset.status).toBe("skipped");
		expect(item("optional").hasAttribute("aria-invalid")).toBe(false);
		expect(error("optional-error").hidden).toBe(true);

		choose("optional-choice");

		expect(item("optional").dataset.status).toBe("answered");
		expect(item("optional").getAttribute("aria-invalid")).toBe("true");

		click(next());

		expect(item("optional").hasAttribute("data-active")).toBe(true);
		expect(document.activeElement).toBe(choiceInput("optional-choice"));
	});

	it("submits after skipping the final optional item", async () => {
		const onStatusChange = vi.fn();
		const onSubmit = vi.fn((event: SubmitEvent) => {
			event.preventDefault();
		});

		renderCase("final-skip", (model) => {
			model.onStatusChange = onStatusChange;
			model.onSubmit = onSubmit;
		});

		expect(skip().hidden).toBe(false);
		expect(submit().disabled).toBe(false);

		click(skip());

		expect(item("timing").dataset.status).toBe("skipped");
		expect(onStatusChange).toHaveBeenCalledWith("skipped");
		expect(onSubmit).toHaveBeenCalledOnce();
	});

	it("validates unanswered items on native form submission", async () => {
		const onSubmit = vi.fn();

		renderCase("default", (model) => {
			model.onSubmit = onSubmit;
		});

		expect(item("scope").getAttribute("aria-describedby")).toBe("scope-description");

		form().dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
		flushSync();

		expect(onSubmit).not.toHaveBeenCalled();
		expect(item("scope").getAttribute("aria-invalid")).toBe("true");
		expect(item("scope").getAttribute("aria-describedby")).toBe(
			"scope-description scope-error-message"
		);
		expect(error("scope-error").hidden).toBe(false);
		expect(document.activeElement).toBe(choiceInput("scope-delegation"));
	});

	it("keeps validation active until an attempted item remains valid", async () => {
		renderCase("validation-persist");

		form().dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
		flushSync();

		expect(error("answer-error").hidden).toBe(false);

		type(freeform("answer-input"), " ");

		expect(error("answer-error").hidden).toBe(false);

		choose("fixed");

		expect(error("answer-error").hidden).toBe(true);

		choose("fixed");

		expect(error("answer-error").hidden).toBe(false);

		type(freeform("answer-input"), "Valid");

		expect(error("answer-error").hidden).toBe(true);

		type(freeform("answer-input"), "");

		expect(error("answer-error").hidden).toBe(false);
	});

	it("keeps live answers when default props change and uses new defaults on reset", async () => {
		renderCase("changing-defaults");

		type(freeform("default-input"), "Edited");
		choose("secondary-choice");
		click(requiredElement('[data-testid="change-defaults"]'));

		expect(freeform("default-input").value).toBe("Edited");
		expect(choiceInput("secondary-choice").checked).toBe(true);
		expect(item("defaults").dataset.status).toBe("answered");

		form().reset();
		flushSync();

		expect(freeform("default-input").value).toBe("");
		expect(choiceInput("primary-choice").checked).toBe(true);
		expect(choiceInput("secondary-choice").checked).toBe(false);
		expect(item("defaults").dataset.status).toBe("answered");
	});

	it("keeps Enter metadata on only the selected freeform answer", async () => {
		renderCase("enter-metadata");

		type(freeform("answer-input"), "Draft");

		expect(freeform("answer-input").getAttribute("aria-keyshortcuts")).toBe("Enter");

		choose("fixed");

		expect(freeform("answer-input").value).toBe("Draft");
		expect(freeform("answer-input").hasAttribute("aria-keyshortcuts")).toBe(false);
	});

	it("registers every Description and Error while they remain mounted", async () => {
		renderCase("descriptions");

		expect(item("answer").getAttribute("aria-describedby")).toBe("description-one description-two");

		form().dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
		flushSync();

		expect(item("answer").getAttribute("aria-describedby")).toBe(
			"description-one description-two error-one error-two"
		);

		click(requiredElement('[data-testid="toggle-details"]'));

		expect(item("answer").getAttribute("aria-describedby")).toBe("description-one error-one");
	});

	it("resets answers, skips, validation, and the initial item", async () => {
		renderCase("reset");

		choose("chat");
		click(skip());
		choose("detail-choice");

		expect(item("detail").hasAttribute("data-active")).toBe(true);
		expect(choiceInput("email").checked).toBe(false);
		expect(choiceInput("chat").checked).toBe(false);

		form().reset();
		flushSync();

		expect(item("channels").hasAttribute("data-active")).toBe(true);
		expect(item("channels").dataset.status).toBe("answered");
		expect(choiceInput("email").checked).toBe(true);
		expect(choiceInput("chat").checked).toBe(false);
	});

	it("skips disabled items and registers in Strict Mode", async () => {
		renderCase("disabled-items");

		expect(progress().textContent).toBe("Question 1 of 2");

		choose("first-choice");
		click(next());

		expect(item("last").hasAttribute("data-active")).toBe(true);
		expect(item("disabled").hidden).toBe(true);
		expect(progress().textContent).toBe("Question 2 of 2");
	});

	it("reconciles inserted and removed items in DOM order", async () => {
		const onItemChange = vi.fn();
		const { model } = renderWithModel("dynamic-items", (next) => {
			next.includeMiddle = false;
			next.onItemChange = onItemChange;
		});

		expect(progress().textContent).toBe("Question 1 of 2");

		model.includeMiddle = true;
		flushSync();

		expect(progress().textContent).toBe("Question 1 of 3");

		choose("first-choice");
		click(next());

		expect(item("middle").hasAttribute("data-active")).toBe(true);

		model.includeMiddle = false;
		flushSync();

		expect(item("first").hasAttribute("data-active")).toBe(true);
		expect(progress().textContent).toBe("Question 1 of 2");
		expect(onItemChange.mock.calls).toEqual([["middle"], ["first"]]);
	});

	it("reconciles inserted and removed answers in DOM order", async () => {
		const { model } = renderWithModel("dynamic-answers", (next) => {
			next.includeMiddle = false;
		});

		expect(choice("first-answer").dataset.shortcut).toBe("A");
		expect(choice("last-answer").dataset.shortcut).toBe("B");

		model.includeMiddle = true;
		flushSync();

		expect(choice("first-answer").dataset.shortcut).toBe("A");
		expect(choice("middle-answer").dataset.shortcut).toBe("B");
		expect(choice("last-answer").dataset.shortcut).toBe("C");

		model.includeMiddle = false;
		flushSync();

		expect(container.querySelector('[data-testid="middle-answer"]')).toBeNull();
		expect(choice("last-answer").dataset.shortcut).toBe("B");
	});

	it.each([
		{ count: 27, lastShortcut: "Z", shortcuts: "letters" as const },
		{ count: 10, lastShortcut: "9", shortcuts: "numbers" as const },
	])("leaves answers beyond the $shortcuts shortcut range unassigned", async ({
		count,
		lastShortcut,
		shortcuts,
	}) => {
		renderCase("shortcut-overflow", (model) => {
			model.shortcutCount = count;
			model.shortcuts = shortcuts;
		});

		expect(choice(`answer-${count - 2}`).dataset.shortcut).toBe(lastShortcut);
		expect(choice(`answer-${count - 1}`).hasAttribute("data-shortcut")).toBe(false);
	});

	it("assigns letter shortcuts to enabled answers in DOM order", async () => {
		const onSubmit = vi.fn((event: SubmitEvent) => {
			event.preventDefault();
		});

		renderCase("letter-shortcuts", (model) => {
			model.onSubmit = onSubmit;
		});

		expect(form().dataset.shortcuts).toBe("letters");
		expect(requiredElement<HTMLElement>('[data-testid="choices"]').dataset.shortcuts).toBe("letters");
		expect(choice("disabled-answer").hasAttribute("data-shortcut")).toBe(false);
		expect(choice("first-answer").dataset.shortcut).toBe("A");
		expect(choice("second-answer").dataset.shortcut).toBe("B");
		expect(freeform("other-answer").hasAttribute("data-shortcut")).toBe(false);
		expect(choiceInput("first-answer").getAttribute("aria-keyshortcuts")).toBe("A");

		keydown(choiceInput("first-answer"), "b");

		expect(choiceInput("second-answer").checked).toBe(true);
		expect(document.activeElement).toBe(choiceInput("second-answer"));
		expect(choiceInput("second-answer").getAttribute("aria-keyshortcuts")).toBe("B Enter");
		expect(submit().dataset.shortcut).toBe("Enter");

		keydown(choiceInput("second-answer"), "c");

		expect(document.activeElement).toBe(choiceInput("second-answer"));
		expect(item("answers").dataset.status).toBe("answered");
		expect(choiceInput("second-answer").checked).toBe(true);

		keydown(freeform("other-answer"), "a");

		expect(choiceInput("first-answer").checked).toBe(false);
		expect(document.activeElement).toBe(freeform("other-answer"));

		type(freeform("other-answer"), "Draft answer");
		choose("first-answer");
		keydown(freeform("other-answer"), "Enter");

		expect(onSubmit).not.toHaveBeenCalled();
		expect(new FormData(form()).get("answers")).toBe("first");
	});

	it("supports number shortcuts and confirms only from a filled answer", async () => {
		const onSubmit = vi.fn((event: SubmitEvent) => {
			event.preventDefault();
		});

		renderCase("number-shortcuts", (model) => {
			model.onSubmit = onSubmit;
		});

		expect(choice("first-choice").dataset.shortcut).toBe("1");

		keydown(choiceInput("first-choice"), "1");

		expect(choiceInput("first-choice").checked).toBe(true);
		expect(next().dataset.shortcut).toBe("Enter");

		keydown(choiceInput("first-choice"), "Enter");

		expect(item("second").hasAttribute("data-active")).toBe(true);
		expect(freeform("second-input").hasAttribute("data-shortcut")).toBe(false);

		keydown(freeform("second-input"), "Enter");

		expect(onSubmit).not.toHaveBeenCalled();

		type(freeform("second-input"), "Enough detail");
		keydown(freeform("second-input"), "Enter");

		expect(onSubmit).toHaveBeenCalledOnce();
	});

	it("validates, advances, and submits with Command or Control plus Enter", async () => {
		const onSubmit = vi.fn((event: SubmitEvent) => {
			event.preventDefault();
		});

		renderCase("default", (model) => {
			model.onSubmit = onSubmit;
		});

		keydown(freeform("scope-input"), "Enter", { metaKey: true });

		expect(item("scope").hasAttribute("data-active")).toBe(true);
		expect(item("scope").getAttribute("aria-invalid")).toBe("true");
		expect(document.activeElement).toBe(choiceInput("scope-delegation"));

		choose("scope-questions");
		keydown(freeform("scope-input"), "Enter", { metaKey: true });

		expect(item("detail").hasAttribute("data-active")).toBe(true);

		choose("detail-focused");
		keydown(item("detail"), "Enter", { ctrlKey: true });

		expect(onSubmit).toHaveBeenCalledOnce();
	});

	it("does not handle modified, repeated, prevented, or composing keys", async () => {
		const onSubmit = vi.fn((event: SubmitEvent) => {
			event.preventDefault();
		});

		const { model } = renderWithModel("modified-keys", (next) => {
			next.onSubmit = onSubmit;
		});

		keydown(choiceInput("answer-choice"), "a", { ctrlKey: true });
		keydown(choiceInput("answer-choice"), "a", { repeat: true });

		expect(choiceInput("answer-choice").checked).toBe(false);

		type(freeform("answer-input"), "Composing");
		keydown(freeform("answer-input"), "Enter", { isComposing: true });
		keydown(freeform("answer-input"), "Enter", { metaKey: true, repeat: true });
		keydown(freeform("answer-input"), "Enter", { metaKey: true, shiftKey: true });

		expect(onSubmit).not.toHaveBeenCalled();

		model.preventKeyDown = true;
		keydown(freeform("answer-input"), "Enter");

		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("composes fixed choice inputs, labels, and assigned shortcuts", async () => {
		renderCase("composed-choice");

		const input = requiredElement<HTMLInputElement>('[data-testid="fixed-input"]');
		const label = requiredElement<HTMLElement>('[data-testid="fixed-label"]');
		const shortcut = requiredElement<HTMLElement>('[data-testid="fixed-shortcut"]');

		expect(choice("fixed").tagName).toBe("LABEL");
		expect(input.type).toBe("radio");
		expect(input.name).toBe("answer");
		expect(input.value).toBe("fixed");
		expect(label.tagName).toBe("SPAN");
		expect(label.textContent).toBe("Fixed");
		expect(shortcut.textContent).toBe("A");
		expect(shortcut.dataset.shortcut).toBe("A");
		expect(shortcut.getAttribute("aria-hidden")).toBe("true");
		expect(shortcut.hidden).toBe(false);
	});

	it("registers a ChoiceInput whenever its composed input mounts", async () => {
		const { model } = renderWithModel("conditional-choice-input");

		expect(item("answer").dataset.status).toBe("unanswered");
		expect(choice("conditional-choice").hasAttribute("data-shortcut")).toBe(false);

		const toggle = requiredElement<HTMLButtonElement>('[data-testid="toggle-input"]');

		click(toggle);

		const firstInput = requiredElement<HTMLInputElement>('[data-testid="conditional-input"]');

		expect(choice("conditional-choice").dataset.shortcut).toBe("A");

		click(firstInput);

		expect(item("answer").dataset.status).toBe("answered");

		click(toggle);

		expect(item("answer").dataset.status).toBe("unanswered");

		click(toggle);

		const secondInput = requiredElement<HTMLInputElement>('[data-testid="conditional-input"]');

		expect(secondInput).not.toBe(firstInput);
		expect(secondInput.checked).toBe(true);
		expect(item("answer").dataset.status).toBe("answered");
		void model;
	});

	it("supports render callbacks and emits no primitive data slots", async () => {
		renderCase("render-child");

		expect(progress().tagName).toBe("OUTPUT");
		expect(progress().textContent).toBe("1/1");
		expect(progress().hasAttribute("data-first")).toBe(true);
		expect(progress().hasAttribute("data-last")).toBe(true);
		expect(container.querySelector("[data-slot]")).toBeNull();
		expect(item("only").querySelector("legend")?.textContent).toBe("only");
		expect(submit().dataset.renderStatus).toBe("unanswered");
		expect(submit().dataset.status).toBe("unanswered");
		expect(submit().disabled).toBe(true);
	});

	it("renders a custom title element", async () => {
		renderCase("custom-title");

		const title = requiredElement<HTMLElement>('[data-testid="custom-title"]');

		expect(title.tagName).toBe("H2");
		expect(title.textContent).toBe("Custom title");
		expect(item("only").getAttribute("aria-labelledby")).toBe("only-title");
	});
});

function renderWithModel(scenario: string, setup?: (next: QuestionnaireTestModel) => void) {
	renderCase(scenario, setup);
	return { model: currentModel };
}
