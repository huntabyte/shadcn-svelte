<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
</script>

<Example title="With Button">
	<div class="flex w-full gap-2">
		<Input.Root type="search" placeholder="Search..." class="flex-1" />
		<Button.Root>Search</Button.Root>
	</div>
</Example>

