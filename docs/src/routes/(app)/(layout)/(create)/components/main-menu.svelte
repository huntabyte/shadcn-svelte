<svelte:options runes />

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { setMode, mode } from "mode-watcher";
	import { useIsMac } from "$lib/hooks/use-is-mac.svelte.js";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { Menu09FreeIcons } from "@hugeicons/core-free-icons";
	import { ActionMenuCtx } from "./action-menu.svelte";
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();

	const isMac = useIsMac();
	const designSystem = useDesignSystem();
	const actionMenuCtx = ActionMenuCtx.get();

	let showResetDialog = $state(false);

	function toggleTheme() {
		setMode(mode.current === "dark" ? "light" : "dark");
	}
</script>

<Picker.Root submenu={false}>
	<Picker.Trigger
		submenu={false}
		class={cn(
			"ring-foreground/10 flex items-center justify-between gap-2 rounded-lg px-1.75 ring-1 focus-visible:ring-1",
			className
		)}
	>
		<span class="font-medium">Menu</span>
		<HugeiconsIcon icon={Menu09FreeIcons} />
	</Picker.Trigger>
	<Picker.Content side="right" align="start" alignOffset={-8}>
		<Picker.Group>
			<Picker.Item onSelect={() => (actionMenuCtx.open = true)}>
				Navigate...
				<Picker.Shortcut>{isMac.current ? "⌘P" : "Ctrl+P"}</Picker.Shortcut>
			</Picker.Item>
			<Picker.Item onSelect={() => designSystem.randomize()}>
				Shuffle
				<Picker.Shortcut>R</Picker.Shortcut>
			</Picker.Item>
			<Picker.Item onSelect={toggleTheme}>
				Light/Dark
				<Picker.Shortcut>D</Picker.Shortcut>
			</Picker.Item>
		</Picker.Group>
		<Picker.Separator />
		<Picker.Group>
			<Picker.Item onSelect={() => designSystem.undo()} disabled={!designSystem.canUndo}>
				Undo
				<Picker.Shortcut>{isMac.current ? "⌘Z" : "Ctrl+Z"}</Picker.Shortcut>
			</Picker.Item>
			<Picker.Item onSelect={() => designSystem.redo()} disabled={!designSystem.canRedo}>
				Redo
				<Picker.Shortcut>{isMac.current ? "⇧⌘Z" : "Ctrl+Shift+Z"}</Picker.Shortcut>
			</Picker.Item>
			<Picker.Separator />
			<Picker.Item onSelect={() => (showResetDialog = true)}>
				Reset
				<Picker.Shortcut>{isMac.current ? "⇧R" : "Shift+R"}</Picker.Shortcut>
			</Picker.Item>
		</Picker.Group>
	</Picker.Content>
</Picker.Root>

<AlertDialog.Root bind:open={showResetDialog}>
	<AlertDialog.Content size="sm">
		<AlertDialog.Header>
			<AlertDialog.Title>Reset to defaults?</AlertDialog.Title>
			<AlertDialog.Description>
				This will reset all customization options to their default values.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={() => { designSystem.reset(); showResetDialog = false; }}>Reset</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
