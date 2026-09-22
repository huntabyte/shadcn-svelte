<script lang="ts">
	import MessageActions from "./message-actions.svelte";
	import MessageAttachmentGroup from "./message-attachment-group.svelte";
	import MessageAttachment from "./message-attachment.svelte";
	import MessageAvatar from "./message-avatar.svelte";
	import MessageDefault from "./message-default.svelte";
	import MessageGroupChat from "./message-group-chat.svelte";
	import MessageGroup from "./message-group.svelte";
	import MessageHeaderFooter from "./message-header-footer.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<MessageDefault />
	<MessageAvatar />
	<MessageGroup />
	<MessageGroupChat />
	<MessageHeaderFooter />
	<MessageActions />
	<MessageAttachment />
	<MessageAttachmentGroup />
</ExampleWrapper>
