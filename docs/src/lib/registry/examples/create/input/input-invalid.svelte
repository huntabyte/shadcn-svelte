<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Input from "$lib/registry/ui/input/index.js";
</script>

<Example title="Invalid">
	<Input.Root type="text" placeholder="Error" aria-invalid="true" />
</Example>
