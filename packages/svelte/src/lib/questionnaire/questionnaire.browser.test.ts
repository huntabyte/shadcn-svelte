import { userEvent } from "@vitest/browser/context";
import { afterEach, expect, test, vi } from "vitest";
import type { QuestionnaireItemStatus } from "./types.js";
import {
	choiceInput,
	container,
	form,
	model,
	renderCase,
	requiredElement,
	setContainer,
	unmountApp,
} from "./questionnaire-test-utils.js";

afterEach(() => {
	unmountApp();
	container?.remove();
	vi.restoreAllMocks();
});

test("selects a composed choice through its label row", async () => {
	await renderBrowser("label-row");

	const input = choiceInput("answer");

	await userEvent.click(requiredElement('[data-testid="answer"]'));
	await settle();

	expect(input.checked).toBe(true);
	expect(new FormData(form()).get("answer")).toBe("answer");
});

test("registers a ChoiceInput whenever its composed input mounts", async () => {
	await renderBrowser("conditional-choice-input");

	const answer = requiredElement('[data-testid="answer"]');
	const choice = requiredElement('[data-testid="conditional-choice"]');
	const toggle = requiredElement('[data-testid="toggle-input"]');

	expect(answer.getAttribute("data-status")).toBe("unanswered");
	expect(choice.hasAttribute("data-shortcut")).toBe(false);

	await userEvent.click(toggle);
	await settle();

	const firstInput = requiredElement<HTMLInputElement>('[data-testid="conditional-input"]');

	expect(choice.getAttribute("data-shortcut")).toBe("A");

	await userEvent.click(firstInput);
	await settle();

	expect(answer.getAttribute("data-status")).toBe("answered");

	await userEvent.click(toggle);
	await settle();

	expect(answer.getAttribute("data-status")).toBe("unanswered");

	await userEvent.click(toggle);
	await settle();

	const secondInput = requiredElement<HTMLInputElement>('[data-testid="conditional-input"]');

	expect(secondInput).not.toBe(firstInput);
	expect(secondInput.checked).toBe(true);
	expect(answer.getAttribute("data-status")).toBe("answered");
});

test("preserves a compatible selection when multiple changes", async () => {
	await renderBrowser("dynamic-multiple");

	await userEvent.click(choiceInput("first-signal"));
	await userEvent.click(choiceInput("second-signal"));
	await settle();

	expect(new FormData(form()).getAll("signals")).toEqual(["first", "second"]);

	await userEvent.click(requiredElement('[data-testid="toggle-multiple"]'));
	await settle();

	expect(choiceInput("first-signal").type).toBe("radio");
	expect(choiceInput("first-signal").checked).toBe(true);
	expect(choiceInput("second-signal").checked).toBe(false);
	expect(new FormData(form()).getAll("signals")).toEqual(["first"]);
	expect(requiredElement('[data-testid="signals"]').getAttribute("data-status")).toBe("answered");

	await userEvent.click(requiredElement('[data-testid="toggle-multiple"]'));
	await settle();

	expect(choiceInput("first-signal").type).toBe("checkbox");
	expect(choiceInput("first-signal").checked).toBe(true);
	expect(choiceInput("second-signal").checked).toBe(false);
});

test("renders a custom title and labels its item", async () => {
	await renderBrowser("custom-title");

	const title = requiredElement<HTMLElement>('[data-testid="custom-title"]');
	const fieldset = requiredElement<HTMLFieldSetElement>("fieldset");

	expect(title.tagName).toBe("H2");
	expect(title.textContent).toBe("Custom title");
	expect(fieldset.getAttribute("aria-labelledby")).toBe("only-title");
});

