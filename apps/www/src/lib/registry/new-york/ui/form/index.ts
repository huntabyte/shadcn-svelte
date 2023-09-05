import { Form as FormPrimitive, getFormField } from "formsnap";
import type { Writable } from "svelte/store";
import * as RadioGroupComp from "@/registry/new-york/ui/radio-group";
import * as SelectComp from "@/registry/new-york/ui/select";
import Item from "./form-item.svelte";
import Input from "./form-input.svelte";
import Textarea from "./form-textarea.svelte";
import Description from "./form-description.svelte";
import Label from "./form-label.svelte";
import Validation from "./form-validation.svelte";
import Checkbox from "./form-checkbox.svelte";
import Switch from "./form-switch.svelte";
import NativeSelect from "./form-native-select.svelte";
import RadioGroup from "./form-radio-group.svelte";
import Select from "./form-select.svelte";
import SelectTrigger from "./form-select-trigger.svelte";
import Button from "./form-button.svelte";

const Root = FormPrimitive.Root;
const Field = FormPrimitive.Field;
const RadioItem = RadioGroupComp.Item;
const NativeRadio = FormPrimitive.Radio;
const SelectContent = SelectComp.Content;
const SelectLabel = SelectComp.Label;
const SelectGroup = SelectComp.Group;
const SelectItem = SelectComp.Item;
const SelectSeparator = SelectComp.Separator;

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
	Label,
	Button,
	Switch,
	Select,
	Checkbox,
	Textarea,
	Validation,
	RadioGroup,
	RadioItem,
	Description,
	SelectContent,
	SelectLabel,
	SelectGroup,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	NativeSelect,
	NativeRadio,
	//
	Root as Form,
	Field as FormField,
	Item as FormItem,
	Input as FormInput,
	Textarea as FormTextarea,
	Description as FormDescription,
	Label as FormLabel,
	Validation as FormValidation,
	NativeSelect as FormNativeSelect,
	NativeRadio as FormNativeRadio,
	Checkbox as FormCheckbox,
	Switch as FormSwitch,
	RadioGroup as FormRadioGroup,
	RadioItem as FormRadioItem,
	Select as FormSelect,
	SelectContent as FormSelectContent,
	SelectLabel as FormSelectLabel,
	SelectGroup as FormSelectGroup,
	SelectItem as FormSelectItem,
	SelectSeparator as FormSelectSeparator,
	SelectTrigger as FormSelectTrigger,
	Button as FormButton
};
