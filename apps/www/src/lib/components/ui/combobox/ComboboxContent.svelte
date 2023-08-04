<script lang="ts">
	import { Popover } from "$components/ui/popover";
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const content = ctx.getContent();
</script>

<Popover.Content class="w-[200px] p-0 h-[300px]">
	<slot name="input" />
	<div
		use:melt={$content}
		class={cn(
			"overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</div>
</Popover.Content>
