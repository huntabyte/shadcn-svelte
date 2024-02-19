<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<td
	class={cn(
		"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
		className
	)}
	{...$$restProps}
>
	<slot />
</td>