test("preserves native radio and checkbox keyboard behavior", async () => {
	await renderBrowser("native-keyboard");

	const alpha = choiceInput("alpha");
	const beta = choiceInput("beta");

	alpha.focus();
	await userEvent.keyboard("{ArrowRight}");
	await settle();

	expect(alpha.checked).toBe(false);
	expect(beta.checked).toBe(true);
	expect(new FormData(form()).get("single")).toBe("beta");
	expect(requiredElement('[data-testid="root"] [data-active]').textContent).toContain("Choose one");

	await userEvent.keyboard("{ArrowDown}");
	await settle();

	expect(document.activeElement).toBe(requiredElement<HTMLInputElement>('[data-testid="other"]'));
	expect(beta.checked).toBe(true);

	await userEvent.keyboard("{ArrowUp}");
	await settle();

	expect(document.activeElement).toBe(beta);
	expect(beta.checked).toBe(true);

	await userEvent.keyboard("{ArrowDown}");
	await settle();
	await userEvent.keyboard("{ArrowDown}");
	await settle();

	expect(document.activeElement).toBe(alpha);
	expect(alpha.checked).toBe(true);

	const other = requiredElement<HTMLInputElement>('[data-testid="other"]');

	expect(other.id).not.toBe("");
	expect(other.hasAttribute("name")).toBe(false);

	await userEvent.type(other, "Draft");
	await userEvent.keyboard("{ArrowUp}{ArrowDown}");
	await settle();

	expect(document.activeElement).toBe(other);

	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	const gamma = choiceInput("gamma");
	const delta = choiceInput("delta");

	gamma.focus();
	await userEvent.keyboard(" ");
	await settle();

	expect(gamma.checked).toBe(true);
	expect(new FormData(form()).getAll("multiple")).toEqual(["gamma"]);

	await userEvent.keyboard("{ArrowDown}");
	await settle();

	expect(document.activeElement).toBe(delta);
	expect(delta.checked).toBe(false);

	await userEvent.keyboard(" ");
	await settle();

	expect(new FormData(form()).getAll("multiple")).toEqual(["gamma", "delta"]);
});

test("moves between items with contextual horizontal arrows", async () => {
	await renderBrowser("horizontal-arrows");

	const first = requiredElement<HTMLFieldSetElement>('[data-testid="first"]');
	const second = requiredElement<HTMLFieldSetElement>('[data-testid="second"]');

	first.focus();
	await userEvent.keyboard("{ArrowRight}");
	await settle();

	expect(first.hasAttribute("data-active")).toBe(true);

	await userEvent.click(choiceInput("first-answer"));
	first.focus();
	await userEvent.keyboard("{ArrowRight}");
	await settle();

	expect(second.hasAttribute("data-active")).toBe(true);
	expect(document.activeElement).toBe(second);

	const secondAnswer = requiredElement<HTMLInputElement>('[data-testid="second-answer"]');

	await userEvent.keyboard("{ArrowDown}");
	await settle();

	expect(document.activeElement).toBe(secondAnswer);

	await userEvent.type(secondAnswer, "Draft");
	await userEvent.keyboard("{ArrowLeft}");
	await settle();

	expect(second.hasAttribute("data-active")).toBe(true);

	second.focus();
	await userEvent.keyboard("{ArrowLeft}");
	await settle();

	expect(first.hasAttribute("data-active")).toBe(true);
	expect(document.activeElement).toBe(first);
});

test("keeps native arrow behavior for number inputs", async () => {
	await renderBrowser("number-input");

	const roundCount = requiredElement<HTMLInputElement>('[data-testid="round-count"]');

	await userEvent.click(roundCount);
	await userEvent.keyboard("{ArrowUp}");
	await settle();

	expect(document.activeElement).toBe(roundCount);
});

