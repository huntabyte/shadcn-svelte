<script lang="ts" module>
	export type Workspace = {
		id: string;
		name: string;
		/** A logo image URL. Without one the first letter of the name is shown. */
		logo?: string;
		/** A second line under the name, for example the plan. */
		plan?: string;
	};
</script>

<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	// Ported from the shadcn-svelte sidebar-07 TeamSwitcher block: a Sidebar.MenuButton that opens a DropdownMenu of the
	// user's workspaces, with a "create" row at the bottom. Changes: a radio group (so the current workspace is a
	// menuitemradio with a check), Alt+1 to Alt+9 shortcuts, a logo or an initial from Avatar, and the Twenty look: a
	// small logo, the name, a bold caret, the menu opening below the button.
	let {
		workspaces,
		value = $bindable(),
		onValueChange,
		onCreate,
		createLabel = "Create workspace",
		label = "Workspaces",
		shortcuts = true,
		class: className,
	}: {
		workspaces: Workspace[];
		/** The id of the current workspace. Defaults to the first one. */
		value?: string;
		onValueChange?: (id: string) => void;
		/** Called by the last row. Without it the row is not shown. */
		onCreate?: () => void;
		createLabel?: string;
		/** The heading of the list. */
		label?: string;
		/** Alt+1 to Alt+9 switch to the first nine workspaces. */
		shortcuts?: boolean;
		class?: string;
	} = $props();

	const current = $derived(workspaces.find((w) => w.id === value) ?? workspaces[0]);

	function select(id: string) {
		if (id === current?.id) return;
		value = id;
		onValueChange?.(id);
	}

	// Cmd/Ctrl+1..9 belong to the browser's tabs, so the shortcut is Alt (Option on a Mac). event.code, because Option+1
	// types a symbol on a Mac keyboard. That is also why the shortcut never fires while the user is typing: in an input,
	// a textarea, a select or a contenteditable, Option plus a digit must still type its character.
	function isEditable(target: EventTarget | null) {
		return (
			target instanceof HTMLElement &&
			(target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
		);
	}

	function onkeydown(event: KeyboardEvent) {
		if (!shortcuts || event.defaultPrevented || event.repeat || isEditable(event.target)) return;
		if (!event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
		const match = /^Digit([1-9])$/.exec(event.code);
		const workspace = match ? workspaces[Number(match[1]) - 1] : undefined;
		if (!workspace) return;
		event.preventDefault();
		select(workspace.id);
	}

	// The hint: the Option glyph on a Mac, "Alt+" elsewhere. Set after mount so server and client render the same.
	let modifierLabel = $state("Alt+");
	$effect(() => {
		if (/Mac|iPhone|iPad/.test(navigator.platform)) modifierLabel = "⌥";
	});

	// A value that is missing or not in the list falls back to the first workspace. Write that back, so a parent reading
	// bind:value sees the workspace the button shows.
	$effect(() => {
		if (current && value !== current.id) value = current.id;
	});

	const initial = (name: string) => name.trim().charAt(0).toUpperCase() || "?";
</script>

<svelte:window {onkeydown} />

{#snippet logo(workspace: Workspace, className: string)}
	<Avatar.Root class={cn("rounded-[4px] after:rounded-[4px]", className)}>
		{#if workspace.logo}
			<Avatar.Image src={workspace.logo} alt="" class="rounded-[4px]" />
		{/if}
		<Avatar.Fallback
			class="rounded-[4px] bg-sidebar-primary text-[11px] font-medium text-sidebar-primary-foreground"
		>
			{initial(workspace.name)}
		</Avatar.Fallback>
	</Avatar.Root>
{/snippet}

{#if current}
	<Sidebar.Menu data-slot="workspace-switcher" class={className}>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							size={current.plan ? "lg" : "default"}
							aria-label="Switch workspace, current: {current.name}"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							{@render logo(current, "size-5 shrink-0")}
							<div class="grid min-w-0 flex-1 text-start leading-tight">
								<span class="truncate font-medium">{current.name}</span>
								{#if current.plan}
									<span class="truncate text-xs text-muted-foreground">{current.plan}</span>
								{/if}
							</div>
							<IconPlaceholder
								lucide="ChevronDownIcon"
								tabler="IconChevronDown"
								hugeicons="ArrowDown01Icon"
								phosphor="CaretDownIcon"
								remixicon="RiArrowDownSLine"
								class="ms-auto shrink-0 text-muted-foreground"
							/>
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-(--bits-dropdown-menu-anchor-width) min-w-56"
					align="start"
					side="bottom"
					sideOffset={4}
				>
					<DropdownMenu.Label class="text-xs text-muted-foreground">{label}</DropdownMenu.Label>
					<DropdownMenu.RadioGroup value={current.id} onValueChange={select}>
						{#each workspaces as workspace, index (workspace.id)}
							<DropdownMenu.RadioItem value={workspace.id} closeOnSelect class="gap-2">
								{@render logo(workspace, "size-5 shrink-0")}
								<span class="min-w-0 flex-1 truncate">{workspace.name}</span>
								{#if shortcuts && index < 9}
									<DropdownMenu.Shortcut>{modifierLabel}{index + 1}</DropdownMenu.Shortcut>
								{/if}
							</DropdownMenu.RadioItem>
						{/each}
					</DropdownMenu.RadioGroup>
					{#if onCreate}
						<DropdownMenu.Separator />
						<DropdownMenu.Item class="gap-2" onSelect={onCreate}>
							<span class="flex size-5 shrink-0 items-center justify-center rounded-[4px] border">
								<IconPlaceholder
									lucide="PlusIcon"
									tabler="IconPlus"
									hugeicons="PlusSignIcon"
									phosphor="PlusIcon"
									remixicon="RiAddLine"
									class="size-3"
								/>
							</span>
							<span class="font-medium text-muted-foreground">{createLabel}</span>
						</DropdownMenu.Item>
					{/if}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{/if}
