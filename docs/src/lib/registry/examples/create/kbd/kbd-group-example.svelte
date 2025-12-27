<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
</script>

<Example title="KbdGroup">
	<Kbd.Group>
		<Kbd.Root>Ctrl</Kbd.Root>
		<Kbd.Root>Shift</Kbd.Root>
		<Kbd.Root>P</Kbd.Root>
	</Kbd.Group>
</Example>
