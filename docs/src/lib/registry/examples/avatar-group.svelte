<script lang="ts">
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
</Avatar.Group>
