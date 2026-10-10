<script lang="ts" generics="Row extends string">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let {
		rows,
		states = ["default", "hover", "focus", "active", "disabled"],
		render,
		class: className,
	}: {
		rows: readonly Row[];
		states?: readonly string[];
		render: Snippet<[Row, string]>;
		class?: string;
	} = $props();
</script>

<div class={cn("w-full overflow-x-auto", className)}>
	<table class="w-full border-separate border-spacing-x-2 border-spacing-y-3">
		<thead>
			<tr>
				<th scope="col"><span class="sr-only">Variant</span></th>
				{#each states as state (state)}
					<th scope="col" class="text-left font-mono text-xs font-normal text-muted-foreground">
						{state}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row)}
				<tr>
					<th
						scope="row"
						class="pr-4 text-left font-mono text-xs font-normal text-muted-foreground"
					>
						{row}
					</th>
					{#each states as state (state)}
						<td>{@render render(row, state)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
