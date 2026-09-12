<script lang="ts">
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="InputGroup">
	<InputGroup.Root>
		<InputGroup.Input />
		<InputGroup.Addon>
			<Kbd.Root>Space</Kbd.Root>
		</InputGroup.Addon>
	</InputGroup.Root>
</Example>
