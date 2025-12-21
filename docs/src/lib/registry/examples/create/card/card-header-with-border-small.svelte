<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
</script>

<Example title="Header with Border (Small)">
	<Card.Root size="sm" class="mx-auto w-full max-w-sm">
		<Card.Header class="border-b">
			<Card.Title>Header with Border</Card.Title>
			<Card.Description>
				This is a small card with a header that has a bottom border.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>
				The header has a border-b class applied, creating a visual
				separation between the header and content sections.
			</p>
		</Card.Content>
	</Card.Root>
</Example>

