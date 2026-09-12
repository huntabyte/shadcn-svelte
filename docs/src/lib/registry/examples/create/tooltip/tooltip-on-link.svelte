<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="On Link">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<a
					href="/"
					class="w-fit text-sm text-primary underline-offset-4 hover:underline"
					onclick={(e) => e.preventDefault()}
					{...props}
				>
					Learn more
				</a>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Click to read the documentation</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Example>
