<script lang="ts">
	import { Questionnaire } from "./index.js";
	import TestChoice from "./questionnaire-test-choice.svelte";
	import TestItem from "./questionnaire-test-item.svelte";
	import { QuestionnaireTestModel, ssrItems } from "./questionnaire-test-model.svelte.ts";

	let { model }: { model: QuestionnaireTestModel } = $props();

	const collectionItems = $derived(model.items ?? ssrItems);
</script>

{#if model.scenario === "default"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="scope"
		onSubmit={model.onSubmit}
		onItemChange={model.onItemChange}
	>
		<Questionnaire.Progress data-testid="progress" />

		<Questionnaire.Item data-testid="scope" required name="scope">
			<Questionnaire.Title>What should come next?</Questionnaire.Title>
			<Questionnaire.Description id="scope-description">
				Choose one or write another answer.
			</Questionnaire.Description>
			<Questionnaire.Choices>
				<TestChoice data-testid="scope-delegation" value="delegation">Delegation</TestChoice>
				<TestChoice data-testid="scope-questions" value="questions">Question prompts</TestChoice>
				<Questionnaire.Input data-testid="scope-input" aria-label="Another answer" />
			</Questionnaire.Choices>
			<Questionnaire.Error data-testid="scope-error" id="scope-error-message" />
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="detail" required name="detail">
			<Questionnaire.Title>How much detail?</Questionnaire.Title>
			<Questionnaire.Choices>
				<TestChoice data-testid="detail-focused" value="focused">Focused</TestChoice>
				<TestChoice data-testid="detail-complete" value="complete">Complete</TestChoice>
			</Questionnaire.Choices>
			<Questionnaire.Error data-testid="detail-error" />
		</Questionnaire.Item>

		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "multiple-vertical"}
	<Questionnaire.Root data-testid="root" defaultItem="multiple">
		<Questionnaire.Item data-testid="multiple" multiple name="multiple" required>
			<Questionnaire.Title>Choose several</Questionnaire.Title>
			<TestChoice data-testid="first" value="first">First</TestChoice>
			<TestChoice data-testid="second" value="second">Second</TestChoice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "input-type"}
	<Questionnaire.Root data-testid="root" defaultItem="answer">
		<Questionnaire.Item data-testid="answer" name="answer">
			<Questionnaire.Title>Enter an answer</Questionnaire.Title>
			<TestChoice data-testid="fixed" value="fixed">Fixed</TestChoice>
			<Questionnaire.Input
				data-testid="answer-input"
				aria-label="Custom answer"
				type={model.inputType}
			/>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "disabled-answers"}
	<Questionnaire.Root data-testid="root" defaultItem="approval" shortcuts="letters">
		<Questionnaire.Item data-testid="approval" name="approval" required>
			<Questionnaire.Title>Choose approval</Questionnaire.Title>
			<TestChoice data-testid="automatic" disabled value="automatic">Automatic</TestChoice>
			<TestChoice data-testid="review" value="review">Review</TestChoice>
			<Questionnaire.Input data-testid="approval-input" aria-label="Another approval" />
			<Questionnaire.Error data-testid="approval-error" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "enabled-answers"}
	<Questionnaire.Root data-testid="root" defaultItem="answers">
		<Questionnaire.Item
			data-testid="answers"
			multiple
			required
			name="answers"
			onStatusChange={model.onStatusChange}
		>
			<Questionnaire.Title>Choose answers</Questionnaire.Title>
			<TestChoice
				data-testid="fixed-answer"
				defaultChecked
				disabled={model.answersDisabled}
				value="fixed"
			>
				Fixed
			</TestChoice>
			<Questionnaire.Input
				data-testid="custom-answer"
				aria-label="Custom answer"
				defaultValue="Custom"
				disabled={model.answersDisabled}
			/>
			<Questionnaire.Error data-testid="answers-error" />
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
		<button data-testid="toggle" type="button" onclick={() => (model.answersDisabled = !model.answersDisabled)}>
			Toggle answers
		</button>
	</Questionnaire.Root>
{:else if model.scenario === "external-invalid"}
	<Questionnaire.Root
		data-testid="root"
		item={model.item}
		onItemChange={(next) => model.handleItemChange(next)}
		onSubmit={(event) => {
			event.preventDefault();
			model.firstInvalid = true;
			model.item = "first";
		}}
	>
		<Questionnaire.Item
			data-testid="first"
			invalid={model.firstInvalid}
			name="first"
			required
		>
			<Questionnaire.Title>First</Questionnaire.Title>
			<TestChoice data-testid="first-choice" value="first">First answer</TestChoice>
			<TestChoice
				data-testid="first-alternative"
				value="alternative"
				onChange={() => (model.firstInvalid = false)}
			>
				Alternative answer
			</TestChoice>
			<Questionnaire.Error data-testid="first-error" id="first-error">
				Choose the alternative answer.
			</Questionnaire.Error>
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="second" name="second" required>
			<Questionnaire.Title>Second</Questionnaire.Title>
			<TestChoice data-testid="second-choice" value="second">Second answer</TestChoice>
		</Questionnaire.Item>

		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "optional-arrow"}
	<Questionnaire.Root data-testid="root" defaultItem="optional">
		<TestItem onStatusChange={model.onStatusChange} name="optional" />
		<TestItem required name="next" />
		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Skip data-testid="skip" />
	</Questionnaire.Root>
{:else if model.scenario === "init-first-enabled"}
	<Questionnaire.Root data-testid="root" onItemChange={model.onItemChange}>
		<Questionnaire.Progress data-testid="progress" />
		<TestItem disabled name="disabled" />
		<TestItem required name="first" />
		<TestItem required name="second" />
	</Questionnaire.Root>
{:else if model.scenario === "controlled-nav"}
	<Questionnaire.Root
		data-testid="root"
		item={model.item}
		onItemChange={(next) => model.handleItemChange(next)}
	>
		<TestItem required name="first" />
		<TestItem required name="second" />
		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Next data-testid="next" />
	</Questionnaire.Root>
{:else if model.scenario === "controlled-answers"}
	<Questionnaire.Root data-testid="root" defaultItem="answers">
		<Questionnaire.Item data-testid="answers" multiple required name="answers">
			<Questionnaire.Title>Answers</Questionnaire.Title>
			<TestChoice
				data-testid="controlled-choice"
				checked={model.checked}
				value="fixed"
				onChange={(event) => model.handleCheckedChange(event)}
			>
				Fixed
			</TestChoice>
			<Questionnaire.Input
				data-testid="controlled-input"
				aria-label="Custom answer"
				value={model.inputValue}
				onChange={(event) => model.handleInputChange(event)}
			/>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "controlled-single"}
	<Questionnaire.Root data-testid="root" defaultItem="answer">
		<Questionnaire.Item data-testid="answer" required name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<TestChoice
				data-testid="controlled-choice"
				checked={model.checked}
				value="fixed"
				onChange={(event) => model.handleCheckedChange(event)}
			>
				Fixed
			</TestChoice>
			<Questionnaire.Input
				data-testid="controlled-input"
				aria-label="Custom answer"
				value={model.inputValue}
				onChange={(event) => model.handleCoordinatedInputChange(event)}
			/>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "rejected-input"}
	<Questionnaire.Root data-testid="root" defaultItem="answer">
		<Questionnaire.Item data-testid="answer" required name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<Questionnaire.Input
				data-testid="answer-input"
				aria-label="Answer"
				value=""
				onChange={model.onChange}
			/>
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "controlled-skip"}
	<Questionnaire.Root data-testid="root" defaultItem="answer" onSubmit={model.onSubmit}>
		<Questionnaire.Item data-testid="answer" onStatusChange={model.onStatusChange} name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<TestChoice
				data-testid="controlled-answer"
				checked
				value="controlled"
				onChange={() => {}}
			>
				Controlled
			</TestChoice>
		</Questionnaire.Item>
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "native-freeform"}
	<Questionnaire.Root data-testid="root" defaultItem="answer" noValidate={false} onSubmit={model.onSubmit}>
		<Questionnaire.Item data-testid="answer" required name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<TestChoice data-testid="fixed" value="fixed">Fixed</TestChoice>
			<Questionnaire.Input data-testid="answer-input" aria-label="Another answer" />
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "multiple-signals"}
	<Questionnaire.Root data-testid="root" defaultItem="signals" onSubmit={model.onSubmit}>
		<Questionnaire.Item data-testid="signals" multiple required name="signals">
			<Questionnaire.Title>Signals</Questionnaire.Title>
			<TestChoice data-testid="progress" value="progress">Progress</TestChoice>
			<TestChoice data-testid="risks" value="risks">Risks</TestChoice>
			<Questionnaire.Input data-testid="signals-input" aria-label="Another signal" />
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "dynamic-multiple"}
	<Questionnaire.Root data-testid="root" defaultItem="signals">
		<Questionnaire.Item data-testid="signals" multiple={model.multiple} name="signals" required>
			<Questionnaire.Title>Signals</Questionnaire.Title>
			<TestChoice data-testid="first-signal" value="first">First</TestChoice>
			<TestChoice data-testid="second-signal" value="second">Second</TestChoice>
		</Questionnaire.Item>
		<button
			data-testid="toggle-multiple"
			type="button"
			onclick={() => (model.multiple = !model.multiple)}
		>
			Toggle multiple
		</button>
	</Questionnaire.Root>
{:else if model.scenario === "skip-flow"}
	<Questionnaire.Root data-testid="root" defaultItem="plan">
		<TestItem required name="plan" />
		<TestItem data-testid="timing" onStatusChange={model.onStatusChange} name="timing" />
		<TestItem required name="owner" />
		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "optional-invalid"}
	<Questionnaire.Root data-testid="root" defaultItem="optional">
		<Questionnaire.Item data-testid="optional" invalid name="optional">
			<Questionnaire.Title>Optional</Questionnaire.Title>
			<TestChoice data-testid="optional-choice" value="answer">Answer</TestChoice>
			<Questionnaire.Error data-testid="optional-error">This answer is not valid.</Questionnaire.Error>
		</Questionnaire.Item>
		<TestItem required name="required" />
		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Next data-testid="next" />
	</Questionnaire.Root>
{:else if model.scenario === "final-skip"}
	<Questionnaire.Root data-testid="root" defaultItem="timing" onSubmit={model.onSubmit}>
		<TestItem data-testid="timing" onStatusChange={model.onStatusChange} name="timing" />
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "validation-persist"}
	<Questionnaire.Root data-testid="root" defaultItem="answer">
		<Questionnaire.Item data-testid="answer" multiple required name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<TestChoice data-testid="fixed" value="fixed">Fixed</TestChoice>
			<Questionnaire.Input data-testid="answer-input" aria-label="Another answer" />
			<Questionnaire.Error data-testid="answer-error" />
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "changing-defaults"}
	<Questionnaire.Root data-testid="root" defaultItem="defaults">
		<Questionnaire.Item data-testid="defaults" multiple required name="defaults">
			<Questionnaire.Title>Defaults</Questionnaire.Title>
			<TestChoice data-testid="primary-choice" defaultChecked={model.defaultsChanged} value="primary">
				Primary
			</TestChoice>
			<TestChoice data-testid="secondary-choice" value="secondary">Secondary</TestChoice>
			<Questionnaire.Input
				data-testid="default-input"
				aria-label="Default input"
				defaultValue={model.defaultsChanged ? "" : "Initial"}
			/>
		</Questionnaire.Item>
		<button
			data-testid="change-defaults"
			type="button"
			onclick={() => (model.defaultsChanged = true)}
		>
			Change defaults
		</button>
	</Questionnaire.Root>
{:else if model.scenario === "enter-metadata"}
	<Questionnaire.Root data-testid="root" defaultItem="answer" shortcuts="letters">
		<Questionnaire.Item data-testid="answer" required name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<TestChoice data-testid="fixed" value="fixed">Fixed</TestChoice>
			<Questionnaire.Input data-testid="answer-input" aria-label="Another answer" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "descriptions"}
	<Questionnaire.Root data-testid="root" defaultItem="answer">
		<Questionnaire.Item data-testid="answer" required name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<Questionnaire.Description id="description-one">First description</Questionnaire.Description>
			{#if model.showAdditionalDetails}
				<Questionnaire.Description id="description-two">Second description</Questionnaire.Description>
			{/if}
			<TestChoice value="answer">Answer</TestChoice>
			<Questionnaire.Error id="error-one">First error</Questionnaire.Error>
			{#if model.showAdditionalDetails}
				<Questionnaire.Error id="error-two">Second error</Questionnaire.Error>
			{/if}
		</Questionnaire.Item>
		<Questionnaire.Submit />
		<button
			data-testid="toggle-details"
			type="button"
			onclick={() => (model.showAdditionalDetails = false)}
		>
			Hide details
		</button>
	</Questionnaire.Root>
{:else if model.scenario === "reset"}
	<Questionnaire.Root data-testid="root" defaultItem="channels">
		<Questionnaire.Item data-testid="channels" multiple name="channels">
			<Questionnaire.Title>Channels</Questionnaire.Title>
			<TestChoice data-testid="email" defaultChecked value="email">Email</TestChoice>
			<TestChoice data-testid="chat" value="chat">Chat</TestChoice>
		</Questionnaire.Item>
		<TestItem required name="detail" />
		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "disabled-items"}
	<Questionnaire.Root data-testid="root" defaultItem="first">
		<Questionnaire.Progress data-testid="progress" />
		<TestItem required name="first" />
		<TestItem disabled required name="disabled" />
		<TestItem required name="last" />
		<Questionnaire.Next data-testid="next" />
	</Questionnaire.Root>
{:else if model.scenario === "dynamic-items"}
	<Questionnaire.Root data-testid="root" defaultItem="first" onItemChange={model.onItemChange}>
		<Questionnaire.Progress data-testid="progress" />
		<TestItem required name="first" />
		{#if model.includeMiddle}
			<TestItem required name="middle" />
		{/if}
		<TestItem required name="last" />
		<Questionnaire.Next data-testid="next" />
	</Questionnaire.Root>
{:else if model.scenario === "dynamic-answers"}
	<Questionnaire.Root data-testid="root" defaultItem="answers" shortcuts="letters">
		<Questionnaire.Item data-testid="answers" name="answers">
			<Questionnaire.Title>Choose an answer</Questionnaire.Title>
			<TestChoice data-testid="first-answer" value="first">First</TestChoice>
			{#if model.includeMiddle}
				<TestChoice data-testid="middle-answer" value="middle">Middle</TestChoice>
			{/if}
			<TestChoice data-testid="last-answer" value="last">Last</TestChoice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "shortcut-overflow"}
	<Questionnaire.Root data-testid="root" defaultItem="answers" shortcuts={model.shortcuts}>
		<Questionnaire.Item data-testid="answers" name="answers">
			<Questionnaire.Title>Choose an answer</Questionnaire.Title>
			{#each Array.from({ length: model.shortcutCount }, (_, index) => index) as index (index)}
				<TestChoice data-testid={`answer-${index}`} value={`answer-${index}`}>
					Answer {index + 1}
				</TestChoice>
			{/each}
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "letter-shortcuts"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="answers"
		onSubmit={model.onSubmit}
		shortcuts="letters"
	>
		<Questionnaire.Item data-testid="answers" required name="answers">
			<Questionnaire.Title>Choose an answer</Questionnaire.Title>
			<Questionnaire.Choices data-testid="choices">
				<TestChoice data-testid="disabled-answer" disabled value="disabled">Disabled</TestChoice>
				<TestChoice data-testid="first-answer" value="first">First</TestChoice>
				<TestChoice data-testid="second-answer" value="second">Second</TestChoice>
				<Questionnaire.Input data-testid="other-answer" aria-label="Other answer" />
			</Questionnaire.Choices>
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "number-shortcuts"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="first"
		onSubmit={model.onSubmit}
		shortcuts="numbers"
	>
		<TestItem required name="first" />
		<Questionnaire.Item data-testid="second" required name="second">
			<Questionnaire.Title>Explain</Questionnaire.Title>
			<Questionnaire.Input data-testid="second-input" aria-label="Explanation" />
		</Questionnaire.Item>
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "modified-keys"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="answer"
		onSubmit={model.onSubmit}
		onkeydown={(event) => model.handleRootKeyDown(event)}
		shortcuts="letters"
	>
		<Questionnaire.Item data-testid="answer" required name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<TestChoice data-testid="answer-choice" value="choice">Choice</TestChoice>
			<Questionnaire.Input data-testid="answer-input" aria-label="Other answer" />
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "composed-choice"}
	<Questionnaire.Root data-testid="root" defaultItem="answer" shortcuts="letters">
		<Questionnaire.Item data-testid="answer" name="answer">
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<Questionnaire.Choice data-testid="fixed" value="fixed">
				<Questionnaire.ChoiceInput data-testid="fixed-input" />
				<Questionnaire.ChoiceLabel data-testid="fixed-label">Fixed</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut data-testid="fixed-shortcut" />
			</Questionnaire.Choice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "conditional-choice-input"}
	<Questionnaire.Root data-testid="root" defaultItem="answer" shortcuts="letters">
		<Questionnaire.Item data-testid="answer" name="answer" required>
			<Questionnaire.Title>Answer</Questionnaire.Title>
			<Questionnaire.Choice data-testid="conditional-choice" value="conditional">
				{#if model.showInput}
					<Questionnaire.ChoiceInput data-testid="conditional-input" />
				{/if}
				<Questionnaire.ChoiceLabel>Conditional</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut />
			</Questionnaire.Choice>
		</Questionnaire.Item>
		<button data-testid="toggle-input" type="button" onclick={() => (model.showInput = !model.showInput)}>
			Toggle input
		</button>
	</Questionnaire.Root>
{:else if model.scenario === "render-child"}
	<Questionnaire.Root data-testid="root" defaultItem="only">
		<Questionnaire.Progress data-testid="progress">
			{#snippet child({ props, current, total })}
				<output {...props}>{current}/{total}</output>
			{/snippet}
		</Questionnaire.Progress>
		<TestItem required name="only" />
		<Questionnaire.Submit data-testid="submit">
			{#snippet child({ props, status })}
				<button
					{...props}
					data-render-status={status ?? undefined}
					disabled={status === "unanswered"}
				></button>
			{/snippet}
		</Questionnaire.Submit>
	</Questionnaire.Root>
{:else if model.scenario === "custom-title"}
	<Questionnaire.Root defaultItem="only">
		<Questionnaire.Item aria-labelledby="only-title" data-testid="only" name="only">
			<Questionnaire.Title id="only-title" data-testid="custom-title">
				{#snippet child({ props })}
					<h2 {...props}>Custom title</h2>
				{/snippet}
			</Questionnaire.Title>
			<TestChoice value="answer">Answer</TestChoice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "label-row"}
	<Questionnaire.Root data-testid="root" defaultItem="answer">
		<Questionnaire.Item name="answer" required>
			<Questionnaire.Title>Choose one</Questionnaire.Title>
			<TestChoice data-testid="answer" value="answer">Answer</TestChoice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "native-keyboard"}
	<Questionnaire.Root data-testid="root" defaultItem="single">
		<Questionnaire.Item name="single" required>
			<Questionnaire.Title>Choose one</Questionnaire.Title>
			<TestChoice data-testid="alpha" value="alpha">Alpha</TestChoice>
			<TestChoice data-testid="beta" value="beta">Beta</TestChoice>
			<Questionnaire.Input data-testid="other" aria-label="Other answer" />
		</Questionnaire.Item>

		<Questionnaire.Item multiple name="multiple" required>
			<Questionnaire.Title>Choose several</Questionnaire.Title>
			<TestChoice data-testid="gamma" value="gamma">Gamma</TestChoice>
			<TestChoice data-testid="delta" value="delta">Delta</TestChoice>
		</Questionnaire.Item>

		<Questionnaire.Next data-testid="next" />
	</Questionnaire.Root>
{:else if model.scenario === "horizontal-arrows"}
	<Questionnaire.Root data-testid="root" defaultItem="first">
		<Questionnaire.Item data-testid="first" name="first" required>
			<Questionnaire.Title>First question</Questionnaire.Title>
			<TestChoice data-testid="first-answer" value="first-answer">First answer</TestChoice>
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="second" name="second" required>
			<Questionnaire.Title>Second question</Questionnaire.Title>
			<Questionnaire.Input data-testid="second-answer" aria-label="Second answer" />
		</Questionnaire.Item>

		<Questionnaire.Previous />
		<Questionnaire.Next />
	</Questionnaire.Root>
{:else if model.scenario === "number-input"}
	<Questionnaire.Root data-testid="root" defaultItem="rounds">
		<Questionnaire.Item name="rounds" required>
			<Questionnaire.Title>Review rounds</Questionnaire.Title>
			<TestChoice data-testid="unlimited" value="unlimited">No limit</TestChoice>
			<Questionnaire.Input
				data-testid="round-count"
				aria-label="Round count"
				min={1}
				type="number"
			/>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "scoped-shortcuts"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="single"
		shortcuts="letters"
		onSubmit={model.onSubmit}
	>
		<Questionnaire.Item name="single" required>
			<Questionnaire.Title>Choose one</Questionnaire.Title>
			<TestChoice data-testid="alpha" value="alpha">Alpha</TestChoice>
			<TestChoice data-testid="beta" value="beta">Beta</TestChoice>
		</Questionnaire.Item>

		<Questionnaire.Item name="detail" required>
			<Questionnaire.Title>Add detail</Questionnaire.Title>
			<TestChoice data-testid="brief" value="brief">Keep it brief</TestChoice>
			<Questionnaire.Input data-testid="detail-input" aria-label="Other detail" />
		</Questionnaire.Item>

		<Questionnaire.Next />
		<Questionnaire.Submit />
	</Questionnaire.Root>
{:else if model.scenario === "definition-order"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="answer"
		items={[{ choices: [{ value: "second" }, { value: "first" }], name: "answer" }]}
		shortcuts="letters"
	>
		<Questionnaire.Item data-testid="answer" name="answer">
			<Questionnaire.Title>Choose one</Questionnaire.Title>
			<TestChoice data-testid="first" value="first">First</TestChoice>
			<TestChoice data-testid="second" value="second">Second</TestChoice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "dom-order-nav"}
	<Questionnaire.Root
		data-testid="root"
		items={[{ choices: [{ value: "second" }, { value: "first" }], name: "answer" }]}
		shortcuts="letters"
	>
		<Questionnaire.Item data-testid="answer" name="answer">
			<Questionnaire.Title>Choose one</Questionnaire.Title>
			<TestChoice data-testid="first" value="first">First</TestChoice>
			<Questionnaire.Input data-testid="other" aria-label="Other answer" />
			<TestChoice data-testid="second" value="second">Second</TestChoice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "meta-enter"}
	<Questionnaire.Root data-testid="root" defaultItem="first" onSubmit={model.onSubmit}>
		<Questionnaire.Item data-testid="first" name="first" required>
			<Questionnaire.Title>Choose one</Questionnaire.Title>
			<TestChoice data-testid="first-answer" value="first-answer">First answer</TestChoice>
			<Questionnaire.Input data-testid="first-input" aria-label="Other first answer" />
			<Questionnaire.Error data-testid="first-error" />
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="second" name="second" required>
			<Questionnaire.Title>Choose another</Questionnaire.Title>
			<TestChoice data-testid="second-answer" value="second-answer">Second answer</TestChoice>
		</Questionnaire.Item>

		<Questionnaire.Next />
		<Questionnaire.Submit />
	</Questionnaire.Root>
{:else if model.scenario === "toggle-numbers"}
	<Questionnaire.Root data-testid="root" defaultItem="answers" shortcuts="numbers">
		<Questionnaire.Item multiple name="answers" required>
			<Questionnaire.Title>Choose several</Questionnaire.Title>
			<TestChoice data-testid="alpha" value="alpha">Alpha</TestChoice>
			<TestChoice data-testid="beta" value="beta">Beta</TestChoice>
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "unselected-enter"}
	<Questionnaire.Root data-testid="root" defaultItem="answer" onSubmit={model.onSubmit}>
		<Questionnaire.Item name="answer" required>
			<Questionnaire.Title>Choose one</Questionnaire.Title>
			<TestChoice data-testid="alpha" value="alpha">Alpha</TestChoice>
			<TestChoice data-testid="beta" value="beta">Beta</TestChoice>
			<Questionnaire.Input data-testid="other" aria-label="Other answer" />
		</Questionnaire.Item>
		<Questionnaire.Submit />
	</Questionnaire.Root>
{:else if model.scenario === "form-state"}
	<Questionnaire.Root data-testid="controlled-root">
		<Questionnaire.Item data-testid="controlled-item" required name="controlled">
			<Questionnaire.Title>Controlled answer</Questionnaire.Title>
			<Questionnaire.Input
				data-testid="controlled-input"
				aria-label="Controlled answer"
				value={model.controlledValue}
				onChange={() => {}}
			/>
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="controlled-submit" />
	</Questionnaire.Root>

	<Questionnaire.Root
		data-testid="skip-root"
		onSubmit={(event) => {
			event.preventDefault();
			model.skippedValue =
				new FormData(event.currentTarget as HTMLFormElement).get("skipped")?.toString() ?? null;
		}}
	>
		<Questionnaire.Item data-testid="skip-item" name="skipped">
			<Questionnaire.Title>Skippable answer</Questionnaire.Title>
			<TestChoice data-testid="controlled-choice" checked value="kept" onChange={() => {}}>
				Kept
			</TestChoice>
		</Questionnaire.Item>
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Submit />
	</Questionnaire.Root>

	<output data-testid="skipped-value">
		{model.skippedValue === null ? "empty" : model.skippedValue}
	</output>
{:else if model.scenario === "native-email"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="contact"
		noValidate={false}
		onSubmit={model.onSubmit}
	>
		<Questionnaire.Item data-testid="contact" name="contact" required>
			<Questionnaire.Title>How should we contact you?</Questionnaire.Title>
			<TestChoice data-testid="fixed-contact" value="fixed">Use the saved address</TestChoice>
			<Questionnaire.Input data-testid="contact-input" aria-label="Another email" type="email" />
		</Questionnaire.Item>
		<Questionnaire.Item data-testid="confirmation" name="confirmation" required>
			<Questionnaire.Title>Confirm</Questionnaire.Title>
			<TestChoice data-testid="confirm" value="confirmed">Confirmed</TestChoice>
		</Questionnaire.Item>
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "ime"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="detail"
		shortcuts="numbers"
		onSubmit={model.onSubmit}
	>
		<Questionnaire.Item name="detail" required>
			<Questionnaire.Title>Add detail</Questionnaire.Title>
			<Questionnaire.Input data-testid="detail-input" aria-label="Other detail" />
		</Questionnaire.Item>
		<Questionnaire.Submit />
	</Questionnaire.Root>
{:else if model.scenario === "focus-nav"}
	<Questionnaire.Root data-testid="root" defaultItem="first">
		<Questionnaire.Item data-testid="first" name="first" required>
			<Questionnaire.Title>First</Questionnaire.Title>
			<TestChoice data-testid="first-answer" value="first-answer">First answer</TestChoice>
			<Questionnaire.Error />
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="second" name="second" required>
			<Questionnaire.Title>Second</Questionnaire.Title>
			<TestChoice data-testid="second-answer" value="second-answer">Second answer</TestChoice>
			<Questionnaire.Error />
		</Questionnaire.Item>

		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "inactive-reset"}
	<Questionnaire.Root data-testid="root" defaultItem="channel">
		<Questionnaire.Item data-testid="channel" name="channel" required>
			<Questionnaire.Title>Channel</Questionnaire.Title>
			<TestChoice data-testid="email" defaultChecked value="email">Email</TestChoice>
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="detail" multiple name="detail" required>
			<Questionnaire.Title>Detail</Questionnaire.Title>
			<Questionnaire.Input data-testid="detail-input" aria-label="Detail" defaultValue="Default detail" />
			<Questionnaire.Input
				data-testid="controlled-detail-input"
				aria-label="Controlled detail"
				readonly
				value="Controlled detail"
			/>
		</Questionnaire.Item>

		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Next data-testid="next" />
		<button data-testid="reset" type="reset">Reset</button>
	</Questionnaire.Root>
{:else if model.scenario === "ssr"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem={model.defaultItem}
		item={model.item}
		items={collectionItems}
		shortcuts="letters"
	>
		<Questionnaire.Progress data-testid="progress" />

		<Questionnaire.Item data-testid="scope" name="scope" required>
			<Questionnaire.Title>Choose the scope</Questionnaire.Title>
			<TestChoice value="delegation" />
			<TestChoice disabled value="automatic" />
			<TestChoice value="questions" />
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="disabled" disabled name="disabled">
			<Questionnaire.Title>Disabled question</Questionnaire.Title>
			<TestChoice value="ignored" />
		</Questionnaire.Item>

		<Questionnaire.Item data-testid="detail" name="detail">
			<Questionnaire.Title>Choose the detail</Questionnaire.Title>
			<TestChoice value="focused" />
			<TestChoice value="complete" />
		</Questionnaire.Item>

		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Skip data-testid="skip" />
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "ssr-numeric"}
	<Questionnaire.Root items={[{ choices: model.numericChoices, name: "numeric" }]} shortcuts="numbers">
		<Questionnaire.Item name="numeric">
			<Questionnaire.Title>Choose a number</Questionnaire.Title>
			{#each model.numericChoices as choice (choice.value)}
				<TestChoice value={choice.value} />
			{/each}
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "ssr-input-only"}
	<Questionnaire.Root items={[{ name: "input" }]}>
		<Questionnaire.Progress data-testid="progress" />
		<Questionnaire.Item data-testid="input" name="input">
			<Questionnaire.Title>Describe the result</Questionnaire.Title>
			<Questionnaire.Input data-testid="input-control" aria-label="Result" />
		</Questionnaire.Item>
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "ssr-middle"}
	<Questionnaire.Root defaultItem="middle" items={model.middleItems}>
		<Questionnaire.Progress data-testid="progress" />
		{#each model.middleItems as definition (definition.name)}
			<Questionnaire.Item data-testid={definition.name} name={definition.name}>
				<Questionnaire.Title>{definition.name}</Questionnaire.Title>
			</Questionnaire.Item>
		{/each}
		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "ssr-default-checked"}
	<Questionnaire.Root items={[{ choices: [{ value: "default" }], name: "answer" }]}>
		<Questionnaire.Item name="answer">
			<TestChoice defaultChecked value="default" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "ssr-order"}
	<Questionnaire.Root
		items={[{ choices: [{ value: "second" }, { value: "first" }], name: "order" }]}
		shortcuts="letters"
	>
		<Questionnaire.Item data-testid="order" name="order">
			<TestChoice value="first" />
			<TestChoice value="second" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "ssr-metadata"}
	<Questionnaire.Root items={[{ choices: [{ disabled: true, value: "fixed" }], name: "answer", required: true }]}>
		<Questionnaire.Item name="answer">
			<TestChoice value="fixed" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "ssr-duplicates"}
	<Questionnaire.Root
		items={[
			{ choices: [{ value: "fixed" }, { value: "fixed" }], name: "answer" },
			{ disabled: true, name: "answer" },
		]}
	>
		<Questionnaire.Item name="answer">
			<TestChoice value="fixed" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "ssr-omitted"}
	<Questionnaire.Root items={[{ name: "answer" }]} shortcuts="letters">
		<Questionnaire.Item name="answer">
			<TestChoice value="fixed" />
			<Questionnaire.Input aria-label="Another answer" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "ssr-dynamic"}
	<Questionnaire.Root
		data-testid="root"
		defaultItem="second"
		items={model.definitions}
		onItemChange={model.onItemChange}
	>
		<Questionnaire.Progress data-testid="progress" />
		{#each model.definitions as definition (definition.name)}
			<Questionnaire.Item
				data-testid={definition.name}
				disabled={definition.disabled}
				name={definition.name}
			>
				<Questionnaire.Title>{definition.name}</Questionnaire.Title>
			</Questionnaire.Item>
		{/each}
		<Questionnaire.Previous data-testid="previous" />
		<Questionnaire.Next data-testid="next" />
		<Questionnaire.Submit data-testid="submit" />
	</Questionnaire.Root>
{:else if model.scenario === "ssr-controlled"}
	<Questionnaire.Root item={model.item} items={ssrItems}>
		<Questionnaire.Progress data-testid="progress" />
		<Questionnaire.Item data-testid="scope" name="scope" required>
			<Questionnaire.Title>Scope</Questionnaire.Title>
			<TestChoice value="delegation" />
			<TestChoice disabled value="automatic" />
			<TestChoice value="questions" />
		</Questionnaire.Item>
		<Questionnaire.Item data-testid="detail" name="detail">
			<Questionnaire.Title>Detail</Questionnaire.Title>
			<TestChoice value="focused" />
			<TestChoice value="complete" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{:else if model.scenario === "ssr-warning-recur"}
	<Questionnaire.Root
		items={[{ choices: model.includeChoice ? [{ value: "fixed" }] : undefined, name: "answer" }]}
		shortcuts="letters"
	>
		<Questionnaire.Item name="answer">
			<TestChoice value="fixed" />
		</Questionnaire.Item>
	</Questionnaire.Root>
{/if}
