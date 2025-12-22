<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import TextareaBasic from "./textarea-basic.svelte";
	import TextareaInvalid from "./textarea-invalid.svelte";
	import TextareaWithLabel from "./textarea-with-label.svelte";
	import TextareaWithDescription from "./textarea-with-description.svelte";
	import TextareaDisabled from "./textarea-disabled.svelte";
</script>

<ExampleWrapper>
	<TextareaBasic />
	<TextareaInvalid />
	<TextareaWithLabel />
	<TextareaWithDescription />
	<TextareaDisabled />
</ExampleWrapper>
