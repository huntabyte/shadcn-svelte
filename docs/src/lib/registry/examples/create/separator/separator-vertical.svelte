<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Vertical">
	<div class="flex h-5 items-center gap-4 text-sm style-lyra:text-xs/relaxed">
		<div>Blog</div>
		<Separator orientation="vertical" />
		<div>Docs</div>
		<Separator orientation="vertical" />
		<div>Source</div>
	</div>
</Example>
