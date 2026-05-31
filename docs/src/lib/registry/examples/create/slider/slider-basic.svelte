<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Slider } from "$lib/registry/ui/slider/index.js";
</script>

<Example title="Basic">
	<Slider type="single" value={50} max={100} step={1} />
</Example>
