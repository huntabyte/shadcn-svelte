<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { Checkbox } from "$components/ui/checkbox";
	import { Input } from "$components/ui/input";

	export let value: Writable<string | undefined | null> = writable("");
	export let type: HTMLInputAttributes["type"] = "text";
	export let checked: Writable<boolean> | undefined = undefined;

	type $$Props = HTMLInputAttributes & {
		value?: Writable<string | undefined | null>;
		type?: HTMLInputAttributes["type"];
		checked?: Writable<boolean>;
	};
</script>

{#if type === "checkbox"}
	<Checkbox bind:checked={$checked} />
{:else}
	<Input bind:value={$value} {...$$restProps} />
{/if}
