import type {
	PrimitiveButtonAttributes,
	PrimitiveDivAttributes,
	PrimitiveFieldsetAttributes,
	PrimitiveFormAttributes,
	PrimitiveInputAttributes,
	PrimitiveLabelAttributes,
	PrimitiveLegendAttributes,
	PrimitiveParagraphAttributes,
	PrimitiveSpanAttributes,
} from "$lib/internal/attributes.js";
import type {
	OnChangeFn,
	WithChild,
	WithChildNoChildrenSnippetProps,
	Without,
} from "$lib/internal/types.js";
import type { EventHandler, FormEventHandler } from "svelte/elements";

export type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped";
export type QuestionnaireShortcutMode = "letters" | "numbers";

export type QuestionnaireChoiceDefinition = {
	/** Excludes the choice from answers and shortcuts. */
	disabled?: boolean;
	/** The submitted value. */
	value: string;
};

export type QuestionnaireItemDefinition = {
	/** Fixed choices, in display order. */
	choices?: readonly QuestionnaireChoiceDefinition[];
	/** Removes the item from navigation and progress. */
	disabled?: boolean;
	/** Unique form field name. Also used as the identifier for `item`, `defaultItem`, and `onItemChange`. */
	name: string;
	/**
	 * Whether an answer is needed before moving past the item.
	 *
	 * @default false
	 */
	required?: boolean;
};

export type QuestionnaireRootState = {
	/** 1-based position of the active item among enabled items, or 0 when none is active. */
	current: number;
	/** The active item is the first enabled item. */
	first: boolean;
	/** The active item is the last enabled item. */
	last: boolean;
	/** Number of enabled items. */
	total: number;
};

export type QuestionnaireRootPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/** Name of the item to open on when uncontrolled. Defaults to the first enabled item. */
		defaultItem?: string;
		/** Controlled active item name. */
		item?: string;
		/** Ordered item definitions. Required for server rendering, and lets progress and shortcuts resolve before the parts register in the DOM. */
		items?: readonly QuestionnaireItemDefinition[];
		/**
		 * Sets `novalidate` on the form so the primitive's own validation runs instead of the browser's.
		 *
		 * @default true
		 */
		noValidate?: boolean;
		/** Called with the item name whenever navigation changes the active item. */
		onItemChange?: OnChangeFn<string>;
		/** Native reset handler, called before every item restores its default answers. */
		onReset?: FormEventHandler<HTMLFormElement>;
		/** Native submit handler. Every item is validated first, when one fails, submission is prevented and that item becomes active instead. */
		onSubmit?: EventHandler<SubmitEvent, HTMLFormElement>;
		/** Assigns a keyboard shortcut to each fixed choice of the active item. */
		shortcuts?: QuestionnaireShortcutMode;
	},
	QuestionnaireRootState,
	HTMLFormElement
>;

export type QuestionnaireRootProps = QuestionnaireRootPropsWithoutHTML &
	Without<PrimitiveFormAttributes, QuestionnaireRootPropsWithoutHTML>;

export type QuestionnaireProgressState = QuestionnaireRootState;

export type QuestionnaireProgressPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<never, never>,
	QuestionnaireProgressState
>;

export type QuestionnaireProgressProps = QuestionnaireProgressPropsWithoutHTML &
	Without<PrimitiveDivAttributes, QuestionnaireProgressPropsWithoutHTML>;

export type QuestionnaireItemState = {
	/** This is the active item. Inactive items are hidden and inert. */
	active: boolean;
	/** The item, or the form, is disabled. */
	disabled: boolean;
	/** The `invalid` prop is set or the item failed validation. */
	invalid: boolean;
	/** Choices render as checkboxes and more than one may be selected. */
	multiple: boolean;
	/** An answer is needed before moving past the item. */
	required: boolean;
	/** Current answer state. */
	status: QuestionnaireItemStatus;
};

