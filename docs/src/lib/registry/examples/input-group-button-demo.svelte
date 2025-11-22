<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import InfoIcon from "@lucide/svelte/icons/info";
	import StarIcon from "@lucide/svelte/icons/star";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";

	let isFavorite = $state(false);

	const clipboard = new UseClipboard();
</script>

<div class="grid w-full max-w-sm gap-6">
	<InputGroup.Root>
		<InputGroup.Input placeholder="https://x.com/shadcn" readonly />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Button
				aria-label="Copy"
				title="Copy"
				size="icon-xs"
				onclick={() => clipboard.copy("https://x.com/shadcn")}
			>
				{#if clipboard.copied}
					<CheckIcon />
				{:else}
					<CopyIcon />
				{/if}
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
	<InputGroup.Root class="[--radius:9999px]">
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<InputGroup.Addon>
						<InputGroup.Button {...props} variant="secondary" size="icon-xs">
							<InfoIcon />
						</InputGroup.Button>
					</InputGroup.Addon>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content align="start" class="flex flex-col gap-1 rounded-xl text-sm">
				<p class="font-medium">Your connection is not secure.</p>
				<p>You should not enter any sensitive information on this site.</p>
			</Popover.Content>
		</Popover.Root>
		<InputGroup.Addon class="text-muted-foreground ps-1.5">
			<InputGroup.Text>https://</InputGroup.Text>
		</InputGroup.Addon>
		<InputGroup.Input />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Button onclick={() => (isFavorite = !isFavorite)} size="icon-xs">
				<StarIcon class={isFavorite ? "fill-blue-600 stroke-blue-600" : ""} />
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
	<InputGroup.Root>
		<InputGroup.Input placeholder="Type to search..." />
		<InputGroup.Addon align="inline-end">
			<InputGroup.Button variant="secondary">Search</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
</div>
