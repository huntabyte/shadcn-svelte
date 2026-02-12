<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import PromptForm from "./prompt-form.svelte";
	import ModelSelector from "./model-selector.svelte";
	import GroupChatDialog from "./group-chat-dialog.svelte";
	import CreateProjectForm from "./create-project-form.svelte";
</script>

<ExampleWrapper>
	<PromptForm />
	<ModelSelector />
	<GroupChatDialog />
	<CreateProjectForm />
</ExampleWrapper>
