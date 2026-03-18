<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Slider } from "$lib/registry/ui/slider/index.js";
</script>

<Example title="Multiple Thumbs">
	<Slider type="multiple" value={[10, 20, 70]} max={100} step={10} />
</Example>
