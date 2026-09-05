import Actions from "./questionnaire-actions.svelte";
import Choice from "./questionnaire-choice.svelte";
import Choices from "./questionnaire-choices.svelte";
import Description from "./questionnaire-description.svelte";
import Error from "./questionnaire-error.svelte";
import Input from "./questionnaire-input.svelte";
import Item from "./questionnaire-item.svelte";
import Next from "./questionnaire-next.svelte";
import Previous from "./questionnaire-previous.svelte";
import Progress from "./questionnaire-progress.svelte";
import Skip from "./questionnaire-skip.svelte";
import Submit from "./questionnaire-submit.svelte";
import Title from "./questionnaire-title.svelte";
import Questionnaire from "./questionnaire.svelte";

export {
	Questionnaire as Root,
	Item,
	Choice,
	Choices,
	Input,
	Title,
	Description,
	Error,
	Actions,
	Progress,
	Previous,
	Skip,
	Next,
	Submit,
	Item as QuestionnaireItem,
	Choice as QuestionnaireChoice,
	Choices as QuestionnaireChoices,
	Input as QuestionnaireInput,
	Title as QuestionnaireTitle,
	Description as QuestionnaireDescription,
	Error as QuestionnaireError,
	Actions as QuestionnaireActions,
	Progress as QuestionnaireProgress,
	Previous as QuestionnairePrevious,
	Skip as QuestionnaireSkip,
	Next as QuestionnaireNext,
	Submit as QuestionnaireSubmit,
};

export type {
	QuestionnaireChoiceDefinition,
	QuestionnaireItemDefinition,
	QuestionnaireItemStatus,
	QuestionnaireShortcutMode,
} from "@shadcn-svelte/primitives/questionnaire";
