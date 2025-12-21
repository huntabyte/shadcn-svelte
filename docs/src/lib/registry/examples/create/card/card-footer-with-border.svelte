<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
</script>

<Example title="Footer with Border">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Content>
			<p>
				The footer has a border-t class applied, creating a visual
				separation between the content and footer sections.
			</p>
		</Card.Content>
		<Card.Footer class="border-t">
			<Button.Root variant="outline" class="w-full">
				Footer with Border
			</Button.Root>
		</Card.Footer>
	</Card.Root>
</Example>

