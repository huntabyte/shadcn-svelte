<script lang="ts">
	const tags = [
		"Design",
		"Engineering",
		"Marketing",
		"Product",
		"Research",
		"Sales",
		"Support",
		"Operations",
		"Finance",
		"Legal",
		"People",
		"Security",
	];
</script>

<div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
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
