<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import { config } from "$lib/stores/index.js";
	import { themes } from "$lib/registry/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import CustomizerCode from "$lib/components/docs/theme-customizer/customizer-code.svelte";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import { createCopyCodeButton } from "$lib/utils.js";

	const activeTheme = $derived(themes.find((theme) => theme.name === $config.theme));

	const { copied, copyCode, setCodeString } = createCopyCodeButton();
</script>

{#if activeTheme}
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button {...props} class="flex" size="sm" variant="ghost">Copy Code</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content class="max-w-2xl outline-none">
			<Dialog.Header>
				<Dialog.Title>Theme</Dialog.Title>
				<Dialog.Description>
					Copy and paste the following code into your CSS file.
				</Dialog.Description>
			</Dialog.Header>
			<ThemeWrapper defaultTheme="zinc" class="relative">
				<CustomizerCode {setCodeString} />
				{#if activeTheme}
					<Button
						size="sm"
						onclick={copyCode}
						class="bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground absolute right-4 top-4"
					>
						{#if $copied}
							<Check class="mr-2 size-4" />
						{:else}
							<Copy class="mr-2 size-4" />
						{/if}
						Copy
					</Button>
				{/if}
			</ThemeWrapper>
		</Dialog.Content>
	</Dialog.Root>
{/if}
