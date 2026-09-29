<script lang="ts">
	import AlertDialogBasic from "./alert-dialog-basic.svelte";
	import AlertDialogDestructive from "./alert-dialog-destructive.svelte";
	import AlertDialogInDialog from "./alert-dialog-in-dialog.svelte";
	import AlertDialogSmallWithMedia from "./alert-dialog-small-with-media.svelte";
	import AlertDialogSmall from "./alert-dialog-small.svelte";
	import AlertDialogWithMedia from "./alert-dialog-with-media.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<AlertDialogBasic />
	<AlertDialogSmall />
	<AlertDialogWithMedia />
	<AlertDialogSmallWithMedia />
	<AlertDialogDestructive />
	<AlertDialogInDialog />
</ExampleWrapper>
