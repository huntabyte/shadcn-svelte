<script lang="ts">
	import { AspectRatio } from "$lib/registry/ui/aspect-ratio/index.js";
</script>

<div class="w-full max-w-[10rem]">
	<AspectRatio ratio={9 / 16} class="bg-muted rounded-lg">
		<img
			src="https://avatar.vercel.sh/shadcn1"
			alt="Photo"
			class="rounded-lg object-cover grayscale dark:brightness-20"
		/>
	</AspectRatio>
</div>
