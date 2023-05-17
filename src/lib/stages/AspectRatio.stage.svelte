<script lang="ts">
	import { Stage } from "svelte-stage";
	import { AspectRatio } from "$components/ui";
	import StageBox from "./StageBox.svelte";
</script>

<Stage component="Aspect Ratio">
	<StageBox>
		<AspectRatio ratio={3 / 2}>
			<img
				src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
				alt="Gray by Drew Beamer"
				class="rounded-md object-cover h-full w-full"
			/>
		</AspectRatio>
	</StageBox>
</Stage>
