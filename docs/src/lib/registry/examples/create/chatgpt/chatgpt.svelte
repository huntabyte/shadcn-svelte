<script lang="ts">
	import CreateProjectForm from "./create-project-form.svelte";
	import GroupChatDialog from "./group-chat-dialog.svelte";
	import ModelSelector from "./model-selector.svelte";
	import PromptForm from "./prompt-form.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<PromptForm />
	<ModelSelector />
	<GroupChatDialog />
	<CreateProjectForm />
</ExampleWrapper>
