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
	export let sideOffset: ContentProps<T>["sideOffset"] = 4;

	const {
		elements: { content },
		states: { open }
	} = ctx.get(sideOffset);
</script>

{#if transition}
	{#if $open}
		<div
			use:melt={$content}
			transition:transition={transitionConfig}
			{...$$restProps}
		>
			<slot />
		</div>
	{/if}
{:else if $open}
	<div use:melt={$content} {...$$restProps}>
		<slot />
	</div>
{/if}
