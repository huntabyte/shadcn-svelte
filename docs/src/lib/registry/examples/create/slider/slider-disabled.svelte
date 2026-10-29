<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Disabled">
	<Slider type="single" value={50} max={100} step={1} disabled />
</Example>
