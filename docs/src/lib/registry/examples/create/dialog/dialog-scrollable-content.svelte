<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
</script>

<Example title="Scrollable Content" class="items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Scrollable Content</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Scrollable Content</Dialog.Title>
				<Dialog.Description>This is a dialog with scrollable content.</Dialog.Description>
			</Dialog.Header>
			<div
				class="no-scrollbar style-vega:-mx-6 style-vega:px-6 style-nova:-mx-4 style-nova:px-4 style-lyra:-mx-4 style-lyra:px-4 style-maia:-mx-6 style-maia:px-6 style-mira:-mx-4 style-mira:px-4 style-luma:-mx-6 style-luma:px-6 style-rhea:-mx-6 style-rhea:px-6 max-h-[70vh] overflow-y-auto"
			>
				{#each Array(10) as _, i (i)}
					<p class="style-lyra:mb-2 style-lyra:leading-relaxed mb-4 leading-normal">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				{/each}
			</div>
		</Dialog.Content>
	</Dialog.Root>
</Example>
