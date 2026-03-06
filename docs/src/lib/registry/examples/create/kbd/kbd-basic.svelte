<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
</script>

<Example title="Basic">
	<div class="flex items-center gap-2">
		<Kbd.Root>Ctrl</Kbd.Root>
		<Kbd.Root>⌘K</Kbd.Root>
		<Kbd.Root>Ctrl + B</Kbd.Root>
	</div>
</Example>
