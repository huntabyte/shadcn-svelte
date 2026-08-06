<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } =
		$props();
</script>

<p
	data-slot="questionnaire-description"
	class={cn("cn-questionnaire-description text-pretty text-muted-foreground", className)}
>
	{@render children?.()}
</p>
