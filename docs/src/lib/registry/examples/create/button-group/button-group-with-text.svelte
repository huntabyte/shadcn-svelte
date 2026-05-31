<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup, ButtonGroupText } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<Example title="With Text">
	<div class="flex flex-col gap-4">
		<ButtonGroup>
			<ButtonGroupText>Text</ButtonGroupText>
			<Button variant="outline">Another Button</Button>
		</ButtonGroup>
		<ButtonGroup>
			<ButtonGroupText>
				{#snippet child({ props })}
					<Label for="input-text" {...props}>GPU Size</Label>
				{/snippet}
			</ButtonGroupText>
			<Input id="input-text" placeholder="Type something here..." />
		</ButtonGroup>
	</div>
</Example>
