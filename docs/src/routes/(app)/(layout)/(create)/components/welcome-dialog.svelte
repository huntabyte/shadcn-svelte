<script lang="ts">
	import { PersistedState } from "runed";
	import Logo from "$lib/components/logo.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	const dismissed = new PersistedState("shadcn-create-welcome-dialog", false);
</script>

<Dialog.Root bind:open={() => !dismissed.current, (v) => (dismissed.current = !v)}>
	<Dialog.Content
		showCloseButton={false}
		class="dialog-ring min-w-0 max-w-92 gap-0 overflow-hidden rounded-xl p-0 sm:max-w-sm dark:bg-neutral-900"
	>
		<div
			class="flex aspect-[2/1.2] w-full items-center justify-center rounded-t-xl bg-neutral-950 text-center text-neutral-100 sm:aspect-2/1"
		>
			<div class="font-mono text-2xl font-bold">
				<Logo class="size-12" />
			</div>
		</div>
		<Dialog.Header class="gap-1 p-4">
			<Dialog.Title class="text-left text-base">Build your own shadcn-svelte</Dialog.Title>
			<Dialog.Description class="text-foreground text-left leading-relaxed">
				Customize everything from the ground up. Pick your component library, font, color
				scheme, and more.
			</Dialog.Description>
			<Dialog.Description class="text-foreground mt-2 text-left font-medium leading-relaxed">
				Available for SvelteKit, Vite, and Astro.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer class="p-4 pt-0">
			<Dialog.Close>
				{#snippet child({ props })}
					<Button class="w-full rounded-lg shadow-none" {...props}>Get Started</Button>
				{/snippet}
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>