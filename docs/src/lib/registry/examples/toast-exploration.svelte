<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { createToastManager, toast, Toaster } from "$lib/registry/ui/toast/index.js";
	const local = createToastManager();
	let count = 0;
	let closed = $state(0);

	function showStack() {
		for (const title of ["First notification", "Second notification", "Third notification"])
			toast.add({ title, description: "Hover or press F6 to expand the stack.", timeout: 0 });
	}
</script>

<Toaster toastManager={local} />
<div class="flex flex-wrap justify-center gap-2">
	<Button variant="outline" onclick={showStack}>Show Stack</Button>
	<Button
		variant="outline"
		onclick={() =>
			toast.add({
				id: "updatable",
				title: "Updated notification",
				description: `Update ${++count}`,
				timeout: 0,
			})}>Update Same Toast</Button
	>
	<Button
		variant="outline"
		onclick={() =>
			toast.add({ title: "Timed notification", timeout: 1500, onClose: () => closed++ })}
		>Timed Toast</Button
	>
	<Button
		variant="outline"
		onclick={() =>
			local.add({
				title: "Isolated notification",
				description: "Managed independently of the global stack.",
				timeout: 0,
			})}>Isolated Toast</Button
	>
	<Button
		variant="outline"
		onclick={() => {
			toast.close();
			local.close();
		}}>Close All</Button
	>
	<span class="w-full text-center text-sm text-muted-foreground">Timed toasts closed: {closed}</span
	>
</div>
