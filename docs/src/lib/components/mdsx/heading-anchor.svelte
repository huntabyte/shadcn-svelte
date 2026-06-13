<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		id,
		children,
	}: {
		id?: string;
		children?: Snippet;
	} = $props();
</script>

{#if id}
	<a class="group no-underline" href={`#${id}`}>
		<span class="underline-offset-4 group-hover:underline">
			{@render children?.()}
		</span>
		<span
			aria-hidden="true"
			class="text-muted-foreground ml-2 opacity-0 group-hover:opacity-100"
		>
			#
		</span>
	</a>
{:else}
	{@render children?.()}
{/if}
