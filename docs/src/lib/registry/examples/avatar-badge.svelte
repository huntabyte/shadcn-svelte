<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<div class="flex items-center gap-6">
	<div class="relative">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge class="bg-green-500" />
		</Avatar.Root>
	</div>
	<div class="relative">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
			<Avatar.Fallback>LR</Avatar.Fallback>
			<Avatar.Badge class="bg-yellow-500" />
		</Avatar.Root>
	</div>
	<div class="relative">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
			<Avatar.Fallback>ER</Avatar.Fallback>
			<Avatar.Badge class="bg-red-500" />
		</Avatar.Root>
	</div>
</div>
