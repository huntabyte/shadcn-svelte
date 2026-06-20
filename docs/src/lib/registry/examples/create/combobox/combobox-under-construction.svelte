<script lang="ts">
	import Construction from "@lucide/svelte/icons/construction";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	let { title }: { title: string } = $props();
</script>

<Example {title}>
	<div class="flex h-40 w-full flex-col items-center justify-center gap-4">
		<Construction class="size-10" />
		<span>This example is under construction. Check back soon!</span>
	</div>
</Example>
