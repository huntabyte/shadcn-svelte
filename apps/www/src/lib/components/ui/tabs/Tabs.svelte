<script lang="ts" context="module">
	export type RootProps = Omit<
		CreateTabsProps,
		"value" | "defaultValue" | "onValueChange"
	> & {
		value?: CreateTabsProps["defaultValue"];
		class?: string;
	};
</script>

<script lang="ts">
	import {
		type CreateTabsProps,
		melt,
		type StoreValue
	} from "@melt-ui/svelte";
	import { ctx } from "./index";

	type $$Props = RootProps;

	export let orientation: $$Props["orientation"] = undefined;
	export let activateOnFocus: $$Props["activateOnFocus"] = undefined;
	export let loop: $$Props["loop"] = undefined;
	export let autoSet: $$Props["autoSet"] = undefined;

	// I chose to only export value, as defaultValue, to allow for more
	// traditional component behaviour (e.g. two-way binding)
	export let value: $$Props["value"] = undefined;

	function removeUndefined<T extends object>(obj: T): T {
		const result = {} as T;
		for (const key in obj) {
			const value = obj[key];
			if (value !== undefined) result[key] = value;
		}

		console.log(result);
		return result;
	}

	const {
		elements: { root },
		states: { value: localValue },
		options
	} = ctx.set(
		removeUndefined({
			orientation,
			activateOnFocus,
			loop,
			autoSet,
			defaultValue: value,
			onValueChange({ next }) {
				value = next;
				return next;
			}
		})
	);

	$: value !== undefined && localValue.set(value);

	function updateOption<
		K extends keyof typeof options,
		V extends StoreValue<(typeof options)[keyof typeof options]>
	>(key: K, value: V | undefined) {
		if (value === undefined) return;
		const store = options[key];
		store.set(value as never);
	}

	$: updateOption("activateOnFocus", activateOnFocus);
	$: updateOption("loop", loop);
	$: updateOption("autoSet", autoSet);
	$: updateOption("orientation", orientation);

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div use:melt={$root} class={className} {...$$restProps}>
	<slot />
</div>
