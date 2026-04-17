<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import type { Snippet } from "svelte";
	import {
		InitializeProjectContext,
		InitializeProjectCtx,
	} from "./initialize-project-context.svelte.js";

	let { children }: { children: Snippet } = $props();

	const initializeProjectCtx = InitializeProjectCtx.set(new InitializeProjectContext());

	const designSystem = useDesignSystem();

	const clipboard = new UseClipboard();

	const command = $derived(`shadcn-svelte init --preset ${designSystem.preset}`);
</script>

<Dialog.Root bind:open={initializeProjectCtx.open}>
	<Dialog.Content class="w-full max-w-lg!">
		<Dialog.Header>
			<Dialog.Title>Initialize Project</Dialog.Title>
			<Dialog.Description>
				Run the following command to initialize your project with the current preset.
			</Dialog.Description>
		</Dialog.Header>
		<Tooltip.Provider>
			<PMExecute {command} />
		</Tooltip.Provider>
		<Dialog.Footer>
			<Button variant="default" class="w-full" onclick={() => clipboard.copy(command)}>
				{#if clipboard.copied}
					<CheckIcon />
				{:else}
					<CopyIcon />
				{/if}
				Copy Command
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
{@render children?.()}
