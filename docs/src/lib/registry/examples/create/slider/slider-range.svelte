<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Range">
	<Slider type="multiple" value={[25, 50]} max={100} step={5} />
</Example>
