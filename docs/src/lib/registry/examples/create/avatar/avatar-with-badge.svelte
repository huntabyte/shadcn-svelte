<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<Example title="Badge">
	<div class="flex flex-wrap items-center gap-4">
		<Avatar.Root size="sm">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
		<Avatar.Root size="default">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
		<Avatar.Root size="lg">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge />
		</Avatar.Root>
	</div>
</Example>
