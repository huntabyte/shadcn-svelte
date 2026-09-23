<script lang="ts">
	import * as Button from "$lib/registry/ui/button/index.js";
	import * as Input from "$lib/registry/ui/input/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="With Button">
	<div class="flex w-full gap-2">
		<Input.Root type="search" placeholder="Search..." class="flex-1" />
		<Button.Root>Search</Button.Root>
	</div>
</Example>
