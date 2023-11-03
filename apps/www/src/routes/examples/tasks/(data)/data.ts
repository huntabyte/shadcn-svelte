import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	CheckCircled,
	Circle,
	CrossCircled,
	QuestionMarkCircled,
	Stopwatch
} from "radix-icons-svelte";

export const labels = [
	{
		value: "bug",
		label: "Bug"
	},
	{
		value: "feature",
		label: "Feature"
	},
	{
		value: "documentation",
		label: "Documentation"
	}
];

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: QuestionMarkCircled
	},
	{
		value: "todo",
		label: "Todo",
		icon: Circle
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: Stopwatch
	},
	{
		value: "done",
		label: "Done",
		icon: CheckCircled
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CrossCircled
	}
];

export const priorities = [
	{
		label: "Low",
		value: "low",
		icon: ArrowDown
	},
	{
		label: "Medium",
		value: "medium",
		icon: ArrowRight
	},
	{
		label: "High",
		value: "high",
		icon: ArrowUp
	}
];
