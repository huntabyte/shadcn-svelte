<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
</script>

<Example title="With Button Text">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<Button size="sm" variant="outline">Button</Button>
			<Toggle variant="outline" aria-label="Toggle sm" size="sm">Toggle</Toggle>
		</div>
		<div class="flex items-center gap-2">
			<Button size="default" variant="outline">Button</Button>
			<Toggle variant="outline" aria-label="Toggle default" size="default">Toggle</Toggle>
		</div>
		<div class="flex items-center gap-2">
			<Button size="lg" variant="outline">Button</Button>
			<Toggle variant="outline" aria-label="Toggle lg" size="lg">Toggle</Toggle>
		</div>
	</div>
</Example>
