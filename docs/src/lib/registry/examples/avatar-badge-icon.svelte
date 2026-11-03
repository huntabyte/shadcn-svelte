<script lang="ts">
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
</script>

<Avatar.Root class="grayscale">
	<Avatar.Image src="https://github.com/pranathip.png" alt="@pranathip" />
	<Avatar.Fallback>PP</Avatar.Fallback>
	<Avatar.Badge>
		<PlusIcon />
	</Avatar.Badge>
</Avatar.Root>
