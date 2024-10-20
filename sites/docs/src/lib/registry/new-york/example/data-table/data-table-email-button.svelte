<script lang="ts">
	import type { ComponentProps } from "svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";

	let { variant = "ghost", ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Button {variant} {...restProps}>
	Email
	<CaretSort class="ml-2 size-4" />
</Button>
