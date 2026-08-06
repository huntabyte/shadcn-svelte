<script lang="ts">
	import Button from "./questionnaire-button.svelte";
	let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<Button action="skip"
	>{#if children}{@render children()}{:else}Skip{/if}</Button
>