test("does not count disabled controls as answers", async () => {
	await renderBrowser("enabled-answers");

	const answers = requiredElement('[data-testid="answers"]');
	const submitButton = requiredElement<HTMLButtonElement>('[data-testid="submit"]');

	expect(answers.getAttribute("data-status")).toBe("answered");
	expect(new FormData(form()).getAll("answers")).toEqual(["fixed", "Custom"]);
	expect(submitButton.disabled).toBe(false);

	await userEvent.click(requiredElement('[data-testid="toggle"]'));
	await settle();

	expect(answers.getAttribute("data-status")).toBe("unanswered");
	expect(new FormData(form()).getAll("answers")).toEqual([]);
	expect(submitButton.disabled).toBe(false);

	await userEvent.click(submitButton);
	await settle();

	expect(requiredElement('[data-testid="answers-error"]').hidden).toBe(false);
	expect(document.activeElement).toBe(answers);

	await userEvent.click(requiredElement('[data-testid="toggle"]'));
	await settle();

	expect(answers.getAttribute("data-status")).toBe("answered");
	expect(new FormData(form()).getAll("answers")).toEqual(["fixed", "Custom"]);
	expect(submitButton.disabled).toBe(false);
	expect(requiredElement('[data-testid="answers-error"]').hidden).toBe(true);
});

test("selects answers with scoped shortcuts and confirms with Enter", async () => {
	let submittedValue: FormDataEntryValue | null = null;

	await renderBrowser("scoped-shortcuts", (next) => {
		next.onSubmit = (event) => {
			event.preventDefault();
			submittedValue = new FormData(event.currentTarget as HTMLFormElement).get("detail");
		};
	});

	const alpha = choiceInput("alpha");
	const beta = choiceInput("beta");
	const betaShortcut = requiredElement<HTMLElement>('[data-testid="beta"] span[data-shortcut="B"]');

	expect(betaShortcut.textContent).toBe("B");
	expect(betaShortcut.getAttribute("aria-hidden")).toBe("true");

	alpha.focus();
	await userEvent.keyboard("b");
	await settle();

	expect(beta.checked).toBe(true);
	expect(document.activeElement).toBe(beta);

	await userEvent.keyboard("{Enter}");
	await settle();

	const detailInput = requiredElement<HTMLInputElement>('[data-testid="detail-input"]');

	expect(detailInput.hasAttribute("data-shortcut")).toBe(false);

	await userEvent.keyboard("{ArrowDown}{ArrowDown}");
	await settle();

	expect(document.activeElement).toBe(detailInput);
	expect(detailInput.value).toBe("");

	await userEvent.type(detailInput, "Custom detail");
	await userEvent.keyboard("{Enter}");
	await settle();

	expect(submittedValue).toBe("Custom detail");
});

test("uses definition order for shortcut activation", async () => {
	const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

	await renderBrowser("definition-order");

	expect(requiredElement('[data-testid="first"]').dataset.shortcut).toBe("B");
	expect(requiredElement('[data-testid="second"]').dataset.shortcut).toBe("A");

	requiredElement<HTMLElement>('[data-testid="answer"]').focus();
	await userEvent.keyboard("a");
	await settle();

	expect(choiceInput("second").checked).toBe(true);
	expect(choiceInput("first").checked).toBe(false);
	expect(consoleWarn).toHaveBeenCalledWith(
		expect.stringContaining('Choice order for item "answer" differs between Root.items')
	);
});

test("keeps vertical answer navigation in DOM order with definitions", async () => {
	const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

	await renderBrowser("dom-order-nav");

	choiceInput("first").focus();
	await userEvent.keyboard("{ArrowDown}");
	await settle();

	const other = requiredElement<HTMLInputElement>('[data-testid="other"]');

	expect(document.activeElement).toBe(other);
	expect(choiceInput("first").checked).toBe(false);

	await userEvent.keyboard("{ArrowDown}");
	await settle();

	expect(document.activeElement).toBe(choiceInput("second"));
	expect(choiceInput("second").checked).toBe(true);
	expect(consoleWarn).toHaveBeenCalledWith(
		expect.stringContaining('Choice order for item "answer" differs between Root.items')
	);
});

