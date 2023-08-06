<script lang="ts">
	import { builderActions, getAttrs } from "$primitives/internal";
	import type { Props } from "../types";

	type $$Props = Props;
	export let href: $$Props["href"] = undefined;
	export let type: $$Props["type"] = undefined;
	export let builders: $$Props["builders"] = [];
</script>

{#if builders.length}
	<svelte:element
		this={href ? "a" : "button"}
		type={href ? undefined : type}
		{href}
		on:click
		on:change
		on:keydown
		on:keyup
		on:mouseenter
		on:mouseleave
		role="button"
		tabindex="0"
		use:builderActions={{ builders }}
		{...getAttrs(builders)}
		{...$$restProps}
	>
		<slot />
	</svelte:element>
{:else}
	<svelte:element
		this={href ? "a" : "button"}
		type={href ? undefined : type}
		{href}
		on:click
		on:change
		on:keydown
		on:keyup
		on:mouseenter
		on:mouseleave
		role="button"
		tabindex="0"
		{...$$restProps}
	>
		<slot />
	</svelte:element>
{/if}
