<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		href,
		active = false,
		icon,
		sub,
		children,
		...restProps
	}: Omit<HTMLAnchorAttributes, "children"> & {
		/** The link target. Without it the item renders a button, so wire up onclick. */
		href?: string;
		active?: boolean;
		/** An icon snippet, shown before the label. */
		icon?: Snippet;
		/** Nested items (SettingsNavSubItem), drawn under this item with a tree line. */
		sub?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<Sidebar.MenuItem data-slot="settings-nav-item">
	<Sidebar.MenuButton isActive={active}>
		{#snippet child({ props })}
			{#if href}
				<a {href} aria-current={active ? "page" : undefined} {...props} {...restProps}>
					{@render icon?.()}
					<span>{@render children?.()}</span>
				</a>
			{:else}
				<button
					type="button"
					aria-current={active ? "page" : undefined}
					{...props}
					{...restProps as object}
				>
					{@render icon?.()}
					<span>{@render children?.()}</span>
				</button>
			{/if}
		{/snippet}
	</Sidebar.MenuButton>
	{#if sub}
		<Sidebar.MenuSub>
			{@render sub()}
		</Sidebar.MenuSub>
	{/if}
</Sidebar.MenuItem>
