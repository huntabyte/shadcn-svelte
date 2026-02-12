<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Example title="Basic">
	<div class="flex flex-col gap-4">
		<ButtonGroup>
			<Button variant="outline">Button</Button>
			<Button variant="outline">Another Button</Button>
		</ButtonGroup>
	</div>
</Example>
