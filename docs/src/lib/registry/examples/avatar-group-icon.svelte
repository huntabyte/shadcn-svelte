<script lang="ts">
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<Avatar.Group>
	<Avatar.Root>
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root>
		<Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
		<Avatar.Fallback>LR</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root>
		<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
		<Avatar.Fallback>ER</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.GroupCount
		class="bg-muted text-muted-foreground size-8 rounded-full text-xs font-medium"
	>
		<PlusIcon class="size-3" />
	</Avatar.GroupCount>
</Avatar.Group>
