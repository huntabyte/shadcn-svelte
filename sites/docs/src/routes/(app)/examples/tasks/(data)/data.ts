import ArrowDown from "@lucide/svelte/icons/arrow-down";
import ArrowRight from "@lucide/svelte/icons/arrow-right";
import ArrowUp from "@lucide/svelte/icons/arrow-up";
import CircleCheck from "@lucide/svelte/icons/circle-check";
import Circle from "@lucide/svelte/icons/circle";
import CircleOff from "@lucide/svelte/icons/circle-off";
import CircleHelp from "@lucide/svelte/icons/circle-help";
import Timer from "@lucide/svelte/icons/timer";

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: CircleHelp,
	},
	{
		value: "todo",
		label: "Todo",
		icon: Circle,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: Timer,
	},
	{
		value: "done",
		label: "Done",
		icon: CircleCheck,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CircleOff,
	},
];

export const priorities = [
	{
		label: "Low",
		value: "low",
		icon: ArrowDown,
	},
	{
		label: "Medium",
		value: "medium",
		icon: ArrowRight,
	},
	{
		label: "High",
		value: "high",
		icon: ArrowUp,
	},
];
