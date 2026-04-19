<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import TrafficOverview from "./traffic-overview.svelte";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div class={className}>
	<TrafficOverview {...restProps} />
</div>
