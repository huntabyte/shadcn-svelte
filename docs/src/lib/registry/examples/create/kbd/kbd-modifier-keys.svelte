<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
</script>

<Example title="Modifier Keys">
	<div class="flex items-center gap-2">
		<Kbd.Root>⌘</Kbd.Root>
		<Kbd.Root>C</Kbd.Root>
	</div>
</Example>
