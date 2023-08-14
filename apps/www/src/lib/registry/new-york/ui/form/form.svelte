<script lang="ts">
	import { setContext } from "svelte";
	import type { ZodValidation } from "sveltekit-superforms";
	import type { SuperForm } from "sveltekit-superforms/client";
	import type { AnyZodObject } from "zod";

	type T = $$Generic<AnyZodObject>;
	export let form: SuperForm<ZodValidation<T>, unknown>;

	setContext("Form", form);
</script>

<slot />
