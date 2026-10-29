<script lang="ts">
	import CommandBasic from "./command-basic.svelte";
	import CommandInline from "./command-inline.svelte";
	import CommandManyItems from "./command-many-items.svelte";
	import CommandWithGroups from "./command-with-groups.svelte";
	import CommandWithShortcuts from "./command-with-shortcuts.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<CommandInline />
	<CommandBasic />
	<CommandWithShortcuts />
	<CommandWithGroups />
	<CommandManyItems />
</ExampleWrapper>
