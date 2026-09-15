import type {
	OnChangeFn,
	WithChild,
	WithChildNoChildrenSnippetProps,
	Without,
} from "$lib/internal/types.js";
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

export type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped";
export type QuestionnaireShortcutMode = "letters" | "numbers";

export type QuestionnaireChoiceDefinition = {
	disabled?: boolean;
	value: string;
};

export type QuestionnaireItemDefinition = {
	choices?: readonly QuestionnaireChoiceDefinition[];
	disabled?: boolean;
	name: string;
	required?: boolean;
};

export type QuestionnaireRootState = {
	current: number;
	first: boolean;
	last: boolean;
	total: number;
};

export type QuestionnaireRootPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		defaultItem?: string;
		item?: string;
		items?: readonly QuestionnaireItemDefinition[];
		noValidate?: boolean;
		onItemChange?: OnChangeFn<string>;
		onReset?: (event: Event) => void;
		onSubmit?: (event: SubmitEvent) => void;
		shortcuts?: QuestionnaireShortcutMode;
	},
	QuestionnaireRootState
>;

export type QuestionnaireRootProps = QuestionnaireRootPropsWithoutHTML &
	Without<PrimitiveFormAttributes, QuestionnaireRootPropsWithoutHTML>;

export type QuestionnaireProgressState = QuestionnaireRootState;

export type QuestionnaireProgressPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<string, never>,
	QuestionnaireProgressState
>;

export type QuestionnaireProgressProps = QuestionnaireProgressPropsWithoutHTML &
	Without<PrimitiveDivAttributes, QuestionnaireProgressPropsWithoutHTML>;

export type QuestionnaireItemState = {
	active: boolean;
	disabled: boolean;
	invalid: boolean;
	multiple: boolean;
	required: boolean;
	status: QuestionnaireItemStatus;
};

export type QuestionnaireItemPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		invalid?: boolean;
		name: string;
		multiple?: boolean;
		onStatusChange?: OnChangeFn<QuestionnaireItemStatus>;
		required?: boolean;
		disabled?: boolean;
	},
	QuestionnaireItemState
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
	shortcuts: QuestionnaireShortcutMode | null;
};

export type QuestionnaireChoicesPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<string, never>,
	QuestionnaireChoicesState
>;
export type QuestionnaireChoicesProps = QuestionnaireChoicesPropsWithoutHTML &
	Without<PrimitiveDivAttributes, QuestionnaireChoicesPropsWithoutHTML>;

export type QuestionnaireErrorPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<string, never>,
	Pick<QuestionnaireItemState, "invalid">
>;
export type QuestionnaireErrorProps = QuestionnaireErrorPropsWithoutHTML &
	Without<PrimitiveParagraphAttributes, QuestionnaireErrorPropsWithoutHTML>;

export type QuestionnaireChoiceState = {
	checked: boolean;
	disabled: boolean;
	invalid: boolean;
	shortcut: string | null;
	type: "checkbox" | "radio";
};

export type QuestionnaireChoicePropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		checked?: boolean;
		defaultChecked?: boolean;
		disabled?: boolean;
		onChange?: (event: Event) => void;
		value: string;
	},
	QuestionnaireChoiceState
>;
export type QuestionnaireChoiceProps = QuestionnaireChoicePropsWithoutHTML &
	Without<PrimitiveLabelAttributes, QuestionnaireChoicePropsWithoutHTML>;

export type QuestionnaireChoiceInputPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<string, never>,
	QuestionnaireChoiceState
>;
export type QuestionnaireChoiceInputProps = QuestionnaireChoiceInputPropsWithoutHTML &
	Without<PrimitiveInputAttributes, QuestionnaireChoiceInputPropsWithoutHTML>;

export type QuestionnaireChoiceLabelPropsWithoutHTML = WithChild;
export type QuestionnaireChoiceLabelProps = QuestionnaireChoiceLabelPropsWithoutHTML &
	Without<PrimitiveSpanAttributes, QuestionnaireChoiceLabelPropsWithoutHTML>;

export type QuestionnaireChoiceShortcutState = Pick<QuestionnaireChoiceState, "shortcut">;
export type QuestionnaireChoiceShortcutPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	Record<string, never>,
	QuestionnaireChoiceShortcutState
>;
export type QuestionnaireChoiceShortcutProps = QuestionnaireChoiceShortcutPropsWithoutHTML &
	Without<PrimitiveSpanAttributes, QuestionnaireChoiceShortcutPropsWithoutHTML>;

export type QuestionnaireInputState = {
	disabled: boolean;
	filled: boolean;
	invalid: boolean;
};

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
		type?: QuestionnaireInputType;
		disabled?: boolean;
		value?: string;
		defaultValue?: string;
		onChange?: (event: Event) => void;
	},
	QuestionnaireInputState
>;
export type QuestionnaireInputProps = QuestionnaireInputPropsWithoutHTML &
	Without<PrimitiveInputAttributes, QuestionnaireInputPropsWithoutHTML>;

export type QuestionnaireNavigationState = {
	disabled: boolean;
	shortcut: "Enter" | null;
	status: QuestionnaireItemStatus | null;
	visible: boolean;
};

export type QuestionnairePreviousPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		disabled?: boolean;
	},
	QuestionnaireNavigationState
>;
export type QuestionnairePreviousProps = QuestionnairePreviousPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, QuestionnairePreviousPropsWithoutHTML>;

export type QuestionnaireSkipPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		disabled?: boolean;
	},
	QuestionnaireNavigationState
>;
export type QuestionnaireSkipProps = QuestionnaireSkipPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, QuestionnaireSkipPropsWithoutHTML>;

export type QuestionnaireNextPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
		disabled?: boolean;
	},
	QuestionnaireNavigationState
>;
export type QuestionnaireNextProps = QuestionnaireNextPropsWithoutHTML &
	Without<PrimitiveButtonAttributes, QuestionnaireNextPropsWithoutHTML>;

export type QuestionnaireSubmitPropsWithoutHTML = WithChildNoChildrenSnippetProps<
	{
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
