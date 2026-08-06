<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } =
		$props();
</script>

<div
	role="group"
	data-slot="questionnaire-choices"
	class={cn("cn-questionnaire-choices group/questionnaire-choices grid min-w-0", className)}
>
	{@render children?.()}
</div>
