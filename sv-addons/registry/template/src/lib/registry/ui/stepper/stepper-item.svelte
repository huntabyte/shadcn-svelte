<!--
This is a custom `ui` component that is not a part of the shadcn-svelte registry.
-->

<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let { class: className, step, ...props }: HTMLButtonAttributes & { step: number } = $props();
</script>

<button class={cn("bg-blue-500", className)} {...props}> {step} </button>
