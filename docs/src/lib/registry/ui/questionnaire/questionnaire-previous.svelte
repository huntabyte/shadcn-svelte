<script lang="ts">
	import Button from "./questionnaire-button.svelte";
	let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<Button action="previous"
	>{#if children}{@render children()}{:else}Previous{/if}</Button
>
