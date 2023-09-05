<script lang="ts">
	import { ComponentPreviewManual } from "@/components/docs";
	import { config } from "@/stores";
	import type { FormSchema } from "@/registry/default/example/form-demo.svelte";
	import DefaultFormDemo from "@/registry/default/example/form-demo.svelte";
	import NewYorkFormDemo from "@/registry/new-york/example/form-demo.svelte";
	import type { SuperValidated } from "sveltekit-superforms";

	export let form: SuperValidated<FormSchema>;
</script>

<ComponentPreviewManual>
	{#if $config.style === "new-york"}
		<NewYorkFormDemo {form} />
	{:else}
		<DefaultFormDemo {form} />
	{/if}
</ComponentPreviewManual>
