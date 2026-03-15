<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<div class="flex items-center gap-6">
	<div class="relative">
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
			<Avatar.Badge class="bg-primary text-primary-foreground">
				<CheckIcon />
			</Avatar.Badge>
		</Avatar.Root>
	</div>
	<div class="relative">
		<Avatar.Root size="lg">
			<Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
			<Avatar.Fallback>LR</Avatar.Fallback>
			<Avatar.Badge class="bg-green-500 text-white">
				<CheckIcon />
			</Avatar.Badge>
		</Avatar.Root>
	</div>
</div>
