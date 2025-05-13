<script lang="ts">
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-1.5">
	<Label for="email">Email</Label>
	<Input type="email" id="email" placeholder="email" />
</div>
