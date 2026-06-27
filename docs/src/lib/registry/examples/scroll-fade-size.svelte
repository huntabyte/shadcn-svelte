{#snippet sizeItems()}
	<div class="flex flex-col gap-1.5 p-1.5">
		{#each Array.from({ length: 8 }, (_, index) => index) as index (index)}
			<div class="bg-muted rounded-lg px-3 py-2.5 text-sm">
				Item {index + 1}
			</div>
		{/each}
	</div>
{/snippet}

<div class="mx-auto flex w-full max-w-xs flex-col gap-6">
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade scrollbar-none scroll-fade-4 h-48 overflow-y-auto">
				{@render sizeItems()}
			</div>
		</div>
		<p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-4</p>
	</div>
	<div class="flex flex-col gap-3">
		<div class="overflow-hidden rounded-2xl border">
			<div class="scroll-fade scrollbar-none scroll-fade-24 h-48 overflow-y-auto">
				{@render sizeItems()}
			</div>
		</div>
		<p class="text-muted-foreground text-center font-mono text-xs">scroll-fade-24</p>
	</div>
</div>
