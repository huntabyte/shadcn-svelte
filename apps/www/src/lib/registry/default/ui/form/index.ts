import * as FormPrimitive from "@huntabyte/fsnap";
import Description from "./form-description.svelte";
import Label from "./form-label.svelte";
import FieldErrors from "./form-field-errors.svelte";
import Field from "./form-field.svelte";

const Control = FormPrimitive.Control;
const Fieldset = FormPrimitive.Fieldset;
const Legend = FormPrimitive.Legend;
const ElementField = FormPrimitive.ElementField;

export {
	Field,
	Control,
	Label,
	FieldErrors,
	Description,
	Fieldset,
	Legend,
	ElementField,
	//
	Field as FormField,
	Control as FormControl,
	Description as FormDescription,
	Label as FormLabel,
	FieldErrors as FormFieldErrors,
	Fieldset as FormFieldset,
	Legend as FormLegend,
	ElementField as FormElementField,
};
