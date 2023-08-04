<script lang="ts" generics="T">
	import { Popover } from "$components/ui/popover";
	import { writable } from "svelte/store";
	import { ctx, type ComboboxProps } from ".";

	type $$Props = ComboboxProps<T> & {
		items: ComboboxProps<T>["items"];
		filterFunction: ComboboxProps<T>["filterFunction"];
		itemToString: ComboboxProps<T>["itemToString"];
	};

	export let items: ComboboxProps<T>["items"];
	export let filterFunction: ComboboxProps<T>["filterFunction"];
	export let itemToString: ComboboxProps<T>["itemToString"];
	let open: ComboboxProps<T>["open"] = writable(false);

	const filteredItems = ctx.set({
		items,
		filterFunction,
		open,
		itemToString,
		...$$restProps
	});
</script>

<Popover {open}>
	<slot filteredItems={$filteredItems} />
</Popover>
