<script lang="ts">
	import { buttonVariants, Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { cn } from "$lib/utils.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { getCommand, PACKAGE_MANAGERS } from "$lib/package-manager.js";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

	const designSystem = useDesignSystem();
	const userConfig = UserConfigContext.get();
	const clipboard = new UseClipboard();

	const command = $derived(`shadcn-svelte init --preset ${designSystem.preset}`);

	function getCommandText(pm: (typeof PACKAGE_MANAGERS)[number]) {
		const cmd = getCommand(pm, "execute", command);
		return `${cmd.command} ${cmd.args.join(" ")}`.trim();
	}

	const commandText = $derived(getCommandText(userConfig.current.packageManager));
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn(buttonVariants({ variant: "default" }))}>
		Create Project
	</Dialog.Trigger>
	<Dialog.Content
		class="dark no-scrollbar max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl p-6 shadow-xl **:data-[slot=field-separator]:h-2 sm:max-w-sm"
	>
		<Dialog.Header>
			<Dialog.Title>Create Project</Dialog.Title>
			<Dialog.Description>Pick a template and configure your project.</Dialog.Description>
		</Dialog.Header>
		<Tabs.Root
			bind:value={
				() => userConfig.current.packageManager,
				(v) => userConfig.setConfig({ packageManager: v })
			}
			class="ring-border min-w-0 gap-0 overflow-hidden rounded-xl ring-1"
		>
			<div class="bg-muted/50 flex items-center gap-2 py-1 pr-1.5 pl-1">
				<Tabs.List class="bg-transparent font-mono">
					{#each PACKAGE_MANAGERS as pm (pm)}
						<Tabs.Trigger
							value={pm}
							class="py-0 leading-none data-[state=active]:shadow-none"
						>
							{pm}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
				<Button
					size="icon-sm"
					variant="ghost"
					class="ml-auto"
					onclick={() => clipboard.copy(commandText)}
				>
					{#if clipboard.copied}
						<HugeiconsIcon icon={Tick02Icon} />
					{:else}
						<HugeiconsIcon icon={Copy01Icon} />
					{/if}
					<span class="sr-only">Copy command</span>
				</Button>
			</div>
			{#each PACKAGE_MANAGERS as pm (pm)}
				<Tabs.Content value={pm} class="mt-0">
					<div class="bg-popover relative overflow-hidden border-t p-3">
						<div class="no-scrollbar overflow-x-auto">
							<code class="font-mono text-sm whitespace-nowrap"
								>{getCommandText(pm)}</code
							>
						</div>
					</div>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
		<Dialog.Footer class="-mx-6 -mb-6 min-w-0">
			<div class="flex w-full min-w-0 flex-col gap-3">
				<Button onclick={() => clipboard.copy(commandText)} class="h-9 w-full">
					{clipboard.copied ? "Copied" : "Copy Command"}
				</Button>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
