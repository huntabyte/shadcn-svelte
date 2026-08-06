<script lang="ts">
	import Button from "./questionnaire-button.svelte";
	import type { ComponentProps } from "svelte";
	let { children, ...restProps }: Omit<ComponentProps<typeof Button>, "action"> = $props();
</script>

<Button action="submit" {...restProps}
	>{#if children}{@render children()}{:else}Submit{/if}</Button
>
