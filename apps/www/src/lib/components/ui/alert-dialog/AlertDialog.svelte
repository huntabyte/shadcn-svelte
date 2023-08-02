<script lang="ts">
	import type { CreateDialogProps } from "@melt-ui/svelte";
	import { ctx } from ".";

	type $$Props = CreateDialogProps;

	const trigger = ctx.set({ ...$$props });
</script>

<slot {trigger} />
