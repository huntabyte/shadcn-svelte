<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { AspectRatio } from "$lib/registry/ui/aspect-ratio/index.js";
</script>

<Example title="16:9" class="items-center justify-center">
	<AspectRatio ratio={16 / 9} class="bg-muted rounded-lg">
		<img
			src="https://avatar.vercel.sh/shadcn1"
			alt="shadcn1"
			class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
		/>
	</AspectRatio>
</Example>
