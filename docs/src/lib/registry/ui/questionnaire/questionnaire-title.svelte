<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } =
		$props();
</script>

<h2
	data-slot="questionnaire-title"
	class={cn("cn-questionnaire-title cn-font-heading text-pretty", className)}
>
	{@render children?.()}
</h2>
