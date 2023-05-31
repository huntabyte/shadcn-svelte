<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import Input from "../input/Input.svelte";

	export let value: Writable<string | undefined | null> = writable("");

	type $$Props = HTMLInputAttributes & {
		value?: Writable<string | undefined | null>;
	};
</script>

<Input bind:value={$value} {...$$restProps} />
