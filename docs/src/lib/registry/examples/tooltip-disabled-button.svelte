<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<span tabindex="0" {...props}>
					<button disabled class="inline-flex h-9 cursor-not-allowed items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium opacity-50 shadow-sm">
						Disabled button
					</button>
				</span>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>You don't have permission to do this</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
