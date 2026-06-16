<script lang="ts">
	import { buttonVariants, Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import Callout from "$lib/components/callout.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { buildRegistryTheme, type DesignSystemConfig } from "$lib/registry/config.js";
	import { cn } from "$lib/utils.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { getCommand, PACKAGE_MANAGERS } from "$lib/package-manager.js";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";

	type ProjectFormTab = "existing-project" | "theme";

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();

	let activeTab = $state<ProjectFormTab>("existing-project");

	const designSystem = useDesignSystem();
	const userConfig = UserConfigContext.get();
	const commandClipboard = new UseClipboard();
	const themeClipboard = new UseClipboard();

	const command = $derived(`shadcn-svelte init --preset ${designSystem.preset}`);
	const themeConfig = $derived<DesignSystemConfig>({
		style: designSystem.style,
		baseColor: designSystem.baseColor,
		theme: designSystem.theme,
		chartColor: designSystem.chartColor,
		iconLibrary: designSystem.iconLibrary,
		font: designSystem.font,
		menuAccent: designSystem.menuAccent,
		menuColor: designSystem.menuColor,
		radius: designSystem.radius,
	});
	const themeCss = $derived(formatThemeCss(buildRegistryTheme(themeConfig).cssVars));

	function formatCssVarsRule(selector: string, cssVars?: Record<string, string>) {
		const declarations = Object.entries(cssVars ?? {})
			.map(([key, value]) => `  --${key}: ${value};`)
			.join("\n");

		return `${selector} {\n${declarations}\n}`;
	}

	function formatThemeCss(cssVars: ReturnType<typeof buildRegistryTheme>["cssVars"]) {
		return [
			formatCssVarsRule(":root", cssVars.light),
			formatCssVarsRule(".dark", cssVars.dark),
		].join("\n\n");
	}

	function getCommandText(pm: (typeof PACKAGE_MANAGERS)[number]) {
		const cmd = getCommand(pm, "execute", command);
		return `${cmd.command} ${cmd.args.join(" ")}`.trim();
	}

	const commandText = $derived(getCommandText(userConfig.current.packageManager));
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn(buttonVariants({ variant: "default" }), className)}>
		Get Code
	</Dialog.Trigger>
	<Dialog.Content
		class="dark no-scrollbar top-[64px] flex max-h-[calc(100svh-2rem)] translate-y-0 flex-col rounded-2xl p-0 shadow-xl **:data-[slot=dialog-close]:top-4.5 **:data-[slot=dialog-close]:right-4 **:data-[slot=field-separator]:h-2 sm:max-w-md"
	>
		<div class="flex min-w-0 flex-1 flex-col gap-0 overflow-hidden rounded-2xl">
			<Dialog.Header class="border-b px-6 py-5">
				<ToggleGroup.Root
					bind:value={activeTab}
					type="single"
					aria-label="Project type"
					spacing={2}
					class="**:data-[slot=toggle-group-item]:data-pressed:bg-neutral-700/70"
				>
					<ToggleGroup.Item value="existing-project">Existing Project</ToggleGroup.Item>
					<ToggleGroup.Item value="theme">Theme</ToggleGroup.Item>
				</ToggleGroup.Root>
			</Dialog.Header>

			{#if activeTab === "existing-project"}
				<div class="no-scrollbar overflow-y-auto">
					<div class="flex flex-col gap-6 px-6 py-4">
						<Callout
							class="w-full md:mx-0"
							icon={BookOpenIcon}
							title="Set up your project first"
						>
							Refer to the
							<a
								href="/docs/installation"
								class="hover:text-primary font-medium underline underline-offset-4"
							>
								installation docs
							</a>
							for framework setup before initializing shadcn-svelte with the command below.
						</Callout>
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
									onclick={() => commandClipboard.copy(commandText)}
								>
									{#if commandClipboard.copied}
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
					</div>
					<Dialog.Footer class="m-0 min-w-0 p-6">
						<div class="flex w-full min-w-0 flex-col gap-3">
							<Button
								onclick={() => commandClipboard.copy(commandText)}
								class="h-9 w-full"
							>
								{commandClipboard.copied ? "Copied" : "Copy Command"}
							</Button>
						</div>
					</Dialog.Footer>
				</div>
			{:else}
				<div class="no-scrollbar overflow-y-auto">
					<div class="flex min-w-0 flex-col gap-3 px-6 py-4">
						<div class="space-y-1.5">
							<h3 class="text-sm font-medium">Theme Tokens</h3>
							<p class="text-muted-foreground text-sm">
								Copy the CSS variables for this preset.
							</p>
						</div>
						<div class="ring-border w-full min-w-0 overflow-hidden rounded-xl ring-1">
							<div class="bg-muted/50 flex items-center gap-2 py-1 pr-1.5 pl-3">
								<div
									class="text-muted-foreground min-w-0 truncate font-mono text-sm"
								>
									globals.css
								</div>
								<Button
									size="icon-sm"
									variant="ghost"
									class="ml-auto"
									onclick={() => themeClipboard.copy(themeCss)}
								>
									{#if themeClipboard.copied}
										<HugeiconsIcon icon={Tick02Icon} />
									{:else}
										<HugeiconsIcon icon={Copy01Icon} />
									{/if}
									<span class="sr-only">Copy theme</span>
								</Button>
							</div>
							<div
								class="bg-popover no-scrollbar relative max-h-[45svh] overflow-auto border-t p-3"
							>
								<pre
									class="min-w-max font-mono text-sm leading-normal whitespace-pre"><code
										>{themeCss}</code
									></pre>
							</div>
						</div>
					</div>
					<Dialog.Footer class="m-0 min-w-0 p-6">
						<Button onclick={() => themeClipboard.copy(themeCss)} class="h-9 w-full">
							{themeClipboard.copied ? "Copied" : "Copy Theme"}
						</Button>
					</Dialog.Footer>
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