test("validates, advances, and submits with Command or Control plus Enter", async () => {
	let submitCount = 0;

	await renderBrowser("meta-enter", (next) => {
		next.onSubmit = (event) => {
			event.preventDefault();
			submitCount += 1;
		};
	});

	const firstInput = requiredElement<HTMLInputElement>('[data-testid="first-input"]');

	firstInput.focus();
	firstInput.dispatchEvent(
		new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			key: "Enter",
			metaKey: true,
		})
	);
	await settle();

	expect(requiredElement('[data-testid="first"]').hidden).toBe(false);
	expect(requiredElement('[data-testid="first-error"]').hidden).toBe(false);
	expect(document.activeElement).toBe(choiceInput("first-answer"));

	await userEvent.click(choiceInput("first-answer"));
	firstInput.focus();
	firstInput.dispatchEvent(
		new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			key: "Enter",
			metaKey: true,
		})
	);
	await settle();

	const second = requiredElement('[data-testid="second"]');

	expect(second.hidden).toBe(false);
	expect(document.activeElement).toBe(second);

	await userEvent.click(choiceInput("second-answer"));
	second.dispatchEvent(
		new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			ctrlKey: true,
			key: "Enter",
		})
	);
	await settle();

	expect(submitCount).toBe(1);
});

test("toggles multiple answers with scoped shortcuts", async () => {
	await renderBrowser("toggle-numbers");

	const alpha = choiceInput("alpha");
	const beta = choiceInput("beta");

	alpha.focus();
	await userEvent.keyboard("2");
	await settle();

	expect(document.activeElement).toBe(beta);
	expect(beta.checked).toBe(true);
	expect(new FormData(form()).getAll("answers")).toEqual(["beta"]);

	await userEvent.keyboard("2");
	await settle();

	expect(beta.checked).toBe(false);
	expect(new FormData(form()).getAll("answers")).toEqual([]);

	await userEvent.keyboard("1");
	await settle();

	expect(document.activeElement).toBe(alpha);
	expect(alpha.checked).toBe(true);
	expect(new FormData(form()).getAll("answers")).toEqual(["alpha"]);
});

test("does not implicitly submit from an unselected answer", async () => {
	let submitCount = 0;

	await renderBrowser("unselected-enter", (next) => {
		next.onSubmit = (event) => {
			event.preventDefault();
			submitCount += 1;
		};
	});

	const alpha = choiceInput("alpha");
	const beta = choiceInput("beta");
	const other = requiredElement<HTMLInputElement>('[data-testid="other"]');

	await userEvent.click(alpha);
	beta.focus();
	await userEvent.keyboard("{Enter}");
	await settle();

	expect(submitCount).toBe(0);

	await userEvent.type(other, "Preserved draft");
	await userEvent.click(alpha);
	other.focus();
	await userEvent.keyboard("{Enter}");
	await settle();

	expect(submitCount).toBe(0);

	alpha.focus();
	await userEvent.keyboard("{Enter}");
	await settle();

	expect(submitCount).toBe(1);
});

test("keeps controlled, skipped, and native form state aligned", async () => {
	await renderBrowser("form-state");

	const controlledInput = requiredElement<HTMLInputElement>('[data-testid="controlled-input"]');

	await userEvent.type(controlledInput, "Rejected");
	await settle();

	expect(controlledInput.value).toBe("");
	expect(requiredElement('[data-testid="controlled-item"]').getAttribute("data-status")).toBe(
		"unanswered"
	);
	expect(requiredElement<HTMLButtonElement>('[data-testid="controlled-submit"]').disabled).toBe(
		false
	);

	await userEvent.click(requiredElement('[data-testid="skip"]'));
	await settle();

	const controlledChoice = choiceInput("controlled-choice");

	expect(controlledChoice.checked).toBe(false);
	expect(controlledChoice.id).not.toBe("");
	expect(controlledChoice.hasAttribute("name")).toBe(false);
	expect(requiredElement('[data-testid="skip-item"]').getAttribute("data-status")).toBe("skipped");
	expect(requiredElement('[data-testid="skipped-value"]').textContent).toBe("empty");
});

