<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Example title="With Input">
	<div class="flex flex-col gap-4">
		<ButtonGroup>
			<Button variant="outline">Button</Button>
			<Input placeholder="Type something here..." />
		</ButtonGroup>
		<ButtonGroup>
			<Input placeholder="Type something here..." />
			<Button variant="outline">Button</Button>
		</ButtonGroup>
	</div>
</Example>
