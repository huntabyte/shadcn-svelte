import { Form as Root } from "@formisch/svelte";
import { FieldLegend as Legend } from "$lib/registry/ui/field/index.js";
import Control from "./form-control.svelte";
import Description from "./form-description.svelte";
import FieldErrors from "./form-field-errors.svelte";
import Field from "./form-field.svelte";
import Fieldset from "./form-fieldset.svelte";
import Label from "./form-label.svelte";

export { Root, Field, Fieldset, Control, Label, Legend, Description, FieldErrors };
