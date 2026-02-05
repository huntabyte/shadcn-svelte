<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import CommandBasic from "./command-basic.svelte";
	import CommandWithShortcuts from "./command-with-shortcuts.svelte";
	import CommandWithGroups from "./command-with-groups.svelte";
	import CommandManyItems from "./command-many-items.svelte";
</script>

<ExampleWrapper>
	<CommandBasic />
	<CommandWithShortcuts />
	<CommandWithGroups />
	<CommandManyItems />
</ExampleWrapper>
