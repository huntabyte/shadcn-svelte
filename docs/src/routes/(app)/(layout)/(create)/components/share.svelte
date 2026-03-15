<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import ShareIcon from "@lucide/svelte/icons/share";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { buttonVariants, Button } from "$lib/registry/ui/button/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { cn } from "$lib/utils.js";
	import { scale } from "svelte/transition";
	import { OG_IMAGE_BASE_URL } from "$lib/../routes/og/og.js";

	const designSystem = useDesignSystem();

	const clipboard = new UseClipboard();

	const ogSrc = $derived(
		`${OG_IMAGE_BASE_URL}/create/og${new URL(designSystem.shareUrl).search}`
	);
</script>

<Button
	variant="outline"
	size="sm"
	class="md:hidden"
	onclick={() => clipboard.copy(designSystem.shareUrl)}
>
	{#if clipboard.copied}
		<CheckIcon />
	{:else}
		<ShareIcon />
	{/if}
	Share
</Button>
<Popover.Root>
	<Popover.Trigger
		class={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden md:flex")}
	>
		<ShareIcon />
		Share
	</Popover.Trigger>
	<Popover.Content align="end" class="w-96">
		<div class="flex w-full flex-col items-start gap-2">
			<div
				class="border-border bg-background h-[183px] w-full overflow-hidden rounded-lg border"
			>
				<img src={ogSrc} alt="og" class="size-full object-contain" />
			</div>
			<div class="flex w-full place-items-center items-center gap-2">
				<Input readonly value={designSystem.shareUrl} />
				<Button
					variant="outline"
					size="icon"
					onclick={() => clipboard.copy(designSystem.shareUrl)}
				>
					{#if clipboard.copied}
						<div in:scale={{ duration: 500, start: 0.85 }}>
							<CheckIcon tabindex={-1} />
							<span class="sr-only">Copied</span>
						</div>
					{:else}
						<div in:scale={{ duration: 500, start: 0.85 }}>
							<CopyIcon tabindex={-1} />
							<span class="sr-only">Copy</span>
						</div>
					{/if}
				</Button>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
