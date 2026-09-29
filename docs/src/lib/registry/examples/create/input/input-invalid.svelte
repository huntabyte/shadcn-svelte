<script lang="ts">
	import * as Input from "$lib/registry/ui/input/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Invalid">
	<Input.Root type="text" placeholder="Error" aria-invalid="true" />
</Example>
