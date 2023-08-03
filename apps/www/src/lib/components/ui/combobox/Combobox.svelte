<script lang="ts" generics="T">
	import { ctx, type ComboboxProps } from ".";

	type $$Props = ComboboxProps<T>;

	export let items: T[];
	export let filterFunction: (item: T, value: string) => boolean;

	ctx.set({ items, filterFunction, ...$$restProps });
</script>

<slot />
