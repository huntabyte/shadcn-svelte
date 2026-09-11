<script lang="ts">
	import OpeningPositionScroller from "$lib/components/message-scroller/opening-position-scroller.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";

	const positions = [
		{ value: "start", label: "start" },
		{ value: "end", label: "end" },
		{ value: "last-anchor", label: "last-anchor" },
	] satisfies Array<{
		value: "start" | "end" | "last-anchor";
		label: string;
	}>;

	let position = $state<"start" | "end" | "last-anchor">("last-anchor");
	let positionKey = $state(0);

	function handlePositionChange(value: string) {
		if (value === "start" || value === "end" || value === "last-anchor") {
			position = value;
			positionKey += 1;
		}
	}
</script>

<div class="relative flex flex-col gap-4">
	<Card.Root class="mx-auto h-140 w-full max-w-sm gap-0">
		<Card.Header class="gap-1 border-b">
			<Card.Title>Opening Position</Card.Title>
			<Card.Description>Choose where a saved transcript opens.</Card.Description>
		</Card.Header>
		<Card.Content class="flex-1 overflow-hidden p-0">
			<MessageScroller.Provider>
				<OpeningPositionScroller {position} {positionKey} />
			</MessageScroller.Provider>
		</Card.Content>
		<Card.Footer class="flex items-center justify-center border-t">
			<Tabs.Root value={position} onValueChange={handlePositionChange} class="w-full">
				<Tabs.List class="w-full">
					{#each positions as option (option.value)}
						<Tabs.Trigger value={option.value}>{option.label}</Tabs.Trigger>
					{/each}
				</Tabs.List>
			</Tabs.Root>
		</Card.Footer>
	</Card.Root>
	<div class="mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground">
		Toggle the defaultScrollPosition to see where the transcript starts when you open the thread
	</div>
</div>
