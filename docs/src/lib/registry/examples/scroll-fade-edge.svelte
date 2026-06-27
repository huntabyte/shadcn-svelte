<script lang="ts">
	const items = [
		"Inbox triage",
		"Design review",
		"API contract",
		"QA pass",
		"Launch notes",
		"Metrics follow-up",
	];

	const tags = [
		"Design",
		"Engineering",
		"Marketing",
		"Product",
		"Research",
		"Sales",
		"Support",
		"Operations",
	];
</script>

{#snippet edgeItems()}
	<div class="flex flex-col gap-1.5 p-1.5">
		{#each items as item (item)}
			<div class="bg-muted rounded-lg px-3 py-2.5 text-sm">
				{item}
			</div>
		{/each}
	</div>
{/snippet}

{#snippet edgeTags()}
	<div class="flex w-max gap-1.5 p-1.5">
		{#each tags as tag (tag)}
			<div class="bg-muted shrink-0 rounded-xl px-4 py-2.5 text-sm">
				{tag}
			</div>
		{/each}
	</div>
{/snippet}

<div class="mx-auto flex max-w-xs min-w-0 flex-col gap-6">
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-t scrollbar-none h-36 overflow-y-auto">
				{@render edgeItems()}
			</div>
		</div>
		<p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-t</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-b scrollbar-none h-36 overflow-y-auto">
				{@render edgeItems()}
			</div>
		</div>
		<p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-b</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-s scrollbar-none overflow-x-auto">
				{@render edgeTags()}
			</div>
		</div>
		<p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-s</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-e scrollbar-none overflow-x-auto">
				{@render edgeTags()}
			</div>
		</div>
		<p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-e</p>
	</div>
</div>