export type QuestionnaireItemPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/** Marks the item invalid from external validation, such as a schema error. Navigation returns to it and `Error` becomes visible. */
		invalid?: boolean;
		/** Unique form field name. Matches the `items` entry and the `item` prop. */
		name: string;
		/**
		 * Render fixed choices as checkboxes so more than one can be selected.
		 *
		 * @default false
		 */
		multiple?: boolean;
		/** Called whenever the item's status changes. */
		onStatusChange?: OnChangeFn<QuestionnaireItemStatus>;
		/**
		 * Whether an answer is needed before moving past the item.
		 *
		 * @default false
		 */
		required?: boolean;
		/** Removes the item from navigation and progress. */
		disabled?: boolean;
	},
	QuestionnaireItemState,
	HTMLFieldSetElement
>;

export type QuestionnaireItemProps = QuestionnaireItemPropsWithoutHTML &
	Without<PrimitiveFieldsetAttributes, QuestionnaireItemPropsWithoutHTML>;

export type QuestionnaireTitlePropsWithoutHTML = WithChild;
export type QuestionnaireTitleProps = QuestionnaireTitlePropsWithoutHTML &
	Without<PrimitiveLegendAttributes, QuestionnaireTitlePropsWithoutHTML>;

export type QuestionnaireDescriptionPropsWithoutHTML = WithChild;
export type QuestionnaireDescriptionProps = QuestionnaireDescriptionPropsWithoutHTML &
	Without<PrimitiveParagraphAttributes, QuestionnaireDescriptionPropsWithoutHTML>;

export type QuestionnaireChoicesState = {
	/** The root's shortcut mode, or `null` when shortcuts are off. */
	shortcuts: QuestionnaireShortcutMode | null;
};

export type QuestionnaireChoicesPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<never, never>,
	QuestionnaireChoicesState
>;
export type QuestionnaireChoicesProps = QuestionnaireChoicesPropsWithoutHTML &
	Without<PrimitiveDivAttributes, QuestionnaireChoicesPropsWithoutHTML>;

export type QuestionnaireErrorPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<never, never>,
	Pick<QuestionnaireItemState, "invalid">
>;
export type QuestionnaireErrorProps = QuestionnaireErrorPropsWithoutHTML &
	Without<PrimitiveParagraphAttributes, QuestionnaireErrorPropsWithoutHTML>;

export type QuestionnaireChoiceState = {
	/** The choice is currently selected. */
	checked: boolean;
	/** The choice, its item, or the form is disabled. */
	disabled: boolean;
	/** The owning item is invalid. */
	invalid: boolean;
	/** Assigned shortcut key, or `null` when none applies. */
	shortcut: string | null;
	/** `radio` for single-answer items, `checkbox` when the item is `multiple`. */
	type: "checkbox" | "radio";
};

export type QuestionnaireChoicePropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/** Controlled checked state. */
		checked?: boolean;
		/** Initial checked state when uncontrolled. Restores on form reset. */
		defaultChecked?: boolean;
		/** Excludes the choice from answers and shortcuts. */
		disabled?: boolean;
		/** Native `change` handler for the underlying input. */
		onChange?: (event: Event) => void;
		/** Submitted value under the item's `name`. */
		value: string;
	},
	QuestionnaireChoiceState
>;
export type QuestionnaireChoiceProps = QuestionnaireChoicePropsWithoutHTML &
	Without<PrimitiveLabelAttributes, QuestionnaireChoicePropsWithoutHTML>;

export type QuestionnaireChoiceInputPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<never, never>,
	QuestionnaireChoiceState,
	HTMLInputElement
>;
export type QuestionnaireChoiceInputProps = QuestionnaireChoiceInputPropsWithoutHTML &
	Without<PrimitiveInputAttributes, QuestionnaireChoiceInputPropsWithoutHTML>;

export type QuestionnaireChoiceLabelPropsWithoutHTML = WithChild;
export type QuestionnaireChoiceLabelProps = QuestionnaireChoiceLabelPropsWithoutHTML &
	Without<PrimitiveSpanAttributes, QuestionnaireChoiceLabelPropsWithoutHTML>;

export type QuestionnaireChoiceShortcutState = Pick<QuestionnaireChoiceState, "shortcut">;
export type QuestionnaireChoiceShortcutPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<never, never>,
	QuestionnaireChoiceShortcutState
