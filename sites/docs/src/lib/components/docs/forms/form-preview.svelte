<script lang="ts">
	import type { Infer, SuperValidated } from "sveltekit-superforms";
	import ComponentPreviewManual from "$lib/components/docs/component-preview-manual.svelte";
	import type { FormSchema } from "$lib/registry/examples/form-demo.svelte";
	import FormDemo from "$lib/registry/examples/form-demo.svelte";

	let { form }: { form: SuperValidated<Infer<FormSchema>> } = $props();
</script>

<ComponentPreviewManual>
	<FormDemo {form} />
</ComponentPreviewManual>
