<script lang="ts">
	import type { Infer, SuperValidated } from "sveltekit-superforms";
	import ComponentPreviewManual from "$lib/components/docs/component-preview-manual.svelte";
	import { config } from "$lib/stores/index.js";
	import type { FormSchema } from "$lib/registry/default/example/form-demo.svelte";
	import DefaultFormDemo from "$lib/registry/default/example/form-demo.svelte";
	import NewYorkFormDemo from "$lib/registry/new-york/example/form-demo.svelte";

	let { form }: { form: SuperValidated<Infer<FormSchema>> } = $props();
</script>

<ComponentPreviewManual>
	{#if $config.style === "new-york"}
		<NewYorkFormDemo {form} />
	{:else}
		<DefaultFormDemo {form} />
	{/if}
</ComponentPreviewManual>
