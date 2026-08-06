<script lang="ts">
	import Button from "./questionnaire-button.svelte";
	let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<Button action="next"
	>{#if children}{@render children()}{:else}Next{/if}</Button
>
