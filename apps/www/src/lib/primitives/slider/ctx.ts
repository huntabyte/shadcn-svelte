import { getOptionUpdater, removeUndefined } from "$primitives/internal";
import {
	createSlider,
	type CreateSliderProps,
	type Slider as SliderReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

const NAME = "Slider";
export const ctx = {
	set,
	get
};

function set(props: CreateSliderProps) {
	const slider = createSlider(removeUndefined(props));
	setContext(NAME, slider);
	return {
		...slider,
		updateOption: getOptionUpdater(slider.options)
	};
}

function get() {
	return getContext<SliderReturn>(NAME);
}
