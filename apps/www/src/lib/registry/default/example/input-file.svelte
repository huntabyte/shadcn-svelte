<script lang="ts">
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import { Label } from "$lib/registry/default/ui/label/index.js";
</script>

<div class="grid w-full max-w-sm items-center gap-1.5">
	<Label for="picture">Picture</Label>
	<Input id="picture" type="file" />
</div>
