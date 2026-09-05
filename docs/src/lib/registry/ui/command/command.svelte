<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { cn } from "cn";

	export type CommandRootApi = CommandPrimitive.Root;

	let {
		api = $bindable(null),
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		...restProps
	}: CommandPrimitive.RootProps & {
		api?: CommandRootApi | null;
	} = $props();
</script>

<CommandPrimitive.Root
	bind:this={api}
	bind:value
	bind:ref
	data-slot="command"
	class={cn("cn-command flex size-full flex-col overflow-hidden", className)}
	{...restProps}
/>
