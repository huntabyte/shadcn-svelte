<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<div class="flex items-center gap-4">
	<Avatar.Root size="sm">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root size="default">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root size="lg">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
</div>
