<script lang="ts">
	import { onMount } from "svelte";
	import QRCode from "qrcode";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const connectUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

	let dataUrl = $state("");

	onMount(() => {
		QRCode.toDataURL(connectUrl, { width: 160, margin: 1 }).then((url) => {
			dataUrl = url;
		});
	});
</script>

<Card.Root>
	<Card.Content class="flex justify-center pt-6">
		<div class="rounded-xl border bg-white p-4">
			{#if dataUrl}
				<img src={dataUrl} alt="" width="160" height="160" class="block" />
			{:else}
				<div class="size-[160px] animate-pulse rounded bg-muted"></div>
			{/if}
		</div>
	</Card.Content>
	<Card.Header class="text-center">
		<Card.Title>Scan to connect your mobile device</Card.Title>
		<Card.Description>
			Open the Ledger mobile app and scan this code to link your device.
		</Card.Description>
	</Card.Header>
	<Card.Footer>
		<Button variant="secondary" class="w-full">Got it</Button>
	</Card.Footer>
</Card.Root>
