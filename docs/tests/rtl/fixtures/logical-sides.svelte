<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { DirectionProvider, type DirectionalSide } from "$lib/registry/ui/direction/index.js";

	let direction = $state<"ltr" | "rtl">("rtl");
	let side = $state<DirectionalSide | undefined>();
	let localDir = $state<"ltr" | "rtl" | undefined>();
	let rootDir = $state<"ltr" | "rtl" | undefined>();
	const kind = new URLSearchParams(location.search).get("kind") ?? "context";
</script>

<main class="mx-auto flex max-w-sm flex-col gap-4 p-12">
	<label
		>Side<select aria-label="Side" bind:value={side}>
			<option value={undefined}>Default</option>
			{#each ["inline-start", "inline-end", "left", "right", "top", "bottom"] as value (value)}
				<option {value}>{value}</option>
			{/each}
		</select></label
	>
	<label
		>Content direction<select aria-label="Content direction" bind:value={localDir}
			><option value={undefined}>Inherited</option><option value="ltr">ltr</option><option
				value="rtl">rtl</option
			></select
		></label
	>
	<label
		>Root direction<select aria-label="Root direction" bind:value={rootDir}
			><option value={undefined}>Inherited</option><option value="ltr">ltr</option><option
				value="rtl">rtl</option
			></select
		></label
	>
	<DirectionProvider {direction}>
		{#if kind === "dropdown"}
			<DropdownMenu.Root dir={rootDir}>
				<DropdownMenu.Trigger>Open dropdown</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group
						><DropdownMenu.Sub>
							<DropdownMenu.SubTrigger>Submenu</DropdownMenu.SubTrigger>
							<DropdownMenu.SubContent {side} dir={localDir} avoidCollisions={false}>
								<DropdownMenu.Group
									><DropdownMenu.Item
										onSelect={(event) => {
											event.preventDefault();
											direction = direction === "rtl" ? "ltr" : "rtl";
										}}>Toggle direction</DropdownMenu.Item
									></DropdownMenu.Group
								>
							</DropdownMenu.SubContent>
						</DropdownMenu.Sub></DropdownMenu.Group
					>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<ContextMenu.Root dir={rootDir}>
				<ContextMenu.Trigger class="rounded border p-8">Open context</ContextMenu.Trigger>
				<ContextMenu.Content
					side={kind === "context" ? side : undefined}
					dir={localDir}
					avoidCollisions={false}
				>
					<ContextMenu.Group>
						{#if kind === "context"}
							<ContextMenu.Item
								onSelect={(event) => {
									event.preventDefault();
									direction = direction === "rtl" ? "ltr" : "rtl";
								}}>Toggle direction</ContextMenu.Item
							>
						{:else}
							<ContextMenu.Sub>
								<ContextMenu.SubTrigger>Submenu</ContextMenu.SubTrigger>
								<ContextMenu.SubContent {side} dir={localDir} avoidCollisions={false}>
									<ContextMenu.Group
										><ContextMenu.Item
											onSelect={(event) => {
												event.preventDefault();
												direction = direction === "rtl" ? "ltr" : "rtl";
											}}>Toggle direction</ContextMenu.Item
										></ContextMenu.Group
									>
								</ContextMenu.SubContent>
							</ContextMenu.Sub>
						{/if}
					</ContextMenu.Group>
				</ContextMenu.Content>
			</ContextMenu.Root>
		{/if}
	</DirectionProvider>
</main>
