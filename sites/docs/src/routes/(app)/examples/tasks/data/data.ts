import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
import CircleIcon from "@lucide/svelte/icons/circle";
import CircleOffIcon from "@lucide/svelte/icons/circle-off";
import CircleHelpIcon from "@lucide/svelte/icons/circle-help";
import TimerIcon from "@lucide/svelte/icons/timer";

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
		icon: CircleHelpIcon,
	},
	{
		value: "todo",
		label: "Todo",
		icon: CircleIcon,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: TimerIcon,
	},
	{
		value: "done",
		label: "Done",
		icon: CircleCheckIcon,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CircleOffIcon,
	},
];

export const priorities = [
	{
		label: "Low",
		value: "low",
		icon: ArrowDownIcon,
	},
	{
		label: "Medium",
		value: "medium",
		icon: ArrowRightIcon,
	},
	{
		label: "High",
		value: "high",
		icon: ArrowUpIcon,
	},
];
