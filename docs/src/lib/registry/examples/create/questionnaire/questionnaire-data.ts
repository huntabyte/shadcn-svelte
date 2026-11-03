import { toast } from "svelte-sonner";

export const questionnaireItems = [
	{
		choices: [{ value: "delegation" }, { value: "questions" }, { value: "both" }],
		name: "direction",
		required: true,
	},
	{
		choices: [{ value: "progress" }, { value: "decisions" }, { value: "risks" }],
		name: "signals",
	},
	{
		choices: [{ value: "week" }, { value: "cycle" }, { value: "later" }],
		name: "timing",
		required: true,
	},
] as const;

export const taskItems = [
	{
		choices: [{ value: "inspect" }, { value: "implement" }, { value: "review" }],
		name: "task",
		required: true,
	},
] as const;

export const planItems = [
	{
		choices: [{ value: "plus" }, { value: "pro" }, { value: "enterprise", disabled: true }],
		name: "plan",
		required: true,
	},
] as const;

export function handleSubmit(event: SubmitEvent) {
	event.preventDefault();

	const formData = new FormData(event.currentTarget as HTMLFormElement);
	const values = {
		direction: formData.get("direction"),
		signals: formData.getAll("signals"),
		timing: formData.get("timing"),
	};

	toast("Questionnaire submitted", {
		description: `Direction: ${values.direction ?? "None"} · Progress signals: ${values.signals.join(", ") || "None"} · Timing: ${values.timing ?? "None"}`,
	});
}
