<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<Example title="Horizontal">
	<div class="style-lyra:text-xs/relaxed flex flex-col gap-4 text-sm">
		<div class="flex flex-col gap-1">
			<div class="leading-none font-medium">shadcn/ui</div>
			<div class="text-muted-foreground">The Foundation for your Design System</div>
		</div>
		<Separator />
		<div>
			A set of beautifully designed components that you can customize, extend, and build on.
		</div>
	</div>
</Example>
