<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<Example title="Sizes">
	<div class="flex flex-wrap items-center gap-2">
		<Avatar.Root size="sm">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div class="flex flex-wrap items-center gap-2">
		<Avatar.Root size="sm">
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
</Example>
