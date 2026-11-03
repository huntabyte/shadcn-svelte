<script lang="ts">
	import AttachmentContentOnly from "./attachment-content-only.svelte";
	import AttachmentFiles from "./attachment-files.svelte";
	import AttachmentImageStates from "./attachment-image-states.svelte";
	import AttachmentImages from "./attachment-images.svelte";
	import AttachmentScrollableGroup from "./attachment-scrollable-group.svelte";
	import AttachmentSizes from "./attachment-sizes.svelte";
	import AttachmentStates from "./attachment-states.svelte";
	import AttachmentTriggers from "./attachment-triggers.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<AttachmentFiles />
	<AttachmentContentOnly />
	<AttachmentStates />
	<AttachmentImages />
	<AttachmentImageStates />
	<AttachmentSizes />
	<AttachmentScrollableGroup />
	<AttachmentTriggers />
</ExampleWrapper>
