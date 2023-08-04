<script lang="ts">
	import type { CreateDialogProps } from "@melt-ui/svelte";
	import { ctx } from ".";

	type $$Props = CreateDialogProps;

	ctx.set({ ...$$props });
</script>

<slot />
