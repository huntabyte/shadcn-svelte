<script lang="ts">
	import { getContext } from "svelte";
	import { Label } from "$components/ui/label";
	import type { ErrorsContext } from ".";

	const id = getContext<string>("id");
	const errors = getContext<ErrorsContext>("errors");
</script>

<Label {...$$restProps} for={id} class={$errors ? "text-destructive" : ""}>
	<slot />
</Label>
