import { createContext, onDestroy } from "svelte";
import type {
	AnyFieldApi,
	DeepKeys,
	DeepValue,
	FieldApi,
	FieldApiOptions,
	FormApi,
} from "@tanstack/svelte-form";

// TanStack Form's types take a long list of validator generics that we don't care about here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

/** The form instance returned by `createForm`. */
export type FormOf<TFormData> = FormApi<
	TFormData,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any
>;

/** The field passed to the children of `Form.Field` and `Form.Fieldset`. */
export type FormFieldApi<TFormData, TName extends DeepKeys<TFormData>> = FieldApi<
	TFormData,
	TName,
	DeepValue<TFormData, TName>,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any,
	Any
>;

/** Field level options that `Form.Field` and `Form.Fieldset` pass on to TanStack Form. */
export type FormFieldOptions<TFormData, TName extends DeepKeys<TFormData>> = Pick<
	FieldApiOptions<
		TFormData,
		TName,
		DeepValue<TFormData, TName>,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any,
		Any
	>,
	"validators"
>;

const [getFormFieldState, setFormFieldState] = createContext<FormFieldState>();

const [getFormControlState, setFormControlState] = createContext<FormControlState>();

export class FormFieldState {
	/** Set by `Form.Description` so the control only references it when it exists. */
	hasDescription = $state(false);

	constructor(
		readonly id: string,
		readonly field: AnyFieldApi
	) {}

	/** Creates the state for a field and shares it with the components inside it. */
	static create(id: string, field: AnyFieldApi) {
		return setFormFieldState(new FormFieldState(id, field));
	}

	static get() {
		return getFormFieldState();
	}

	/** Errors are only shown once the field has been touched. */
	get isInvalid() {
		const { meta } = this.field.state;
		return meta.isTouched && !meta.isValid;
	}

	/** Validators return either issue objects with a `message` or plain strings. */
	get errors() {
		return this.field.state.meta.errors.map((error: unknown) =>
			typeof error === "string" ? { message: error } : (error as { message?: string } | undefined)
		);
	}

	get descriptionId() {
		return `${this.id}-description`;
	}

	get errorId() {
		return `${this.id}-error`;
	}
}

export class FormDescriptionState {
	constructor(readonly fieldState: FormFieldState) {
		// Register while the component initializes so the control can reference the description.
		fieldState.hasDescription = true;
		onDestroy(() => (fieldState.hasDescription = false));
	}

	/** Creates the state for a description and registers it with the current field. */
	static create() {
		return new FormDescriptionState(FormFieldState.get());
	}

	get id() {
		return this.fieldState.descriptionId;
	}
}

export type FormControlProps = {
	id: string;
	name: string;
	onblur: () => void;
	"aria-invalid": boolean;
	"aria-describedby": string | undefined;
};

export class FormControlState {
	constructor(
		readonly id: string,
		readonly fieldState: FormFieldState
	) {}

	/** Creates the state for a control and shares it with the components inside the field. */
	static create(id: string) {
		return setFormControlState(new FormControlState(id, FormFieldState.get()));
	}

	static get() {
		return getFormControlState();
	}

	/** The props to spread onto the form control. */
	get props(): FormControlProps {
		const { fieldState } = this;
		return {
			id: this.id,
			name: fieldState.field.name,
			onblur: fieldState.field.handleBlur,
			"aria-invalid": fieldState.isInvalid,
			"aria-describedby":
				[
					fieldState.hasDescription ? fieldState.descriptionId : undefined,
					fieldState.isInvalid ? fieldState.errorId : undefined,
				]
					.filter(Boolean)
					.join(" ") || undefined,
		};
	}
}
