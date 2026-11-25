<script lang="ts">
	import { getBitsConfig } from "bits-ui";
	import { useDirection } from "$lib/registry/ui/direction/index.js";
	let { id }: { id: string } = $props();
	const direction = useDirection();
	const config = getBitsConfig();
</script>

<output
	data-testid={id}
	data-locale={config.defaultLocale.current}
	data-portal={config.defaultPortalTo.current}>{direction.current}</output
>
