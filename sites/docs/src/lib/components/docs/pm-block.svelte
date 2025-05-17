<script lang="ts">
	import type { Command } from "package-manager-detector";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import CopyButton from "./copy-button.svelte";
	import { getCommand, PACKAGE_MANAGERS, PackageManagerContext } from "$lib/package-manager.js";

	const {
		type,
		command,
	}: {
		type: Command | "create";
		command: string | string[];
	} = $props();

	const pm = PackageManagerContext.get();

	const cmd = $derived(getCommand(pm.current, type, command));

	const commandText = $derived(`${cmd.command} ${cmd.args.join(" ")}`);
</script>

<figure data-rehype-pretty-code-figure>
	<div class="mt-6 w-full rounded-lg border bg-zinc-950 dark:bg-zinc-900">
		<div
			class="flex place-items-end justify-between rounded-lg border-b border-zinc-800 bg-zinc-900 p-2 pb-0"
		>
			<div class="flex place-items-center gap-1">
				{#each PACKAGE_MANAGERS as packageManager (packageManager)}
					<button
						type="button"
						class={{
							"-mb-0.5 border-b p-1 font-mono text-sm": true,
							"border-b-zinc-50 text-zinc-50": pm.current === packageManager,
							"border-transparent text-zinc-400": pm.current !== packageManager,
						}}
						onclick={() => (pm.current = packageManager)}
					>
						{packageManager}
					</button>
				{/each}
			</div>
			<CopyButton text={commandText} class="mb-1 size-6 [&_svg]:size-3">
				{#snippet icon()}
					<ClipboardIcon />
				{/snippet}
			</CopyButton>
		</div>
		<div class="no-scrollbar overflow-x-auto p-3">
			<span class="text-nowrap font-mono text-sm text-white">
				{commandText}
			</span>
		</div>
	</div>
</figure>

<style lang="postcss">
	:global(.no-scrollbar) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
