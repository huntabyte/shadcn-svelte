<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { Checkbox } from "$components/ui/checkbox";
	import { Input } from "$components/ui/input";

	export let value = writable<string | null | undefined>("");
	export let checked = writable<boolean>(false);
	export let type: HTMLInputAttributes["type"] = "text";

	if (type === "checkbox") {
		checked = value as unknown as Writable<boolean>;
	}
</script>

{#if type === "checkbox"}
	<Checkbox bind:checked={$checked} />
{:else}
	<Input bind:value={$value} {...$$restProps} />
{/if}
