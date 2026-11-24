import { createContext, onDestroy } from "svelte";
import type { FieldElementProps, FieldStore } from "@formisch/svelte";

const [getFormFieldState, setFormFieldState] = createContext<FormFieldState>();

const [getFormControlState, setFormControlState] = createContext<FormControlState>();

export class FormFieldState {
	/** Set by `Form.Description` so the control only references it when it exists. */
	hasDescription = $state(false);

	constructor(
		readonly id: string,
		/** Only the parts of the field store that don't depend on the schema or path. */
		readonly field: Pick<FieldStore, "errors" | "props">
	) {}

	/** Creates the state for a field and shares it with the components inside it. */
	static create(id: string, field: FormFieldState["field"]) {
		return setFormFieldState(new FormFieldState(id, field));
	}

	static get() {
		return getFormFieldState();
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

type ControlAttributes = {
	id: string;
	"aria-invalid": boolean;
	"aria-describedby": string | undefined;
};

type NativeControlProps = FieldElementProps & ControlAttributes;
type CustomControlProps = Omit<FieldElementProps, "oninput" | "onchange"> & ControlAttributes;

export type FormControlProps<TCustom extends boolean = false> = TCustom extends true
	? CustomControlProps
	: NativeControlProps;

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

	get #attributes(): ControlAttributes {
		const { fieldState } = this;
		return {
			id: this.id,
			"aria-invalid": !!fieldState.field.errors,
			"aria-describedby":
				[
					fieldState.hasDescription ? fieldState.descriptionId : undefined,
					fieldState.field.errors ? fieldState.errorId : undefined,
				]
					.filter(Boolean)
					.join(" ") || undefined,
		};
	}

	/**
	 * The props to spread onto the form control. When `custom` is set the `oninput` and `onchange`
	 * handlers are left out, since components like `Select` never fire those events.
	 */
	props<TCustom extends boolean = false>(custom?: TCustom): FormControlProps<TCustom>;
	props(custom?: boolean): NativeControlProps | CustomControlProps {
		const { oninput, onchange, ...rest } = this.fieldState.field.props;
		return custom
			? { ...rest, ...this.#attributes }
			: { ...rest, oninput, onchange, ...this.#attributes };
	}
}
