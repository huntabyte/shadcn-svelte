<script lang="ts">
	import { ComponentCodeViewerContext } from "./component-code-viewer.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { getIconForLanguageExtension } from "../icons/icons.js";
	import ComponentCodeViewerCopyCodeButton from "./component-code-viewer-copy-code-button.svelte";

	const ctx = ComponentCodeViewerContext.get();
	const file = $derived(ctx.highlightedFiles?.find((f) => f.target === ctx.activeFile));
	const language = $derived(file?.target?.split(".").pop() ?? "svelte");
	const Icon = $derived(getIconForLanguageExtension(language));
</script>

{#if file}
	<!-- svelte-ignore a11y_figcaption_parent -->
	<figcaption
		class="text-code-foreground [&_svg]:text-code-foreground hidden h-12 shrink-0 select-none items-center gap-2 border-b px-4 py-2 md:flex [&_svg]:size-4 [&_svg]:opacity-70"
		data-language={language}
	>
		<Icon />
		{file.target.split("/").pop()}
		<div class="ml-auto flex items-center gap-2">
			<ComponentCodeViewerCopyCodeButton />
		</div>
	</figcaption>

	<div
		class="text-code-foreground [&_svg]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b px-2 py-2 md:hidden [&_svg]:size-4 [&_svg]:opacity-70"
	>
		<Select.Root
			type="single"
			bind:value={() => ctx.activeFile ?? "", (v) => (ctx.activeFile = v)}
		>
			<Select.Trigger class="w-64 justify-start [&>svg]:ml-auto">
				<Icon class="!ml-0" />
				{file.target.split("/").pop()}
			</Select.Trigger>
			<Select.Content>
				{#if ctx.tree}
					{@const tree = ctx.tree[0]}
					{#if tree && tree.children}
						{#each tree.children as file (file.name)}
							<Select.Item value={file.path ?? ""}>
								{file.name}
							</Select.Item>
						{/each}
					{/if}
				{/if}
			</Select.Content>
		</Select.Root>
		<div class="ml-auto flex items-center gap-2">
			<ComponentCodeViewerCopyCodeButton class="mr-0" />
		</div>
	</div>
{/if}
