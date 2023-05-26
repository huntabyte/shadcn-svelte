<script lang="ts">
	import { Input } from "$components/ui/input";
	import { Label } from "$components/ui/label";
</script>

<div class="grid w-full max-w-sm items-center gap-1.5">
	<Label for="picture">Picture</Label>
	<Input id="picture" type="file" />
</div>
