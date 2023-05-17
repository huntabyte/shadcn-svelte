<script lang="ts">
	import { Stage } from "svelte-stage";
	import { Avatar, AvatarFallback, AvatarImage } from "$ui/avatar";
	import StageBox from "./StageBox.svelte";
</script>

<Stage component="Avatar">
	<StageBox>
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	</StageBox>
</Stage>
