<script lang="ts">
	import PopoverAlignments from "./popover-alignments.svelte";
	import PopoverBasic from "./popover-basic.svelte";
	import PopoverInDialog from "./popover-in-dialog.svelte";
	import PopoverWithForm from "./popover-with-form.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<PopoverBasic />
	<PopoverWithForm />
	<PopoverAlignments />
	<PopoverInDialog />
</ExampleWrapper>
