import { mount, tick, unmount } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import QuestionnaireTest from "./questionnaire.test.svelte";

let component: ReturnType<typeof mount> | undefined;

afterEach(async () => {
	if (component) await unmount(component);
	component = undefined;
	document.body.innerHTML = "";
});

describe("Questionnaire", () => {
	it("selects choices, navigates, and submits native form data", async () => {
		const onsubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
		component = mount(QuestionnaireTest, { target: document.body, props: { onsubmit } });
		await tick();

		const progress = document.querySelector('[role="progressbar"]');
		const dashboard = document.querySelector<HTMLInputElement>('[aria-label="Dashboard"]');
		const next = Array.from(document.querySelectorAll("button")).find(
			(button) => button.textContent === "Next"
		);
		expect(progress?.textContent).toContain("Question 1 of 2");
		expect(dashboard?.getAttribute("data-questionnaire-shortcut")).toBe("A");

		dashboard?.click();
		await tick();
		expect(dashboard?.checked).toBe(true);
		next?.click();
		await tick();

		expect(progress?.textContent).toContain("Question 2 of 2");
		const risks = document.querySelector<HTMLInputElement>('[aria-label="Risks"]');
		risks?.click();
		await tick();
		expect(risks?.checked).toBe(true);

		const submit = Array.from(document.querySelectorAll("button")).find(
			(button) => button.textContent === "Submit"
		);
		submit?.click();
		await tick();
		expect(onsubmit).toHaveBeenCalledOnce();
		const formData = new FormData(document.querySelector("form")!);
		expect(formData.get("direction")).toBe("dashboard");
		expect(formData.getAll("signals")).toEqual(["risks"]);
	});
});
