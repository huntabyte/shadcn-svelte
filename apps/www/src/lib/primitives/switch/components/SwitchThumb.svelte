<script lang="ts">
	import { ctx } from "../ctx";
	import type { ThumbProps } from "../types";

	type $$Props = ThumbProps;
	const {
		states: { checked }
	} = ctx.get();
</script>

<span data-state={$checked ? "checked" : "unchecked"} {...$$restProps} />
