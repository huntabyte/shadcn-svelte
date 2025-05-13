<script lang="ts">
	import {
		getCommand,
		getPackageManager,
		PACKAGE_MANAGERS,
	} from "$lib/stores/package-manager.js";
	import type { Command } from "package-manager-detector";
	import Clipboard from "@lucide/svelte/icons/clipboard";
	import CopyButton from "./copy-button.svelte";

	type Props = {
		type: Command | "create";
		command: string | string[];
	};

	const { type, command }: Props = $props();

	const agent = getPackageManager();

	const cmd = $derived(getCommand($agent, type, command));

	const commandText = $derived(`${cmd.command} ${cmd.args.join(" ")}`);
</script>

<figure data-rehype-pretty-code-figure>
	<div class="bg-accent/50 border-accent/50 mt-6 w-full rounded-lg border">
		<div class="border-border flex place-items-end justify-between border-b p-2 pb-0">
			<div class="flex place-items-center gap-1">
				{#each PACKAGE_MANAGERS as pm (pm)}
					<button
						type="button"
						class={{
							"-mb-0.5 border-b-2 border-transparent p-1 font-mono text-sm": true,
							"border-b-primary": $agent === pm,
						}}
						onclick={() => ($agent = pm)}
					>
						{pm}
					</button>
				{/each}
			</div>
			<CopyButton text={commandText} class="mb-1 size-6 [&_svg]:size-3">
				{#snippet icon()}
					<Clipboard />
				{/snippet}
			</CopyButton>
		</div>
		<div class="no-scrollbar overflow-x-auto p-3">
			<span class="text-nowrap font-mono text-sm">
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
