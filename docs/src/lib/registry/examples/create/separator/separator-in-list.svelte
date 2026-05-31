<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<Example title="In List">
	<div class="style-lyra:text-xs/relaxed flex flex-col gap-2 text-sm">
		<dl class="flex items-center justify-between">
			<dt>Item 1</dt>
			<dd class="text-muted-foreground">Value 1</dd>
		</dl>
		<Separator />
		<dl class="flex items-center justify-between">
			<dt>Item 2</dt>
			<dd class="text-muted-foreground">Value 2</dd>
		</dl>
		<Separator />
		<dl class="flex items-center justify-between">
			<dt>Item 3</dt>
			<dd class="text-muted-foreground">Value 3</dd>
		</dl>
	</div>
</Example>
