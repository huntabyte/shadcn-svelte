<script lang="ts">
	import type { PageData } from "./$types.js";
	import DisplayForm from "./display-form.svelte";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	export let data: PageData;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Display</h3>
		<p class="text-muted-foreground text-sm">
			Turn items on or off to control what's displayed in the app.
		</p>
	</div>
	<Separator />
	<DisplayForm data={data.form} />
</div>
