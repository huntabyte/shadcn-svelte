<script lang="ts">
	import { accounts, mails } from "./data";
	import Mail from "./mail.svelte";

	export let data;

	const defaultLayout = data.layout ? JSON.parse(data.layout) : undefined;
	const defaultCollapsed = data.collapsed ? JSON.parse(data.collapsed) : false;
</script>

<Mail {accounts} {mails} {defaultLayout} {defaultCollapsed} navCollapsedSize={4} />
