<script lang="ts">
	const items = Array.from({ length: 8 }, (_, index) => index + 1);
</script>

{#snippet sizeItems()}
	<div class="flex flex-col gap-1.5 p-1.5">
		{#each items as item (item)}
			<div class="rounded-lg bg-muted px-3 py-2.5 text-sm">
				Item {item}
			</div>
		{/each}
	</div>
{/snippet}

<div class="mx-auto flex w-full max-w-xs flex-col gap-6">
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade no-scrollbar h-48 overflow-y-auto scroll-fade-4">
				{@render sizeItems()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">scroll-fade-4</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade no-scrollbar h-48 overflow-y-auto scroll-fade-24">
				{@render sizeItems()}
			</div>
		</div>
		<p class="text-center font-mono text-xs text-muted-foreground">scroll-fade-24</p>
	</div>
</div>
