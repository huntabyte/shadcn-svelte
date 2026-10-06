<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { toast, type ToastType } from "$lib/registry/ui/toast/index.js";
	const types: ToastType[] = ["success", "info", "warning", "error"];
</script>

<div class="flex flex-wrap justify-center gap-2">
	<Button
		variant="outline"
		onclick={() =>
			toast.add({ title: "Event created", description: "Sunday, December 3 at 9:00 AM" })}
		>Default</Button
	>
	{#each types as type (type)}
		<Button
			variant="outline"
			onclick={() =>
				toast.add({
					type,
					title: `${type[0].toUpperCase()}${type.slice(1)} toast`,
					description: "Sunday, December 3 at 9:00 AM",
				})}>{type[0].toUpperCase()}{type.slice(1)}</Button
		>
	{/each}
</div>