>;
export type QuestionnaireChoiceShortcutProps = QuestionnaireChoiceShortcutPropsWithoutHTML &
	Without<PrimitiveSpanAttributes, QuestionnaireChoiceShortcutPropsWithoutHTML>;

export type QuestionnaireInputState = {
	/** The input, its item, or the form is disabled. */
	disabled: boolean;
	/** The input has a non-empty value. */
	filled: boolean;
	/** The owning item is invalid. */
	invalid: boolean;
};

/** Native input types a freeform answer may use. */
export type QuestionnaireInputType =
	| "date"
	| "datetime-local"
	| "email"
	| "month"
	| "number"
	| "password"
	| "search"
	| "tel"
	| "text"
	| "time"
	| "url"
	| "week";

export type QuestionnaireInputPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/**
		 * Native input type.
		 *
		 * @default "text"
		 */
		type?: QuestionnaireInputType;
		/** Excludes the input from answers. */
		disabled?: boolean;
		/** Controlled value. */
		value?: string;
		/** Initial value when uncontrolled. Restores on form reset. */
		defaultValue?: string;
		/** Called on native `input` events. */
		onChange?: (event: Event) => void;
	},
	QuestionnaireInputState,
	HTMLInputElement
>;
export type QuestionnaireInputProps = QuestionnaireInputPropsWithoutHTML &
	Without<PrimitiveInputAttributes, QuestionnaireInputPropsWithoutHTML>;

export type QuestionnaireNavigationState = {
	/** The `disabled` prop is set or there is no active item. */
	disabled: boolean;
	/** `Enter` for `Next` and `Submit`, which the active item's Enter key triggers, `null` otherwise. */
	shortcut: "Enter" | null;
	/** Status of the active item, or `null` when none is active. */
	status: QuestionnaireItemStatus | null;
	/** Whether the action currently applies. */
	visible: boolean;
};

export type QuestionnairePreviousPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/** Disables the button regardless of navigation state. */
		disabled?: boolean;
	},
	QuestionnaireNavigationState
>;
export type QuestionnairePreviousProps = QuestionnairePreviousPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, QuestionnairePreviousPropsWithoutHTML>;

export type QuestionnaireSkipPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/** Disables the button regardless of navigation state. */
		disabled?: boolean;
	},
	QuestionnaireNavigationState
>;
export type QuestionnaireSkipProps = QuestionnaireSkipPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, QuestionnaireSkipPropsWithoutHTML>;

export type QuestionnaireNextPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/** Disables the button regardless of navigation state. */
		disabled?: boolean;
	},
	QuestionnaireNavigationState
>;
export type QuestionnaireNextProps = QuestionnaireNextPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, QuestionnaireNextPropsWithoutHTML>;

export type QuestionnaireSubmitPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		/** Disables the button regardless of navigation state. */
		disabled?: boolean;
	},
	QuestionnaireNavigationState
>;
export type QuestionnaireSubmitProps = QuestionnaireSubmitPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, QuestionnaireSubmitPropsWithoutHTML>;

export type AnswerControlRegistration = {
	disabled: boolean;
	element: HTMLInputElement;
	id: string;
} & (
	| {
			ownDisabled: boolean;
			type: "choice";
			value: string;
	  }
	| {
			type: "input";
	  }
);

export type ChoiceRegistration = {
	disabled: boolean;
	value: string;
};

export type ItemRegistration = {
	choices: readonly ChoiceRegistration[];
	disabled: boolean;
	element: HTMLFieldSetElement;
	focus: () => void;
	focusInvalid: () => void;
	getAnswerByElement: (element: Element) => AnswerControlRegistration | null;
	getAnswerByShortcut: (shortcut: string) => AnswerControlRegistration | null;
	moveAnswerFocus: (element: Element, direction: "next" | "previous") => boolean;
	name: string;
	required: boolean;
	reset: () => void;
	skip: () => void;
	status: QuestionnaireItemStatus;
	validate: () => boolean;
};

export type PendingFocus = {
	name: string;
	target: "invalid" | "item";
};
