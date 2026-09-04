<script lang="ts">
	const items = Array.from({ length: 8 }, (_, index) => index + 1);
</script>

{#snippet noneItems()}
	<div class="flex flex-col gap-1.5 p-1.5">
		{#each items as item (item)}
			<div class="rounded-lg bg-muted px-3 py-2.5 text-sm">
				Item {item}
			</div>
		{/each}
	</div>
{/snippet}

<div class="mx-auto flex max-w-xs min-w-0 flex-col gap-6">
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade no-scrollbar h-48 overflow-y-auto">
				{@render noneItems()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">scroll-fade</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade no-scrollbar h-48 overflow-y-auto scroll-fade-none">
				{@render noneItems()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">
			scroll-fade scroll-fade-none
		</p>
	</div>
</div>
