<script lang="ts">
	import { accounts, mails } from "./data.js";
	import Mail from "./(components)/mail.svelte";

	let { data } = $props();
</script>

<Mail
	{accounts}
	{mails}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={4}
/>
