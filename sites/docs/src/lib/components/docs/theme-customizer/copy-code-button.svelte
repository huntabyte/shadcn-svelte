<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import Copy from "svelte-radix/Copy.svelte";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import { config } from "$lib/stores/index.js";
	import { themes } from "$lib/registry/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { CustomizerCode, ThemeWrapper } from "$lib/components/docs/index.js";
	import { createCopyCodeButton } from "$lib/utils.js";
	const activeTheme = themes.find((theme) => theme.name === $config.theme);

	const { copied, copyCode, setCodeString } = createCopyCodeButton();
</script>

{#if activeTheme}
	<Dialog.Root>
		<Dialog.Trigger asChild let:builder>
			<Button class="flex" builders={[builder]}>Copy Code</Button>
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
						on:click={() => {
							copyCode();
						}}
						class="bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground absolute right-4 top-4"
					>
						{#if $copied}
							<Check class="mr-2 h-4 w-4" />
						{:else}
							<Copy class="mr-2 h-4 w-4" />
						{/if}
						Copy
					</Button>
				{/if}
			</ThemeWrapper>
		</Dialog.Content>
	</Dialog.Root>
{/if}
