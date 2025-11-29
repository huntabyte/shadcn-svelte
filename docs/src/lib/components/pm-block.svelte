<script lang="ts">
	import type { Command } from "package-manager-detector";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { getCommand, PACKAGE_MANAGERS, type PackageManager } from "$lib/package-manager.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import CopyIcon from "@tabler/icons-svelte/icons/copy";
	import CheckIcon from "@tabler/icons-svelte/icons/check";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { cn } from "$lib/utils.js";

	const {
		type,
		command,
	}: {
		type: Command | "create";
		command: string | string[];
	} = $props();

	const userConfig = UserConfigContext.get();

	function getCommandText(agent: PackageManager) {
		const cmd = getCommand(agent, type, command);
		return `${cmd.command} ${cmd.args.join(" ")}`.trim();
	}

	const commandText = $derived(getCommandText(userConfig.current.packageManager));

	const clipboard = new UseClipboard();
</script>

<figure data-rehype-pretty-code-figure>
	<div class="overflow-x-auto">
		<Tabs.Root
			bind:value={
				() => userConfig.current.packageManager,
				(v) => {
					userConfig.setConfig({ packageManager: v });
				}
			}
			class="gap-0"
		>
			<div class="border-border/50 flex items-center gap-2 border-b px-3 py-1">
				<div
					class="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70"
				>
					<TerminalIcon class="text-code size-3" />
				</div>
				<Tabs.List class="rounded-none bg-transparent p-0" data-llm-ignore>
					{#each PACKAGE_MANAGERS as pm (pm)}
						<Tabs.Trigger
							value={pm}
							class="dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 data-[state=active]:bg-accent data-[state=active]:border-input inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 pt-0.5 font-mono text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-none"
						>
							{pm}
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</div>
			<div class="no-scrollbar overflow-x-auto">
				{#each PACKAGE_MANAGERS as pm (pm)}
					<Tabs.Content
						value={pm}
						class="mt-0 px-4 py-3.5"
						data-llm-ignore={pm === "yarn" || pm === "yarn@berry" ? "" : undefined}
					>
						{#snippet child({ props })}
							{@const { hidden, class: className, ...rest } = props}
							<div
								{...rest}
								class={cn(className as string, (hidden as boolean) && "hidden")}
							>
								<pre><code
										class="font-mono text-sm leading-none"
										data-language="bash">{getCommandText(pm)}</code
									></pre>
							</div>
						{/snippet}
					</Tabs.Content>
				{/each}
			</div>
		</Tabs.Root>
		<Tooltip.Root disableCloseOnTriggerClick>
			<Tooltip.Trigger onclick={() => clipboard.copy(commandText)}>
				{#snippet child({ props })}
					<Button
						{...props}
						data-slot="copy-button"
						size="icon"
						variant="ghost"
						class="absolute end-2 top-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
					>
						<span class="sr-only" data-llm-ignore>Copy</span>
						{#if clipboard.copied}
							<CheckIcon />
						{:else}
							<CopyIcon />
						{/if}
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>
				{clipboard.copied ? "Copied" : "Copy to Clipboard"}
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
</figure>
