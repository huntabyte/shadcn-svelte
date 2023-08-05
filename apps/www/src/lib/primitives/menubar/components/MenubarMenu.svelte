<script lang="ts">
	import { ctx } from "../ctx";
	import type { MenuProps } from "../types";

	type $$Props = MenuProps;
	ctx.setMenu($$restProps);
</script>

<slot />
