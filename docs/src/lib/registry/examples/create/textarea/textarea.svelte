<script lang="ts">
	import TextareaBasic from "./textarea-basic.svelte";
	import TextareaDisabled from "./textarea-disabled.svelte";
	import TextareaInvalid from "./textarea-invalid.svelte";
	import TextareaWithDescription from "./textarea-with-description.svelte";
	import TextareaWithLabel from "./textarea-with-label.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<TextareaBasic />
	<TextareaInvalid />
	<TextareaWithLabel />
	<TextareaWithDescription />
	<TextareaDisabled />
</ExampleWrapper>
