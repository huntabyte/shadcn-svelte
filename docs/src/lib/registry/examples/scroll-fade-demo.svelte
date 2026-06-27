<div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
	<div class="scroll-fade scrollbar-none h-72 overflow-y-auto">
		<div class="flex flex-col gap-1.5 p-1.5">
			{#each Array.from({ length: 12 }, (_, index) => index) as index (index)}
				<div class="bg-muted rounded-lg px-3 py-2.5 text-sm">
					Item {index + 1}
				</div>
			{/each}
		</div>
	</div>
</div>
