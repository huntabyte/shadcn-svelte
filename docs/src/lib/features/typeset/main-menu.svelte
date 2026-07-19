<script lang="ts">
	import MenuIcon from "@lucide/svelte/icons/menu";
	import { mode, setMode } from "mode-watcher";
	import { useIsMac } from "$lib/hooks/use-is-mac.svelte.js";
	import type { TypesetState } from "./typeset.svelte.js";
	import * as Picker from "./picker/index.js";

	let { typeset }: { typeset: TypesetState } = $props();
	const isMac = useIsMac();
	let open = $state(false);

	function toggleTheme() {
		setMode(mode.current === "dark" ? "light" : "dark");
	}
</script>

<Picker.Root submenu={false} bind:open>
	<Picker.Trigger
		submenu={false}
		class="ring-foreground/10 flex items-center justify-between gap-2 rounded-lg px-1.75 ring-1 focus-visible:ring-1"
	>
		<span class="font-medium">Menu</span>
		<MenuIcon class="size-5" />
	</Picker.Trigger>
	<Picker.Content side="right" align="start" alignOffset={-8} class="cn-menu-translucent">
		<Picker.Group>
			<Picker.Item onSelect={() => typeset.shuffle()}>
				Shuffle <Picker.Shortcut>R</Picker.Shortcut>
			</Picker.Item>
			<Picker.Item onSelect={toggleTheme}>
				Light/Dark <Picker.Shortcut>D</Picker.Shortcut>
			</Picker.Item>
		</Picker.Group>
		<Picker.Separator />
		<Picker.Group>
			<Picker.Item onSelect={() => typeset.undo()} disabled={!typeset.canUndo}>
				Undo <Picker.Shortcut>{isMac.current ? "⌘Z" : "Ctrl+Z"}</Picker.Shortcut>
			</Picker.Item>
			<Picker.Item onSelect={() => typeset.redo()} disabled={!typeset.canRedo}>
				Redo <Picker.Shortcut>{isMac.current ? "⇧⌘Z" : "Ctrl+Shift+Z"}</Picker.Shortcut>
			</Picker.Item>
			<Picker.Separator />
			<Picker.Item onSelect={() => typeset.reset()}>
				Reset <Picker.Shortcut>⇧R</Picker.Shortcut>
			</Picker.Item>
		</Picker.Group>
	</Picker.Content>
</Picker.Root>
{#if open}
	<button
		type="button"
		aria-label="Close Menu"
		class="fixed inset-y-0 right-0 left-54 z-40 cursor-default bg-transparent"
		onclick={() => (open = false)}
	></button>
{/if}
