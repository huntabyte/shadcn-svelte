import {
	createSwitch,
	type CreateSwitchProps,
	type Switch as SwitchReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { getOptionUpdater, removeUndefined } from "../internal/helpers";

const NAME = "Switch";
export const ctx = {
	set,
	get
};

function set(props: CreateSwitchProps) {
	const Switch = createSwitch(removeUndefined(props));
	setContext(NAME, Switch);
	return {
		...Switch,
		updateOption: getOptionUpdater(Switch.options)
	};
}

function get() {
	return getContext<SwitchReturn>(NAME);
}
