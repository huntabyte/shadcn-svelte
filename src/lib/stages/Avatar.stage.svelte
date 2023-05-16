<script lang="ts">
	import { Stage } from "svelte-stage";
	import { Avatar, AvatarFallback, AvatarImage } from "$components/ui";
</script>

<Stage component="Avatar">
	<Avatar>
		<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
		<AvatarFallback>CN</AvatarFallback>
	</Avatar>
</Stage>
