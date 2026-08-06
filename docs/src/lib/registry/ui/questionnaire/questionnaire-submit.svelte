<script lang="ts">
	import Button from "./questionnaire-button.svelte";
	let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<Button action="submit"
	>{#if children}{@render children()}{:else}Submit{/if}</Button
>
