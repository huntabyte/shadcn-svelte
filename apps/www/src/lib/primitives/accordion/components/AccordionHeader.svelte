<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { HeaderProps } from "../types";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";
	import type { HTMLDivAttributes } from "$primitives/internal";

	type $$Props = HTMLDivAttributes & {
		level?: HeaderProps["level"];
	};

	export let level: HeaderProps["level"] = 3;

	const header = ctx.getHeader();
</script>

<div use:melt={$header(level)} {...$$restProps}>
	<slot />
</div>
