<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
</script>

<Example title="With samp">
	<Kbd.Root>
		<samp>File</samp>
	</Kbd.Root>
</Example>
