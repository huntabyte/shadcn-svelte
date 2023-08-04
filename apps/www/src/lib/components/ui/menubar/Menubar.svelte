<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt, type MenubarProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	type $$Props = MenubarProps & {
		class?: string | null | undefined;
	};

	const menubar = ctx.set($$restProps);
</script>

<div
	use:melt={$menubar}
	class={cn(
		"flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
		className
	)}
>
	<slot />
</div>
