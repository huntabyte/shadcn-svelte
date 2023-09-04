import { Form as FormPrimitive, getFormField } from "formsnap";
import type { Writable } from "svelte/store";
import Item from "./form-item.svelte";
import Input from "./form-input.svelte";
import Textarea from "./form-textarea.svelte";
import Description from "./form-description.svelte";
import Label from "./form-label.svelte";
import Validation from "./form-validation.svelte";
import Checkbox from "./form-checkbox.svelte";
import Switch from "./form-switch.svelte";
import Select from "./form-select.svelte";

const Root = FormPrimitive.Root;
const Field = FormPrimitive.Field;
const NativeRadio = FormPrimitive.Radio;

export type TextareaGetFormField = Omit<
	ReturnType<typeof getFormField>,
	"value"
> & {
	value: Writable<string>;
};

export {
	Root,
	Field,
	Item,
	Input,
	Textarea,
	Description,
	Label,
	Validation,
	Select,
	NativeRadio,
	Checkbox,
	Switch,
	//
	Root as Form,
	Field as FormField,
	Item as FormItem,
	Input as FormInput,
	Textarea as FormTextarea,
	Description as FormDescription,
	Label as FormLabel,
	Validation as FormValidation,
	Select as FormSelect,
	NativeRadio as FormNativeRadio,
	Checkbox as FormCheckbox,
	Switch as FormSwitch
};
