<script lang="ts">
	// We are using one of our custom/local `ui` components here
	import * as Stepper from "$lib/registry/ui/stepper/index.js";
</script>

<Stepper.Root>
	{#each { length: 5 } as _, i (i)}
		<Stepper.Item step={i + 1} />
	{/each}
</Stepper.Root>
