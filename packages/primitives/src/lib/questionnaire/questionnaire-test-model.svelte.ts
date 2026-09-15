import type {
	QuestionnaireInputType,
	QuestionnaireItemDefinition,
	QuestionnaireItemStatus,
	QuestionnaireShortcutMode,
} from "./types.js";

export const ssrItems = [
	{
		choices: [
			{ value: "delegation" },
			{ disabled: true, value: "automatic" },
			{ value: "questions" },
		],
		name: "scope",
		required: true,
	},
	{
		choices: [{ value: "ignored" }],
		disabled: true,
		name: "disabled",
	},
	{
		choices: [{ value: "focused" }, { value: "complete" }],
		name: "detail",
	},
] as const satisfies readonly QuestionnaireItemDefinition[];

export class QuestionnaireTestModel {
	scenario = $state("default");
	defaultItem = $state<string | undefined>(undefined);
	item = $state<string | undefined>(undefined);
	items = $state<readonly QuestionnaireItemDefinition[] | undefined>(undefined);
	shortcuts = $state<QuestionnaireShortcutMode | undefined>(undefined);
	noValidate = $state<boolean | undefined>(undefined);
	multiple = $state(true);
	answersDisabled = $state(false);
	inputType = $state<QuestionnaireInputType>("text");
	includeMiddle = $state(false);
	shortcutCount = $state(27);
	showInput = $state(false);
	showAdditionalDetails = $state(true);
	defaultsChanged = $state(false);
	preventKeyDown = $state(false);
	firstInvalid = $state(false);
	includeChoice = $state(true);
	checked = $state(false);
	inputValue = $state("");
	controlledValue = $state("");
	skippedValue = $state<string | null>("");
	definitions = $state<QuestionnaireItemDefinition[]>([
		{ name: "first" },
		{ name: "second" },
		{ name: "third" },
	]);
	numericChoices = $state<{ value: string }[]>(
		Array.from({ length: 10 }, (_, index) => ({ value: `choice-${index + 1}` }))
	);
	middleItems = $state([
		{ name: "first" },
		{ name: "middle" },
		{ name: "last" },
	]);

	onSubmit: ((event: SubmitEvent) => void) | undefined = undefined;
	onItemChange: ((item: string) => void) | undefined = undefined;
	onStatusChange: ((status: QuestionnaireItemStatus) => void) | undefined = undefined;
	onChange: ((event: Event) => void) | undefined = undefined;

	handleRootKeyDown(event: KeyboardEvent) {
		if (this.preventKeyDown) {
			event.preventDefault();
		}
	}

	handleItemChange(nextItem: string) {
		this.onItemChange?.(nextItem);
		this.item = nextItem;
	}

	handleCheckedChange(event: Event) {
		this.checked = (event.target as HTMLInputElement).checked;
	}

	handleInputChange(event: Event) {
		this.inputValue = (event.target as HTMLInputElement).value;
	}

	handleCoordinatedInputChange(event: Event) {
		const nextValue = (event.target as HTMLInputElement).value;
		this.inputValue = nextValue;
		if (nextValue.trim().length > 0) {
			this.checked = false;
		}
	}
}
