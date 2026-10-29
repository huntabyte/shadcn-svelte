<script lang="ts">
	import DialogChatSettings from "./dialog-chat-settings.svelte";
	import DialogNoCloseButton from "./dialog-no-close-button.svelte";
	import DialogScrollableContent from "./dialog-scrollable-content.svelte";
	import DialogWithForm from "./dialog-with-form.svelte";
	import DialogWithStickyFooter from "./dialog-with-sticky-footer.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<DialogWithForm />
	<DialogScrollableContent />
	<DialogWithStickyFooter />
	<DialogNoCloseButton />
	<DialogChatSettings />
</ExampleWrapper>
