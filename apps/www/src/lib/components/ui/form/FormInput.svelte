<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { Checkbox } from "$components/ui/checkbox";
	import { Input } from "$components/ui/input";
	import { Textarea } from "$components/ui/textarea";

	export let value = writable<string | null | undefined>("");
	export let checked = writable<boolean>(false);
	export let type: HTMLInputAttributes["type"] | "textarea" = "text";

	if (type === "checkbox") {
		checked = value as unknown as Writable<boolean>;
	}
</script>

{#if type === "checkbox"}
	<Checkbox bind:checked={$checked} />
{:else if type === "textarea"}
	<Textarea bind:value={$value} {...$$restProps} />
{:else}
	<Input bind:value={$value} {...$$restProps} />
{/if}
