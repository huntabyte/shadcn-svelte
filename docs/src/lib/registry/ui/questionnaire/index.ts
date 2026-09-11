import Actions from "./questionnaire-actions.svelte";
import Choice from "./questionnaire-choice.svelte";
import ChoiceDescription from "./questionnaire-choice-description.svelte";
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
import Root from "./questionnaire.svelte";

export {
	Root,
	Progress,
	Item,
	Title,
	Description,
	Choices,
	Choice,
	ChoiceDescription,
	Input,
	Error,
	Actions,
	Previous,
	Skip,
	Next,
	Submit,
	//
	Root as Questionnaire,
	Progress as QuestionnaireProgress,
	Item as QuestionnaireItem,
	Title as QuestionnaireTitle,
	Description as QuestionnaireDescription,
	Choices as QuestionnaireChoices,
	Choice as QuestionnaireChoice,
	ChoiceDescription as QuestionnaireChoiceDescription,
	Input as QuestionnaireInput,
	Error as QuestionnaireError,
	Actions as QuestionnaireActions,
	Previous as QuestionnairePrevious,
	Skip as QuestionnaireSkip,
	Next as QuestionnaireNext,
	Submit as QuestionnaireSubmit,
};
