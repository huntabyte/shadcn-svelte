<script lang="ts">
	import { Toaster, toast } from "../../src/lib/registry/ui/toast/index.js";
	let limit = $state(3);
	let counter = 0;
	const add = () =>
		toast.add({
			title: `Event ${++counter}`,
			description: "Saved successfully",
			timeout: 0,
			actionProps: {
				children: "Undo",
				onclick: () => {
					document.body.dataset.action = "done";
				},
			},
		});
</script>

<main style="padding:30px;min-height:150vh">
	<button id="add" onclick={add}>Add notification</button>
	<button
		id="urgent"
		onclick={() =>
			toast.add({
				title: "Urgent event",
				description: "Immediate attention",
				priority: "high",
				timeout: 0,
			})}>Urgent</button
	>
	<button id="close" onclick={() => toast.close()}>Close all</button>
	<button id="limit" onclick={() => (limit = 1)}>Limit one</button>
	<button id="timed" onclick={() => toast.add({ title: "Timed event", timeout: 1200 })}
		>Timed</button
	>
	<button
		id="loading"
		onclick={() => {
			void toast.promise(new Promise((resolve) => setTimeout(() => resolve("Success"), 600)), {
				loading: "Loading event",
				success: "Success event",
				error: "Failed event",
			});
		}}>Promise</button
	>
	<button
		id="hover-removal"
		onclick={() => {
			toast.add({ title: "Remaining timed", timeout: 1800 });
			const front = toast.add({ title: "Hovered removal", timeout: 0 });
			setTimeout(() => toast.close(front), 900);
		}}>Remove hovered</button
	>
	<button id="outside">Outside</button>
</main>
<Toaster {limit} />
