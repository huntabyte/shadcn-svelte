<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import Callout from "$lib/components/callout.svelte";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import type { Snippet } from "svelte";
	import {
		InitializeProjectContext,
		InitializeProjectCtx,
	} from "./initialize-project-context.svelte.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { getCommand, type PackageManager } from "$lib/package-manager.js";

	let { children }: { children: Snippet } = $props();

	const initializeProjectCtx = InitializeProjectCtx.set(new InitializeProjectContext());

	const designSystem = useDesignSystem();
	const userConfig = UserConfigContext.get();

	const clipboard = new UseClipboard();

	const command = $derived(`shadcn-svelte init --preset ${designSystem.preset}`);

	function commandTextForPm(agent: PackageManager) {
		const resolved = getCommand(agent, "execute", command);
		return `${resolved.command} ${resolved.args.join(" ")}`.trim();
	}

	const fullCommand = $derived(commandTextForPm(userConfig.current.packageManager));
</script>

<Dialog.Root bind:open={initializeProjectCtx.open}>
	<Dialog.Content class="w-full max-w-lg!">
		<Dialog.Header>
			<Dialog.Title>Initialize Project</Dialog.Title>
			<Dialog.Description>
				Run the following command to initialize your project with the current preset.
			</Dialog.Description>
		</Dialog.Header>
		<Callout class="-mb-6 w-full md:mx-0" icon={BookOpenIcon} title="Set up your project first">
			Refer to the
			<a
				href="/docs/installation"
				class="hover:text-primary font-medium underline underline-offset-4"
			>
				installation docs
			</a>
			for framework setup before initializing shadcn-svelte with the command below.
		</Callout>
		<Tooltip.Provider>
			<PMExecute {command} />
		</Tooltip.Provider>
		<Dialog.Footer>
			<Button variant="default" class="w-full" onclick={() => clipboard.copy(fullCommand)}>
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
