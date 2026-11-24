import { createContext } from "svelte";
import type { FieldStore } from "@formisch/svelte";

export class FormFieldState {
	/** Set by `Form.Description` so the control only references it when it exists. */
	hasDescription = $state(false);

	constructor(
		readonly id: string,
		readonly field: FieldStore
	) {}
}

export const [getFormFieldState, setFormFieldState] = createContext<FormFieldState>();

export const [getFormControlId, setFormControlId] = createContext<string>();
