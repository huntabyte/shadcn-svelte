<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { AccordionHeaderProps } from "../types";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		level?: AccordionHeaderProps["level"];
	};

	export let level: AccordionHeaderProps["level"] = 3;

	const header = ctx.getHeader();
</script>

<div use:melt={$header(level)} {...$$restProps}>
	<slot />
</div>
