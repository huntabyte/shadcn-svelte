<script lang="ts">
	import { getContext } from "svelte";
	import { Label } from "$components/ui/label";

	const id = getContext<string>("id");
</script>

<Label {...$$restProps} for={id}>
	<slot />
</Label>
