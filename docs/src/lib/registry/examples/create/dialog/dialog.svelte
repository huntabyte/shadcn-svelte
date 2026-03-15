<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import DialogWithForm from "./dialog-with-form.svelte";
	import DialogScrollableContent from "./dialog-scrollable-content.svelte";
	import DialogWithStickyFooter from "./dialog-with-sticky-footer.svelte";
	import DialogNoCloseButton from "./dialog-no-close-button.svelte";
	import DialogChatSettings from "./dialog-chat-settings.svelte";
</script>

<ExampleWrapper>
	<DialogWithForm />
	<DialogScrollableContent />
	<DialogWithStickyFooter />
	<DialogNoCloseButton />
	<DialogChatSettings />
</ExampleWrapper>
