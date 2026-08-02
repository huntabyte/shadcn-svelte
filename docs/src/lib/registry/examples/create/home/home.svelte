<script lang="ts">
	import BadgeExamples from "./badge-examples.svelte";
	import ButtonGroupExamples from "./button-group-examples.svelte";
	import EmptyAvatarGroup from "./empty-avatar-group.svelte";
	import FieldExamples from "./field-examples.svelte";
	import FormExample from "./form-example.svelte";
	import InputGroupExamples from "./input-group-examples.svelte";
	import ItemExample from "./item-example.svelte";
	import ObservabilityCard from "./observability-card.svelte";
	import SheetExample from "./sheet-example.svelte";
	import SmallFormExample from "./small-form-example.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<ObservabilityCard />
	<SmallFormExample />
	<FormExample />
	<FieldExamples />
	<ItemExample />
	<ButtonGroupExamples />
	<EmptyAvatarGroup />
	<InputGroupExamples />
	<SheetExample />
	<BadgeExamples />
</ExampleWrapper>
