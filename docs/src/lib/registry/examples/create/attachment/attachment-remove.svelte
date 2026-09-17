<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let { label }: { label: string } = $props();
</script>

<Attachment.Action aria-label={label}>
	<IconPlaceholder
		lucide="XIcon"
		tabler="IconX"
		hugeicons="Cancel01Icon"
		phosphor="XIcon"
		remixicon="RiCloseLine"
	/>
</Attachment.Action>