test("returns to and blocks an externally invalid item", async () => {
	await renderBrowser("external-invalid", (next) => {
		next.item = "first";
	});

	await userEvent.click(choiceInput("first-choice"));
	await userEvent.click(requiredElement('[data-testid="next"]'));
	await userEvent.click(choiceInput("second-choice"));
	await userEvent.click(requiredElement('[data-testid="submit"]'));
	await settle();

	const first = requiredElement('[data-testid="first"]');
	const firstError = requiredElement('[data-testid="first-error"]');

	expect(first.hidden).toBe(false);
	expect(first.getAttribute("data-status")).toBe("answered");
	expect(first.getAttribute("aria-invalid")).toBe("true");
	expect(first.getAttribute("aria-describedby")).toContain("first-error");
	expect(choiceInput("first-choice").getAttribute("aria-invalid")).toBe("true");
	expect(firstError.hidden).toBe(false);
	expect(firstError.getAttribute("role")).toBe("alert");
	expect(document.activeElement).toBe(first);

	first.dispatchEvent(
		new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			key: "Enter",
			metaKey: true,
		})
	);
	await settle();

	expect(first.hidden).toBe(false);
	expect(document.activeElement).toBe(choiceInput("first-choice"));

	first.focus();
	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	expect(first.hidden).toBe(false);
	expect(document.activeElement).toBe(choiceInput("first-choice"));

	await userEvent.click(choiceInput("first-alternative"));
	await settle();

	expect(first.hasAttribute("aria-invalid")).toBe(false);
	expect(firstError.hidden).toBe(true);

	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	expect(requiredElement('[data-testid="second"]').hidden).toBe(false);
});

test("treats an intentional skip as valid for an optional external error", async () => {
	await renderBrowser("optional-invalid");

	const optional = requiredElement('[data-testid="optional"]');
	const optionalError = requiredElement<HTMLParagraphElement>('[data-testid="optional-error"]');

	expect(optional.getAttribute("aria-invalid")).toBe("true");

	await userEvent.click(requiredElement('[data-testid="skip"]'));
	await settle();

	expect(requiredElement('[data-testid="required"]').hasAttribute("data-active")).toBe(true);

	await userEvent.click(requiredElement('[data-testid="previous"]'));
	await settle();

	expect(optional.getAttribute("data-status")).toBe("skipped");
	expect(optional.hasAttribute("aria-invalid")).toBe(false);
	expect(optionalError.hidden).toBe(true);

	await userEvent.click(choiceInput("optional-choice"));
	await settle();

	expect(optional.getAttribute("data-status")).toBe("answered");
	expect(optional.getAttribute("aria-invalid")).toBe("true");

	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	expect(optional.hasAttribute("data-active")).toBe(true);
	expect(document.activeElement).toBe(choiceInput("optional-choice"));
});

test("allows a freeform answer with native validation enabled", async () => {
	let submittedValue: FormDataEntryValue | null = null;

	await renderBrowser("native-freeform", (next) => {
		next.onSubmit = (event) => {
			event.preventDefault();
			submittedValue = new FormData(event.currentTarget as HTMLFormElement).get("answer");
		};
	});

	const fixed = choiceInput("fixed");
	const other = requiredElement<HTMLInputElement>('[data-testid="answer-input"]');

	expect(fixed.required).toBe(false);

	await userEvent.type(other, "Freeform");
	await userEvent.click(requiredElement('[data-testid="submit"]'));
	await settle();

	expect(fixed.validity.valid).toBe(true);
	expect(submittedValue).toBe("Freeform");
});

test("validates selected native controls without validating unselected drafts", async () => {
	let submittedValue: FormDataEntryValue | null = null;

	await renderBrowser("native-email", (next) => {
		next.onSubmit = (event) => {
			event.preventDefault();
			submittedValue = new FormData(event.currentTarget as HTMLFormElement).get("contact");
		};
	});

	const contact = requiredElement('[data-testid="contact"]');
	const input = requiredElement<HTMLInputElement>('[data-testid="contact-input"]');

	expect(input.form).toBeNull();

	await userEvent.type(input, "not-an-email");
	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	expect(contact.hasAttribute("data-active")).toBe(true);
	expect(input.validity.valid).toBe(false);
	expect(document.activeElement).toBe(input);

	await userEvent.click(choiceInput("fixed-contact"));
	await settle();

	expect(input.value).toBe("not-an-email");
	expect(input.hasAttribute("name")).toBe(false);
	expect(input.form).toBeNull();

	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	expect(requiredElement('[data-testid="confirmation"]').hasAttribute("data-active")).toBe(true);

	await userEvent.click(choiceInput("confirm"));
	await userEvent.click(requiredElement('[data-testid="submit"]'));
	await settle();

	expect(submittedValue).toBe("fixed");
});

