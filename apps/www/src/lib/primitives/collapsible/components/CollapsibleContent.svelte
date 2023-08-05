<script lang="ts">
	import type { ContentProps } from "../types";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";

	type T = $$Generic<Transition>;
	type $$Props = ContentProps<T>;

	export let transition: ContentProps<T>["transition"] = undefined;
	export let transitionConfig: ContentProps<T>["transitionConfig"] =
		undefined;

	const { content, open } = ctx.getContent();
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
