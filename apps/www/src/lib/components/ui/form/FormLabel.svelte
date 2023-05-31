<script lang="ts">
	import { getContext } from "svelte";
	import { Label } from "$components/ui/label";
</script>

<Label {...$$restProps} for={getContext("id")}>
	<slot />
</Label>
