<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import MessageDemo from "./message-demo.svelte";
	import MessageAvatar from "./message-avatar.svelte";
	import MessageGroup from "./message-group.svelte";
	import MessageHeaderFooter from "./message-header-footer.svelte";
	import MessageActions from "./message-actions.svelte";
	import MessageAttachment from "./message-attachment.svelte";
	import MessageMarkdown from "./message-markdown.svelte";
</script>

<ExampleWrapper>
	<MessageDemo />
	<MessageAvatar />
	<MessageGroup />
	<MessageHeaderFooter />
	<MessageActions />
	<MessageAttachment />
	<MessageMarkdown />
</ExampleWrapper>
