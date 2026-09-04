<script lang="ts">
	import SheetNoCloseButton from "./sheet-no-close-button.svelte";
	import SheetWithForm from "./sheet-with-form.svelte";
	import SheetWithSides from "./sheet-with-sides.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<SheetWithForm />
	<SheetNoCloseButton />
	<SheetWithSides />
</ExampleWrapper>