test("does not confirm a freeform answer while an IME composition is active", async () => {
	let submitCount = 0;

	await renderBrowser("ime", (next) => {
		next.onSubmit = (event) => {
			event.preventDefault();
			submitCount += 1;
		};
	});

	const detailInput = requiredElement<HTMLInputElement>('[data-testid="detail-input"]');

	await userEvent.type(detailInput, "入力");
	detailInput.dispatchEvent(
		new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			isComposing: true,
			key: "Enter",
		})
	);
	await settle();

	expect(submitCount).toBe(0);
});

test("moves focus on validation and navigation", async () => {
	await renderBrowser("focus-nav");

	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	expect(document.activeElement).toBe(choiceInput("first-answer"));

	await userEvent.click(choiceInput("first-answer"));
	await userEvent.click(requiredElement('[data-testid="next"]'));
	await settle();

	const second = requiredElement('[data-testid="second"]');

	expect(second.hasAttribute("data-active")).toBe(true);
	expect(document.activeElement).toBe(second);

	await userEvent.click(requiredElement('[data-testid="submit"]'));
	await settle();

	expect(document.activeElement).toBe(choiceInput("second-answer"));
});

test("submits an intentional final skip through the native form", async () => {
	let status: QuestionnaireItemStatus = "unanswered";
	let submittedStatus: QuestionnaireItemStatus | null = null;
	let submittedValues: FormDataEntryValue[] | null = null;

	await renderBrowser("final-skip", (next) => {
		next.onStatusChange = (nextStatus) => {
			status = nextStatus;
		};
		next.onSubmit = (event) => {
			event.preventDefault();
			submittedStatus = status;
			submittedValues = new FormData(event.currentTarget as HTMLFormElement).getAll("timing");
		};
	});

	await userEvent.click(requiredElement('[data-testid="skip"]'));
	await settle();

	expect(submittedStatus).toBe("skipped");
	expect(submittedValues).toEqual([]);
});

test("preserves inactive answers and restores native defaults on reset", async () => {
	await renderBrowser("inactive-reset");

	await userEvent.click(requiredElement('[data-testid="next"]'));
	await userEvent.clear(requiredElement('[data-testid="detail-input"]'));
	await userEvent.type(requiredElement('[data-testid="detail-input"]'), "Custom detail");
	await userEvent.click(requiredElement('[data-testid="previous"]'));
	await settle();

	expect(new FormData(form()).get("channel")).toBe("email");
	expect(new FormData(form()).get("detail")).toBe("Custom detail");

	await userEvent.click(requiredElement('[data-testid="reset"]'));
	await settle();

	expect(requiredElement('[data-testid="channel"]').hidden).toBe(false);
	expect(requiredElement('[data-testid="detail"]').hidden).toBe(true);
	expect(choiceInput("email").checked).toBe(true);
	expect(requiredElement<HTMLInputElement>('[data-testid="detail-input"]').value).toBe(
		"Default detail"
	);
	expect(
		requiredElement<HTMLInputElement>('[data-testid="controlled-detail-input"]').value
	).toBe("Controlled detail");
});

async function renderBrowser(scenario: string, setup?: (next: typeof model) => void) {
	const nextContainer = document.createElement("div");
	document.body.appendChild(nextContainer);
	setContainer(nextContainer);
	renderCase(scenario, setup);
	await settle();
}

function settle(frames = 2) {
	return new Promise<void>((resolve) => {
		let remaining = frames;

		function nextFrame() {
			if (remaining-- <= 0) {
				resolve();
				return;
			}

			requestAnimationFrame(nextFrame);
		}

		requestAnimationFrame(nextFrame);
	});
}
