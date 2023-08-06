<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import type { Transition } from "$primitives/internal";
	import { ctx } from "../ctx";
	import type { ContentProps } from "../types";

	type T = $$Generic<Transition>;
	type $$Props = ContentProps<T>;

	export let transition: ContentProps<T>["transition"] = undefined;
	export let transitionConfig: ContentProps<T>["transitionConfig"] =
		undefined;

	const { open, content } = ctx.getContent();
</script>

{#if $open}
	{#if transition}
		<div
			{...$$restProps}
			use:melt={$content}
			transition:transition={transitionConfig}
		>
			<slot />
		</div>
	{:else}
		<div use:melt={$content} {...$$restProps}>
			<slot />
		</div>
	{/if}
{/if}
