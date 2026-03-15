<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<Example title="Vertical">
	<div class="style-lyra:text-xs/relaxed flex h-5 items-center gap-4 text-sm">
		<div>Blog</div>
		<Separator orientation="vertical" />
		<div>Docs</div>
		<Separator orientation="vertical" />
		<div>Source</div>
	</div>
</Example>
