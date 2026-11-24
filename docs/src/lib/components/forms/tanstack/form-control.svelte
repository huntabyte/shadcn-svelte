<script lang="ts">
	import { FormControlState, type FormControlProps } from "./context.svelte.js";
	import type { Snippet } from "svelte";

	let {
		children,
	}: {
		children?: Snippet<[{ props: FormControlProps }]>;
	} = $props();

	const id = $props.id();
	const control = FormControlState.create(id);
</script>

{@render children?.({ props: control.props })}
