<script lang="ts">
	import Button from "./questionnaire-button.svelte";
	import type { ComponentProps } from "svelte";
	let { children, ...restProps }: Omit<ComponentProps<typeof Button>, "action"> = $props();
</script>

<Button action="next" {...restProps}
	>{#if children}{@render children()}{:else}Next{/if}</Button
>
