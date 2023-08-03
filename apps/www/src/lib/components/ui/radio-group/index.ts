import {
	createRadioGroup,
	melt,
	type RadioGroupItemProps as ItemProps,
	type CreateRadioGroupProps as RadioGroupProps,
	type RadioGroup as RadioGroupReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import Root from "./RadioGroup.svelte";
import Item from "./RadioGroupItem.svelte";
import Input from "./RadioGroupInput.svelte";

type ObjectVariation<T> = T extends object ? T : never;
const NAME = "radiogroup";

export const ctx = {
	set,
	get,
	getItem,
	getInput: () => get().elements.itemInput
};

function set(props: RadioGroupProps) {
	const radioGroup = createRadioGroup(props);
	setContext(NAME, radioGroup);
	const {
		elements: { root }
	} = radioGroup;
	return root;
}

function get() {
	return getContext<RadioGroupReturn>(NAME);
}

function getItem() {
	const {
		elements: { item },
		helpers: { isChecked }
	} = get();
	return { item, isChecked };
}

export { melt, RadioGroupProps };
export type RadioGroupItemProps = ObjectVariation<ItemProps>;
export const RadioGroup = Object.assign(Root, {
	Item,
	Input
});

export {
	Root as RadioGroupRoot,
	Item as RadioGroupItem,
	Input as RadioGroupInput
};
