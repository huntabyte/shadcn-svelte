<script lang="ts">
	import * as Dialog from "@/registry/new-york/ui/dialog";
	import { config } from "@/stores";
	import { themes } from "@/registry";
	import { Button } from "@/registry/new-york/ui/button";
	import { ThemeWrapper, CustomizerCode } from "@/components/docs";
	import { Check, Copy } from "radix-icons-svelte";
	import { createCopyCodeButton } from "@/utils";
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
						class="absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground"
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
