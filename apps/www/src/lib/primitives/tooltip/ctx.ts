import {
	createTooltip,
	type Tooltip as TooltipReturn,
	type CreateTooltipProps
} from "@melt-ui/svelte";
import { getOptionUpdater, removeUndefined } from "../internal/helpers";
import { getContext, setContext } from "svelte";

const NAME = "Tooltip";

export const ctx = {
	set,
	get
};

function set(props: CreateTooltipProps) {
	const tooltip = createTooltip({
		positioning: {
			placement: "top"
		},
		openDelay: 700,
		...removeUndefined(props),
		forceVisible: true
	});
	setContext(NAME, tooltip);
	return {
		...tooltip,
		updateOption: getOptionUpdater(tooltip.options)
	};
}

function get(sideOffset = 0) {
	const tooltip = getContext<TooltipReturn>(NAME);

	const {
		options: { positioning }
	} = tooltip;
	positioning.update((prev) => ({ ...prev, gutter: sideOffset }));

	return tooltip;
}
