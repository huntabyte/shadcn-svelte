<script lang="ts">
	const tags = [
		"تصميم",
		"هندسة",
		"تسويق",
		"منتج",
		"أبحاث",
		"مبيعات",
		"دعم",
		"عمليات",
		"مالية",
		"قانوني",
	];
</script>

<div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border" dir="rtl">
	<div class="scroll-fade-x scrollbar-none overflow-x-auto">
		<div class="flex w-max gap-1.5 p-1.5">
			{#each tags as tag (tag)}
				<div class="bg-muted shrink-0 rounded-lg px-3 py-2.5 text-sm">
					{tag}
				</div>
			{/each}
		</div>
	</div>
</div>
