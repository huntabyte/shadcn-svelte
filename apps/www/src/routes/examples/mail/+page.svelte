<script lang="ts">
	import { accounts, mails } from "./data";
	import Mail from "./(components)/mail.svelte";

	export let data;
</script>

<Mail
	{accounts}
	{mails}
	defaultLayout={data.layout}
	defaultCollapsed={data.collapsed}
	navCollapsedSize={4}
/>
