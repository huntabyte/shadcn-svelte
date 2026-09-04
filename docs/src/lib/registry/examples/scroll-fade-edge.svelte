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
			<div class="rounded-lg bg-muted px-3 py-2.5 text-sm">
				{item}
			</div>
		{/each}
	</div>
{/snippet}

{#snippet edgeTags()}
	<div class="flex w-max gap-1.5 p-1.5">
		{#each tags as tag (tag)}
			<div class="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm">
				{tag}
			</div>
		{/each}
	</div>
{/snippet}

<div class="mx-auto flex max-w-xs min-w-0 flex-col gap-6">
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-t no-scrollbar h-36 overflow-y-auto">
				{@render edgeItems()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">scroll-fade-t</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-b no-scrollbar h-36 overflow-y-auto">
				{@render edgeItems()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">scroll-fade-b</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-s no-scrollbar overflow-x-auto">
				{@render edgeTags()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">scroll-fade-s</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade-e no-scrollbar overflow-x-auto">
				{@render edgeTags()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">scroll-fade-e</p>
	</div>
</div>
