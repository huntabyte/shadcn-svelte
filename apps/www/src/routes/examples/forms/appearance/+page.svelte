<script lang="ts">
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import type { PageData } from "./$types.js";
	import AppearanceForm from "./appearance-form.svelte";

	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Appearance</h3>
		<p class="text-sm text-muted-foreground">
			Customize the appearance of the app. Automatically switch between day and night themes.
		</p>
	</div>
	<Separator />
	<AppearanceForm data={data.form} />
</div>
