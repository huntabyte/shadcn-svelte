<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<Example title="Badge">
	<div class="flex flex-wrap items-center gap-2">
		<Avatar.Root size="sm">
			<Avatar.Image src="https://github.com/jorgezreik.png" alt="@jorgezreik" />
			<Avatar.Fallback>JZ</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/jorgezreik.png" alt="@jorgezreik" />
			<Avatar.Fallback>JZ</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Image src="https://github.com/jorgezreik.png" alt="@jorgezreik" />
			<Avatar.Fallback>JZ</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
	</div>
	<div class="flex flex-wrap items-center gap-2">
		<Avatar.Root size="sm">
			<Avatar.Fallback>JZ</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Fallback>JZ</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Fallback>JZ</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
	</div>
</Example>
